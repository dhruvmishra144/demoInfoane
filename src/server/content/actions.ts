"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { and, asc, eq } from "drizzle-orm";
import { getDb, schema, type Db } from "@/server/db";
import type { Collection } from "@/server/db/schema";
import { requireRole, getClientIp } from "@/server/auth/guards";
import { writeAudit } from "@/server/auth/audit";
import { collectionSchemas, slugSchema } from "./schemas";
import { collectionTag, itemTag } from "./read";
import {
  readString,
  readNullableString,
  readBoolean,
  readStringArray,
  readObjectArray,
} from "./form-data";

/**
 * Content write layer.
 *
 * Every mutation follows the same shape as `src/server/auth/actions.ts`:
 * `requireRole` first, `writeAudit` on every branch that changes state. Editing
 * never overwrites a revision — it inserts a new one and repoints
 * `draftRevisionId`/`publishedRevisionId`, so there is always a one-row
 * rollback and a record of who approved what.
 */

export type ContentActionState =
  | { error: string; fieldErrors?: Record<string, string> }
  | undefined;

/** Builds the collection-shaped object a Zod schema expects from raw FormData. */
function buildContentData(collection: Collection, formData: FormData): unknown {
  switch (collection) {
    case "service":
      return {
        title: readString(formData, "title"),
        heading: readString(formData, "heading"),
        metaTitle: readString(formData, "metaTitle"),
        metaDescription: readString(formData, "metaDescription"),
        navDescription: readString(formData, "navDescription"),
        summary: readString(formData, "summary"),
        bullets: readStringArray(formData, "bullets"),
        intro: readStringArray(formData, "intro"),
        signals: readStringArray(formData, "signals"),
        sections: readObjectArray(formData, "sections", ["title", "body"] as const),
        deliverables: readStringArray(formData, "deliverables"),
        technologies: readStringArray(formData, "technologies"),
        faqs: readObjectArray(formData, "faqs", ["question", "answer"] as const),
        related: readStringArray(formData, "related"),
        iconName: readString(formData, "iconName") || "code",
      };

    case "industry":
      return {
        name: readString(formData, "name"),
        note: readString(formData, "note"),
        body: readString(formData, "body"),
        focus: readStringArray(formData, "focus"),
      };

    case "caseStudy":
      return {
        client: readString(formData, "client"),
        industry: readString(formData, "industry"),
        challenge: readString(formData, "challenge"),
        outcome: readString(formData, "outcome"),
        metric: readString(formData, "metric"),
        metricLabel: readString(formData, "metricLabel"),
        clientNameApproved: readBoolean(formData, "clientNameApproved"),
        imageId: readNullableString(formData, "imageId"),
      };

    case "testimonial":
      return {
        quote: readString(formData, "quote"),
        name: readString(formData, "name"),
        role: readString(formData, "role"),
        company: readString(formData, "company"),
        attributionApproved: readBoolean(formData, "attributionApproved"),
        avatarId: readNullableString(formData, "avatarId"),
      };

    case "faq":
      return {
        question: readString(formData, "question"),
        answer: readString(formData, "answer"),
        placement: readString(formData, "placement") || "home",
      };

    case "pillar":
    case "process":
      return {
        step: readString(formData, "step"),
        title: readString(formData, "title"),
        body: readString(formData, "body"),
      };

    case "techStack":
      return {
        group: readString(formData, "group"),
        items: readStringArray(formData, "items"),
      };

    case "engagementModel":
      return {
        name: readString(formData, "name"),
        tagline: readString(formData, "tagline"),
        price: readString(formData, "price"),
        unit: readString(formData, "unit"),
        summary: readString(formData, "summary"),
        includes: readStringArray(formData, "includes"),
        popular: readBoolean(formData, "popular"),
      };

    case "page": {
      const techGroups = readObjectArray(formData, "techGroups", ["group", "body", "items"] as const).map(
        (group) => ({
          group: group.group,
          body: group.body,
          items: group.items
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      );

      const sections = readObjectArray(formData, "sections", [
        "key",
        "eyebrow",
        "title",
        "lead",
        "ctaLabel",
        "bullets",
        "footnote",
      ] as const).map((section) => ({
        ...section,
        // One textarea, one bullet per line — a nested repeatable inside a
        // repeatable row is worse to use than it is to parse.
        bullets: section.bullets
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      }));

      // Submitted as labels[<key>] so the key set stays data, not schema.
      const labels: Record<string, string> = {};
      for (const [field, value] of formData.entries()) {
        const match = /^labels\[(.+)\]$/.exec(field);
        if (match && typeof value === "string") labels[match[1]] = value.trim();
      }

      return {
        metaTitle: readString(formData, "metaTitle"),
        metaDescription: readString(formData, "metaDescription"),
        heading: readString(formData, "heading"),
        intro: readStringArray(formData, "intro"),
        sections,
        labels,
        ctaBand: {
          heading: readString(formData, "ctaBand.heading"),
          body: readString(formData, "ctaBand.body"),
        },
        hero: {
          headline: readString(formData, "hero.headline"),
          highlight: readString(formData, "hero.highlight"),
          subhead: readString(formData, "hero.subhead"),
          primaryCta: readString(formData, "hero.primaryCta"),
          secondaryCta: readString(formData, "hero.secondaryCta"),
          note: readString(formData, "hero.note"),
          cardTitle: readString(formData, "hero.cardTitle"),
          cardItems: readStringArray(formData, "hero.cardItems"),
        },
        blocks: readObjectArray(formData, "blocks", ["title", "body"] as const),
        principles: readObjectArray(formData, "principles", ["title", "body"] as const),
        leadership: readObjectArray(formData, "leadership", [
          "name",
          "role",
          "bio",
          "linkedin",
        ] as const),
        milestones: readObjectArray(formData, "milestones", ["year", "event"] as const),
        benefits: readObjectArray(formData, "benefits", ["title", "body"] as const),
        hiringProcess: readObjectArray(formData, "hiringProcess", [
          "step",
          "title",
          "body",
        ] as const),
        openings: readObjectArray(formData, "openings", [
          "title",
          "location",
          "type",
          "summary",
        ] as const),
        techGroups,
        expectations: readStringArray(formData, "expectations"),
      };
    }

    case "settings": {
      const offices = readObjectArray(formData, "offices", [
        "label",
        "street",
        "city",
        "region",
        "postalCode",
        "country",
        "phone",
        "phoneDisplay",
      ] as const).map((office, index) => ({
        ...office,
        isHeadquarters: readBoolean(formData, `offices[${index}][isHeadquarters]`),
      }));

      const socialEntries = readObjectArray(formData, "social", ["platform", "url"] as const);
      const social = Object.fromEntries(
        socialEntries.filter((entry) => entry.platform && entry.url).map((e) => [e.platform, e.url]),
      );

      return {
        name: readString(formData, "name"),
        legalName: readString(formData, "legalName"),
        tagline: readString(formData, "tagline"),
        description: readString(formData, "description"),
        foundingYear: readString(formData, "foundingYear"),
        contact: {
          email: readString(formData, "contact.email"),
          phone: readString(formData, "contact.phone"),
          phoneDisplay: readString(formData, "contact.phoneDisplay"),
        },
        offices,
        social,
        stats: readObjectArray(formData, "stats", ["value", "label"] as const),
        credentials: readStringArray(formData, "credentials"),
        promises: {
          consultationLength: readString(formData, "promises.consultationLength"),
          discoveryLength: readString(formData, "promises.discoveryLength"),
          responseTime: readString(formData, "promises.responseTime"),
        },
        platformStrip: readStringArray(formData, "platformStrip"),
        header: {
          ctaLabel: readString(formData, "header.ctaLabel"),
          promoHeading: readString(formData, "header.promoHeading"),
          promoBody: readString(formData, "header.promoBody"),
          promoCtaLabel: readString(formData, "header.promoCtaLabel"),
          promoCtaHref: readString(formData, "header.promoCtaHref"),
          serviceGroupPrimary: readString(formData, "header.serviceGroupPrimary"),
          serviceGroupSecondary: readString(formData, "header.serviceGroupSecondary"),
          industryGroupPrimary: readString(formData, "header.industryGroupPrimary"),
          industryGroupSecondary: readString(formData, "header.industryGroupSecondary"),
        },
        footer: {
          blurb: readString(formData, "footer.blurb"),
          newsletterHeading: readString(formData, "footer.newsletterHeading"),
          newsletterBody: readString(formData, "footer.newsletterBody"),
          newsletterPlaceholder: readString(formData, "footer.newsletterPlaceholder"),
          newsletterCtaLabel: readString(formData, "footer.newsletterCtaLabel"),
          pagesHeading: readString(formData, "footer.pagesHeading"),
          servicesHeading: readString(formData, "footer.servicesHeading"),
          officesHeading: readString(formData, "footer.officesHeading"),
          copyrightSuffix: readString(formData, "footer.copyrightSuffix"),
        },
      };
    }

    case "navMenu":
      return {
        label: readString(formData, "label"),
        items: readObjectArray(formData, "items", [
          "label",
          "href",
          "description",
          "parent",
          "group",
        ] as const),
      };

    default: {
      const exhaustive: never = collection;
      throw new Error(`Unhandled collection: ${exhaustive}`);
    }
  }
}

async function getItemRow(db: Db, itemId: string) {
  const rows = await db
    .select()
    .from(schema.contentItems)
    .where(eq(schema.contentItems.id, itemId))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Saves a draft: creates the item on first save (new slug), or appends a new
 * revision and repoints `draftRevisionId` on every save after that.
 *
 * Bind the `collection` argument from the calling page:
 * `saveDraftAction.bind(null, collection)` — the result is a valid
 * `(state, formData)` action for `useActionState`.
 */
export async function saveDraftAction(
  collection: Collection,
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const user = await requireRole("editor");
  const db = getDb();
  const ip = await getClientIp();
  const now = Date.now();

  const itemId = readNullableString(formData, "itemId");
  let resolvedItemId = itemId;
  let slug: string;

  if (resolvedItemId) {
    const existing = await getItemRow(db, resolvedItemId);
    if (!existing || existing.collection !== collection) {
      return { error: "That item no longer exists." };
    }
    slug = existing.slug;
  } else {
    const slugResult = slugSchema.safeParse(readString(formData, "slug"));
    if (!slugResult.success) {
      return { error: slugResult.error.issues[0]?.message ?? "Invalid slug" };
    }
    slug = slugResult.data;

    // Friendly error beats a raw unique-index constraint violation.
    const clash = await db
      .select({ id: schema.contentItems.id })
      .from(schema.contentItems)
      .where(and(eq(schema.contentItems.collection, collection), eq(schema.contentItems.slug, slug)))
      .limit(1);
    if (clash.length > 0) {
      return { error: `A ${collection} with slug "${slug}" already exists.` };
    }
  }

  const raw = buildContentData(collection, formData);
  const parsed = collectionSchemas[collection].safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message;
    }
    return { error: "Fix the highlighted fields and save again.", fieldErrors };
  }

  if (!resolvedItemId) {
    resolvedItemId = crypto.randomUUID();
    await db.insert(schema.contentItems).values({
      id: resolvedItemId,
      collection,
      slug,
      sortOrder: 0,
      status: "draft",
      createdAt: now,
      updatedAt: now,
      createdBy: user.id,
    });
    await writeAudit({
      actorId: user.id,
      action: "content.created",
      targetType: "content_item",
      targetId: resolvedItemId,
      detail: { collection, slug },
      ipAddress: ip,
    });
  }

  const revisionId = crypto.randomUUID();
  await db.insert(schema.contentRevisions).values({
    id: revisionId,
    itemId: resolvedItemId,
    data: JSON.stringify(parsed.data),
    status: "draft",
    createdBy: user.id,
    createdAt: now,
  });

  await db
    .update(schema.contentItems)
    .set({ draftRevisionId: revisionId, status: "draft", updatedAt: now })
    .where(eq(schema.contentItems.id, resolvedItemId));

  await writeAudit({
    actorId: user.id,
    action: "content.draft_saved",
    targetType: "content_item",
    targetId: resolvedItemId,
    detail: { collection, slug },
    ipAddress: ip,
  });

  redirect(`/admin/content/${collection}/${slug}`);
}

export async function submitForReview(itemId: string): Promise<{ error: string } | void> {
  const user = await requireRole("editor");
  const db = getDb();
  const item = await getItemRow(db, itemId);
  if (!item) return { error: "Item not found." };
  if (!item.draftRevisionId) return { error: "Nothing to submit — save a draft first." };

  const now = Date.now();
  await db
    .update(schema.contentRevisions)
    .set({ status: "in_review", submittedAt: now })
    .where(eq(schema.contentRevisions.id, item.draftRevisionId));
  await db
    .update(schema.contentItems)
    .set({ status: "in_review", updatedAt: now })
    .where(eq(schema.contentItems.id, itemId));

  await writeAudit({
    actorId: user.id,
    action: "content.submitted",
    targetType: "content_item",
    targetId: itemId,
    ipAddress: await getClientIp(),
  });
}

export async function publish(itemId: string): Promise<{ error: string } | void> {
  const user = await requireRole("approver");
  const db = getDb();
  const item = await getItemRow(db, itemId);
  if (!item) return { error: "Item not found." };
  if (!item.draftRevisionId) return { error: "Nothing to publish — no draft exists." };

  const now = Date.now();
  await db
    .update(schema.contentRevisions)
    .set({ status: "published", reviewedBy: user.id, reviewedAt: now, publishedAt: now })
    .where(eq(schema.contentRevisions.id, item.draftRevisionId));
  await db
    .update(schema.contentItems)
    .set({
      publishedRevisionId: item.draftRevisionId,
      draftRevisionId: null,
      status: "published",
      updatedAt: now,
    })
    .where(eq(schema.contentItems.id, itemId));

  revalidateTag(collectionTag(item.collection));
  revalidateTag(itemTag(item.collection, item.slug));

  await writeAudit({
    actorId: user.id,
    action: "content.published",
    targetType: "content_item",
    targetId: itemId,
    ipAddress: await getClientIp(),
  });
}

export async function reject(itemId: string, note: string): Promise<{ error: string } | void> {
  const user = await requireRole("approver");
  const db = getDb();
  const item = await getItemRow(db, itemId);
  if (!item || !item.draftRevisionId) return { error: "Nothing to reject." };

  const now = Date.now();
  await db
    .update(schema.contentRevisions)
    .set({ status: "draft", note: note || null, reviewedBy: user.id, reviewedAt: now })
    .where(eq(schema.contentRevisions.id, item.draftRevisionId));
  await db
    .update(schema.contentItems)
    .set({ status: "draft", updatedAt: now })
    .where(eq(schema.contentItems.id, itemId));

  await writeAudit({
    actorId: user.id,
    action: "content.rejected",
    targetType: "content_item",
    targetId: itemId,
    detail: { note },
    ipAddress: await getClientIp(),
  });
}

export async function unpublish(itemId: string): Promise<{ error: string } | void> {
  const user = await requireRole("approver");
  const db = getDb();
  const item = await getItemRow(db, itemId);
  if (!item || !item.publishedRevisionId) return { error: "Not currently published." };

  await db
    .update(schema.contentItems)
    .set({ publishedRevisionId: null, status: "draft", updatedAt: Date.now() })
    .where(eq(schema.contentItems.id, itemId));

  revalidateTag(collectionTag(item.collection));
  revalidateTag(itemTag(item.collection, item.slug));

  await writeAudit({
    actorId: user.id,
    action: "content.unpublished",
    targetType: "content_item",
    targetId: itemId,
    ipAddress: await getClientIp(),
  });
}

export async function reorder(
  collection: Collection,
  itemId: string,
  direction: "up" | "down",
): Promise<{ error: string } | void> {
  const user = await requireRole("editor");
  const db = getDb();

  const items = await db
    .select({ id: schema.contentItems.id, sortOrder: schema.contentItems.sortOrder })
    .from(schema.contentItems)
    .where(eq(schema.contentItems.collection, collection))
    .orderBy(asc(schema.contentItems.sortOrder));

  const index = items.findIndex((row) => row.id === itemId);
  if (index === -1) return { error: "Item not found." };

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;

  const current = items[index];
  const neighbor = items[swapIndex];

  await db
    .update(schema.contentItems)
    .set({ sortOrder: neighbor.sortOrder })
    .where(eq(schema.contentItems.id, current.id));
  await db
    .update(schema.contentItems)
    .set({ sortOrder: current.sortOrder })
    .where(eq(schema.contentItems.id, neighbor.id));

  revalidateTag(collectionTag(collection));

  await writeAudit({
    actorId: user.id,
    action: "content.reordered",
    targetType: "content_item",
    targetId: itemId,
    ipAddress: await getClientIp(),
  });
}
