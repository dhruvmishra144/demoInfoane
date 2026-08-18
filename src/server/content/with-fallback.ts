import { getCollection, getItem, getSettings } from "./read";
import type { CollectionData } from "./schemas";
import type { Collection } from "@/server/db/schema";

/**
 * Falls back to the checked-in `src/content/*` value whenever D1 has nothing
 * published yet for a collection/item/settings — the same safety net
 * ADMIN-PLAN.md specifies for settings, applied everywhere a page reads
 * content, so an empty table or a bad deploy can never blank a section.
 */
export async function getCollectionOrFallback<C extends Collection>(
  collection: C,
  fallback: (CollectionData[C] & { slug: string })[],
): Promise<(CollectionData[C] & { slug: string })[]> {
  const rows = await getCollection(collection);
  return rows.length > 0 ? rows : fallback;
}

export async function getItemOrFallback<C extends Collection>(
  collection: C,
  slug: string,
  fallback: CollectionData[C] & { slug: string },
): Promise<CollectionData[C] & { slug: string }> {
  const row = await getItem(collection, slug);
  return row ?? fallback;
}

export async function getSettingsOrFallback(
  fallback: CollectionData["settings"],
): Promise<CollectionData["settings"]> {
  const settings = await getSettings();
  return settings ?? fallback;
}
