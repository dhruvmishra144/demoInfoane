import { unstable_cache } from "next/cache";
import { and, asc, eq } from "drizzle-orm";
import { getDbAsync, schema } from "@/server/db";
import { collectionSchemas, type CollectionData } from "./schemas";
import type { Collection } from "@/server/db/schema";

/**
 * Public read path.
 *
 * Every read goes through `unstable_cache` with a cache tag, so a page renders
 * once and is then served from the incremental cache as complete HTML. Publishing
 * in the admin panel calls `revalidateTag()` for the affected collection, which is
 * what lets content change without a redeploy while keeping pages prerendered.
 *
 * D1 is therefore never queried on a visitor's request in the steady state — only
 * when a page is being (re)generated. That matters for both latency and for
 * staying inside D1's request limits under crawl load.
 */

/** Cache tag for a collection. Also the unit of revalidation on publish. */
export function collectionTag(collection: Collection): string {
  return `content:${collection}`;
}

/** Cache tag for one item, so a single service page can be revalidated alone. */
export function itemTag(collection: Collection, slug: string): string {
  return `content:${collection}:${slug}`;
}

type PublishedRow = { slug: string; sortOrder: number; data: string };

/**
 * Fetches the published revision of every item in a collection.
 *
 * A single join, not a query per item — the N+1 pattern is the fastest way to hit
 * D1's limits during a rebuild.
 */
async function queryPublished(collection: Collection): Promise<PublishedRow[]> {
  const db = await getDbAsync();

  return db
    .select({
      slug: schema.contentItems.slug,
      sortOrder: schema.contentItems.sortOrder,
      data: schema.contentRevisions.data,
    })
    .from(schema.contentItems)
    .innerJoin(
      schema.contentRevisions,
      eq(schema.contentItems.publishedRevisionId, schema.contentRevisions.id),
    )
    .where(
      and(
        eq(schema.contentItems.collection, collection),
        eq(schema.contentItems.status, "published"),
      ),
    )
    .orderBy(asc(schema.contentItems.sortOrder), asc(schema.contentItems.slug));
}

/**
 * Parses a stored row, dropping anything invalid rather than letting it reach a
 * page. A dropped item is logged loudly — silent omission is how a page ends up
 * mysteriously missing a section.
 */
function parseRows<C extends Collection>(
  collection: C,
  rows: PublishedRow[],
): (CollectionData[C] & { slug: string })[] {
  const parser = collectionSchemas[collection];
  const out: (CollectionData[C] & { slug: string })[] = [];

  for (const row of rows) {
    let json: unknown;
    try {
      json = JSON.parse(row.data);
    } catch {
      console.error(`[content] ${collection}/${row.slug}: stored data is not valid JSON`);
      continue;
    }

    const result = parser.safeParse(json);
    if (!result.success) {
      console.error(
        `[content] ${collection}/${row.slug} failed validation and was skipped:`,
        result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; "),
      );
      continue;
    }

    out.push({ ...(result.data as CollectionData[C]), slug: row.slug });
  }

  return out;
}

/** All published items in a collection, ordered by the admin panel's sort order. */
export function getCollection<C extends Collection>(
  collection: C,
): Promise<(CollectionData[C] & { slug: string })[]> {
  const load = unstable_cache(
    async () => parseRows(collection, await queryPublished(collection)),
    ["collection", collection],
    { tags: [collectionTag(collection)] },
  );
  return load();
}

/** One published item by slug, or null if it is missing or unpublished. */
export async function getItem<C extends Collection>(
  collection: C,
  slug: string,
): Promise<(CollectionData[C] & { slug: string }) | null> {
  const load = unstable_cache(
    async () => {
      const rows = await queryPublished(collection);
      const match = rows.filter((row) => row.slug === slug);
      return parseRows(collection, match)[0] ?? null;
    },
    ["item", collection, slug],
    { tags: [collectionTag(collection), itemTag(collection, slug)] },
  );
  return load();
}

/**
 * Site settings — a singleton stored as one row under the fixed slug "site".
 *
 * Returns null when unseeded so callers can fall back to the checked-in defaults
 * rather than rendering an empty header. A missing settings row should never take
 * the site down.
 */
export async function getSettings(): Promise<CollectionData["settings"] | null> {
  const load = unstable_cache(
    async () => {
      const rows = await queryPublished("settings");
      return parseRows("settings", rows)[0] ?? null;
    },
    ["settings"],
    { tags: [collectionTag("settings")] },
  );
  return load();
}
