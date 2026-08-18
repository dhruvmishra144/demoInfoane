import type { Config } from "drizzle-kit";

/**
 * Drizzle Kit is used only to generate SQL migrations from the schema.
 *
 * Applying them is Wrangler's job, so that D1 records them in its own migrations
 * table and local/remote stay in step:
 *
 *   npm run db:generate                 # schema.ts -> drizzle/migrations/*.sql
 *   npm run db:migrate                  # apply to the local D1
 *   npm run db:migrate:remote           # apply to production D1
 *
 * Forgetting `--remote` is the classic D1 mistake: migrations land locally, the
 * deployed Worker then throws "no such table". The two scripts above keep that
 * explicit.
 */
export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  verbose: true,
  strict: true,
} satisfies Config;
