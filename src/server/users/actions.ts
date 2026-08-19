"use server";

import { eq } from "drizzle-orm";
import { getDb, schema } from "@/server/db";
import { USER_ROLES, type UserRole } from "@/server/db/schema";
import { requireRole, getClientIp } from "@/server/auth/guards";
import { writeAudit } from "@/server/auth/audit";
import { destroyAllSessionsForUser } from "@/server/auth/session";
import { hashPassword, validatePasswordStrength } from "@/server/auth/password";

/**
 * User management. Mirrors `scripts/create-admin.ts`'s hashing (same
 * `hashPassword` helper), but as an in-app action rather than a CLI-only
 * bootstrap path — this is for ongoing team management, not first setup.
 */

export type UserActionState = { error: string } | undefined;

function isUserRole(value: string): value is UserRole {
  return (USER_ROLES as readonly string[]).includes(value);
}

export async function createUserAction(
  _previous: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const admin = await requireRole("admin");
  const db = getDb();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const roleInput = String(formData.get("role") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "That does not look like an email address." };
  }
  if (!name) return { error: "A name is required." };
  if (!isUserRole(roleInput)) return { error: "Choose a role." };

  const weakness = validatePasswordStrength(password);
  if (weakness) return { error: weakness };

  const existing = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);
  if (existing.length > 0) return { error: "A user with that email already exists." };

  const record = await hashPassword(password);
  const id = crypto.randomUUID();
  const now = Date.now();

  await db.insert(schema.users).values({
    id,
    email,
    name,
    role: roleInput,
    passwordHash: record.passwordHash,
    passwordSalt: record.passwordSalt,
    passwordIterations: record.passwordIterations,
    isActive: 1,
    // The admin chose this password, not the user — force a change on first sign-in.
    mustChangePassword: 1,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  });

  await writeAudit({
    actorId: admin.id,
    action: "user.created",
    targetType: "user",
    targetId: id,
    detail: { email, role: roleInput },
    ipAddress: await getClientIp(),
  });
}

export async function updateUserRoleAction(
  userId: string,
  role: string,
): Promise<{ error: string } | void> {
  const admin = await requireRole("admin");
  if (!isUserRole(role)) return { error: "Invalid role." };

  const db = getDb();
  await db
    .update(schema.users)
    .set({ role, updatedAt: Date.now() })
    .where(eq(schema.users.id, userId));

  await writeAudit({
    actorId: admin.id,
    action: "user.updated",
    targetType: "user",
    targetId: userId,
    detail: { role },
    ipAddress: await getClientIp(),
  });
}

export async function setUserActiveAction(
  userId: string,
  active: boolean,
): Promise<{ error: string } | void> {
  const admin = await requireRole("admin");

  if (!active && userId === admin.id) {
    return { error: "You cannot deactivate your own account." };
  }

  const db = getDb();
  await db
    .update(schema.users)
    .set({ isActive: active ? 1 : 0, updatedAt: Date.now() })
    .where(eq(schema.users.id, userId));

  if (!active) {
    await destroyAllSessionsForUser(userId);
  }

  await writeAudit({
    actorId: admin.id,
    action: active ? "user.updated" : "user.deactivated",
    targetType: "user",
    targetId: userId,
    ipAddress: await getClientIp(),
  });
}
