import { desc } from "drizzle-orm";
import { getDb, schema } from "@/server/db";

/** Every user, newest first — for the admin's user management screen. */
export async function getAllUsers() {
  const db = getDb();
  return db
    .select({
      id: schema.users.id,
      email: schema.users.email,
      name: schema.users.name,
      role: schema.users.role,
      isActive: schema.users.isActive,
      mustChangePassword: schema.users.mustChangePassword,
      createdAt: schema.users.createdAt,
      lastLoginAt: schema.users.lastLoginAt,
    })
    .from(schema.users)
    .orderBy(desc(schema.users.createdAt));
}
