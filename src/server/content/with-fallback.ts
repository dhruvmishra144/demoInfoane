import { getCollection, getItem, getSettings } from "./read";
import type { CollectionData } from "./schemas";
import type { Collection } from "@/server/db/schema";

/**
 * Falls back to the checked-in `src/content/*` value whenever D1 has nothing
 * published for a collection/item/settings — the same safety net
 * ADMIN-PLAN.md specifies for settings, applied everywhere a page reads
 * content, so an empty table or a bad deploy can never blank a section.
 *
 * Two distinct failures are covered, and both have to be:
 *
 *  - **Empty result.** The table exists but nothing is published yet.
 *  - **Failed query.** D1 is unreachable, or the table does not exist because
 *    migrations have not been applied to that database. This is the case that
 *    matters at build time: `generateStaticParams` and `sitemap.ts` read content
 *    during `next build`, so an unmigrated remote D1 failed the whole build with
 *    `no such table: content_items` rather than falling back to static content.
 *
 * The error is logged rather than swallowed. A page rendering its fallback copy
 * looks fine, so without the log a broken database binding could survive a
 * deploy unnoticed — the point is to keep the site up, not to hide the problem.
 */
async function orFallback<T>(
  what: string,
  read: () => Promise<T | null>,
  fallback: T,
  isEmpty: (value: T) => boolean = () => false,
): Promise<T> {
  let value: T | null;
  try {
    value = await read();
  } catch (error) {
    console.error(
      `[content] D1 read failed for ${what}; serving static fallback. ` +
        `If this is a fresh database, apply migrations with \`npm run db:migrate:remote\`.`,
      error,
    );
    return fallback;
  }
  if (value === null || isEmpty(value)) return fallback;
  return value;
}

export async function getCollectionOrFallback<C extends Collection>(
  collection: C,
  fallback: (CollectionData[C] & { slug: string })[],
): Promise<(CollectionData[C] & { slug: string })[]> {
  return orFallback(
    `collection "${collection}"`,
    () => getCollection(collection),
    fallback,
    (rows) => rows.length === 0,
  );
}

export async function getItemOrFallback<C extends Collection>(
  collection: C,
  slug: string,
  fallback: CollectionData[C] & { slug: string },
): Promise<CollectionData[C] & { slug: string }> {
  return orFallback(`${collection}/${slug}`, () => getItem(collection, slug), fallback);
}

/**
 * As above, but for callers that have their own fallback chain and need to know
 * D1 had nothing. Degrades to null on a failed query instead of throwing.
 */
export async function getItemOrNull<C extends Collection>(
  collection: C,
  slug: string,
): Promise<(CollectionData[C] & { slug: string }) | null> {
  return orFallback<(CollectionData[C] & { slug: string }) | null>(
    `${collection}/${slug}`,
    () => getItem(collection, slug),
    null,
  );
}

export async function getSettingsOrFallback(
  fallback: CollectionData["settings"],
): Promise<CollectionData["settings"]> {
  return orFallback("site settings", () => getSettings(), fallback);
}
