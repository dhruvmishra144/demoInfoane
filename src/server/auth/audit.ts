import { desc, eq } from "drizzle-orm";
import { getDb, schema } from "@/server/db";

/**
 * Append-only audit log.
 *
 * With a custom-built admin panel this is the only way to answer "who published
 * that, and when" after the fact. Never write secrets, tokens or passwords into
 * `detail` — this table is readable by any admin.
 */

export type AuditAction =
  | "user.login"
  | "user.login_failed"
  | "user.logout"
  | "user.created"
  | "user.updated"
  | "user.deactivated"
  | "user.password_changed"
  | "content.created"
  | "content.draft_saved"
  | "content.submitted"
  | "content.published"
  | "content.rejected"
  | "content.unpublished"
  | "content.reordered"
  | "media.uploaded"
  | "media.deleted";

export async function writeAudit(entry: {
  actorId: string | null;
  action: AuditAction;
  targetType?: "content_item" | "user" | "media" | "session" | null;
  targetId?: string | null;
  detail?: Record<string, unknown> | null;
  ipAddress?: string | null;
}): Promise<void> {
  const db = getDb();

  await db.insert(schema.auditLog).values({
    id: crypto.randomUUID(),
    actorId: entry.actorId,
    action: entry.action,
    targetType: entry.targetType ?? null,
    targetId: entry.targetId ?? null,
    detail: entry.detail ? JSON.stringify(entry.detail) : null,
    ipAddress: entry.ipAddress ?? null,
    createdAt: Date.now(),
  });
}

/** Most recent entries, joined to the actor's name for the admin viewer. */
export async function recentAudit(limit = 50) {
  const db = getDb();

  return db
    .select({
      id: schema.auditLog.id,
      action: schema.auditLog.action,
      targetType: schema.auditLog.targetType,
      targetId: schema.auditLog.targetId,
      detail: schema.auditLog.detail,
      createdAt: schema.auditLog.createdAt,
      actorName: schema.users.name,
      actorEmail: schema.users.email,
    })
    .from(schema.auditLog)
    .leftJoin(schema.users, eq(schema.auditLog.actorId, schema.users.id))
    .orderBy(desc(schema.auditLog.createdAt))
    .limit(limit);
}
