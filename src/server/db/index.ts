import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export { schema };
export type Db = DrizzleD1Database<typeof schema>;

/**
 * Drizzle client over the D1 binding.
 *
 * Two variants because the adapter exposes bindings differently depending on
 * where you are:
 *  - `getDb()` — synchronous, for route handlers and server actions.
 *  - `getDbAsync()` — required anywhere that runs during static generation.
 *
 * Using Drizzle rather than hand-written SQL is a security decision as much as an
 * ergonomic one: every value is bound as a parameter, so string interpolation —
 * the usual route to SQL injection in D1 code — never enters the picture.
 */
export function getDb(): Db {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    throw new Error(
      "D1 binding `DB` is missing. Check wrangler.jsonc, and run `npm run db:migrate` for local development.",
    );
  }
  return drizzle(env.DB, { schema });
}

export async function getDbAsync(): Promise<Db> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 binding `DB` is missing during static generation.");
  }
  return drizzle(env.DB, { schema });
}

/** The R2 bucket holding editor uploads. */
export function getMediaBucket(): R2Bucket {
  const { env } = getCloudflareContext();
  if (!env.MEDIA) {
    throw new Error("R2 binding `MEDIA` is missing. Check wrangler.jsonc.");
  }
  return env.MEDIA;
}
