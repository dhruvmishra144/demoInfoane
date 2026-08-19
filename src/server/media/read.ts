import { desc } from "drizzle-orm";
import { getDb, schema } from "@/server/db";

/** Every uploaded asset, newest first — for the media library grid. */
export async function getAllMedia() {
  const db = getDb();
  return db.select().from(schema.mediaAssets).orderBy(desc(schema.mediaAssets.createdAt));
}
