/**
 * Generates drizzle/seed.sql from the checked-in content files.
 *
 * The site's copy already lives in `src/content/*` and `src/config/site.ts`, so
 * the migration into D1 is a transformation rather than a retyping exercise —
 * nothing is lost or paraphrased on the way in.
 *
 *   npx tsx scripts/generate-seed.ts
 *   npm run db:seed            # apply to the local D1
 *   npm run db:seed:remote     # apply to production D1
 *
 * Every row is written as a published revision, so the public site renders
 * exactly what it renders today the moment the seed lands.
 *
 * Deliberately absent: users. Creating the first admin account is a separate
 * command (scripts/create-admin.ts) because a password must never be committed
 * to a SQL file in the repository.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { servicePages } from "../src/content/services";
import {
  caseStudies,
  engagementModels,
  faqs,
  industries,
  pillars,
  testimonials,
} from "../src/content/home";
import { industriesPage } from "../src/content/pages";
import { site } from "../src/config/site";
import { collectionSchemas } from "../src/server/content/schemas";
import type { Collection } from "../src/server/db/schema";

const NOW = Date.now();

/** Deterministic ids, so re-running the generator produces a stable diff. */
function id(...parts: string[]): string {
  return createHash("sha256").update(parts.join(":")).digest("hex").slice(0, 26);
}

function sql(value: string | number | null): string {
  if (value === null) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${value.replace(/'/g, "''")}'`;
}

type Row = { collection: Collection; slug: string; sortOrder: number; data: unknown };

const rows: Row[] = [];

/* ------------------------------------------------------------- services ---- */

const serviceIcons = ["code", "cloud", "refresh", "data", "spark", "team"] as const;

servicePages.forEach((service, index) => {
  rows.push({
    collection: "service",
    slug: service.slug,
    sortOrder: index,
    data: {
      title: service.title,
      heading: service.heading,
      metaTitle: service.metaTitle,
      metaDescription: service.metaDescription,
      navDescription: service.navDescription,
      summary: service.summary,
      bullets: [...service.bullets],
      intro: [...service.intro],
      signals: [...service.signals],
      sections: service.sections.map((section) => ({ ...section })),
      deliverables: [...service.deliverables],
      technologies: [...service.technologies],
      faqs: service.faqs.map((faq) => ({ ...faq })),
      related: [...service.related],
      iconName: serviceIcons[index] ?? "code",
    },
  });
});

/* ----------------------------------------------------------- industries ---- */

// The short "note" lives in home.ts and the long copy in pages.ts; they are
// parallel lists describing the same six sectors, so they merge by index here.
industriesPage.detail.forEach((industry, index) => {
  rows.push({
    collection: "industry",
    slug: industry.slugId,
    sortOrder: index,
    data: {
      name: industry.name,
      note: industries[index]?.note ?? industry.focus[0],
      body: industry.body,
      focus: [...industry.focus],
    },
  });
});

/* ---------------------------------------------------------- case studies ---- */

caseStudies.forEach((study, index) => {
  rows.push({
    collection: "caseStudy",
    slug: study.slug.replace(/[[\]]/g, "") || `case-study-${index + 1}`,
    sortOrder: index,
    data: {
      client: study.client,
      industry: study.industry,
      challenge: study.challenge,
      outcome: study.outcome,
      metric: study.metric,
      metricLabel: study.metricLabel,
      // Still placeholders, so consent has explicitly not been recorded.
      clientNameApproved: false,
      imageId: null,
    },
  });
});

/* ---------------------------------------------------------- testimonials ---- */

testimonials.forEach((testimonial, index) => {
  rows.push({
    collection: "testimonial",
    slug: `testimonial-${index + 1}`,
    sortOrder: index,
    data: {
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      attributionApproved: false,
      avatarId: null,
    },
  });
});

/* ------------------------------------------------------------------ faqs ---- */

faqs.forEach((faq, index) => {
  rows.push({
    collection: "faq",
    slug: `home-${index + 1}`,
    sortOrder: index,
    data: { question: faq.question, answer: faq.answer, placement: "home" },
  });
});

/* --------------------------------------------------------------- pillars ---- */

pillars.forEach((pillar, index) => {
  rows.push({
    collection: "pillar",
    slug: `pillar-${pillar.step}`,
    sortOrder: index,
    data: { step: pillar.step, title: pillar.title, body: pillar.body },
  });
});

/* ---------------------------------------------------- engagement models ---- */

engagementModels.forEach((model, index) => {
  rows.push({
    collection: "engagementModel",
    slug: model.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    sortOrder: index,
    data: {
      name: model.name,
      tagline: model.tagline,
      price: model.price,
      unit: model.unit,
      summary: model.summary,
      includes: [...model.includes],
      popular: model.popular,
    },
  });
});

/* -------------------------------------------------------------- settings ---- */

rows.push({
  collection: "settings",
  slug: "site",
  sortOrder: 0,
  data: {
    name: site.name,
    legalName: site.legalName,
    tagline: site.tagline,
    description: site.description,
    // The schema wants four digits; the placeholder is [YYYY], so emit a value
    // that parses and is obviously unset rather than failing the seed.
    foundingYear: /^\d{4}$/.test(site.foundingYear) ? site.foundingYear : "1900",
    contact: {
      // Same reasoning: the placeholder email is not a valid address.
      email: site.contact.email.includes("@") ? site.contact.email.replace(/[[\]]/g, "") : "hello@example.com",
      phone: site.contact.phone,
      phoneDisplay: site.contact.phoneDisplay,
    },
    offices: site.offices.map((office) => ({
      label: office.label,
      street: office.street,
      city: office.city,
      region: office.region,
      postalCode: office.postalCode,
      // Two-character ISO code; the placeholders are "[US]"/"[IN]".
      country: office.country.replace(/[[\]]/g, "").slice(0, 2).toUpperCase(),
      phone: office.phone,
      phoneDisplay: office.phoneDisplay,
      isHeadquarters: office.isHeadquarters,
    })),
    social: Object.fromEntries(
      Object.entries(site.social).map(([network, url]) => [network, url]),
    ),
    stats: site.stats.map((stat) => ({ value: stat.value, label: stat.label })),
    credentials: [...site.credentials],
    promises: { ...site.promises },
    platformStrip: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "Kubernetes",
      "Snowflake",
      "Databricks",
      ".NET",
      "PostgreSQL",
    ],
  },
});

/* -------------------------------------------------------------- validate ---- */

// Fail before writing anything: a seed that violates the schemas would be
// silently skipped at render time, which is far harder to debug than this.
let invalid = 0;
for (const row of rows) {
  const result = collectionSchemas[row.collection].safeParse(row.data);
  if (!result.success) {
    invalid += 1;
    console.error(`✗ ${row.collection}/${row.slug}`);
    for (const issue of result.error.issues) {
      console.error(`    ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
  }
}

if (invalid > 0) {
  console.error(`\n${invalid} row(s) failed validation. No file written.`);
  process.exit(1);
}

/* ----------------------------------------------------------------- emit ---- */

const statements: string[] = [
  "-- Generated by scripts/generate-seed.ts — do not edit by hand.",
  "-- Re-run `npx tsx scripts/generate-seed.ts` after changing src/content/*.",
  "",
  "PRAGMA foreign_keys = ON;",
  "",
  "-- Idempotent: clearing revisions first satisfies the FK from content_items.",
  "DELETE FROM content_revisions;",
  "DELETE FROM content_items;",
  "",
];

for (const row of rows) {
  const itemId = id("item", row.collection, row.slug);
  const revisionId = id("rev", row.collection, row.slug);
  const data = JSON.stringify(row.data);

  statements.push(
    `INSERT INTO content_items (id, collection, slug, sort_order, published_revision_id, draft_revision_id, status, created_at, updated_at, created_by) VALUES (${sql(itemId)}, ${sql(row.collection)}, ${sql(row.slug)}, ${row.sortOrder}, ${sql(revisionId)}, NULL, 'published', ${NOW}, ${NOW}, NULL);`,
    `INSERT INTO content_revisions (id, item_id, data, status, note, created_by, created_at, submitted_at, reviewed_by, reviewed_at, published_at) VALUES (${sql(revisionId)}, ${sql(itemId)}, ${sql(data)}, 'published', 'Seeded from src/content', NULL, ${NOW}, NULL, NULL, NULL, ${NOW});`,
    "",
  );
}

mkdirSync("drizzle", { recursive: true });
writeFileSync("drizzle/seed.sql", statements.join("\n"), "utf8");

const counts = rows.reduce<Record<string, number>>((acc, row) => {
  acc[row.collection] = (acc[row.collection] ?? 0) + 1;
  return acc;
}, {});

console.log("✓ drizzle/seed.sql written");
for (const [collection, count] of Object.entries(counts)) {
  console.log(`    ${collection}: ${count}`);
}
console.log(`    ${rows.length} items total, all validated`);
