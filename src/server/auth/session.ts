import { cookies } from "next/headers";
import { and, eq, lt } from "drizzle-orm";
import { getDb, schema } from "@/server/db";
import type { User } from "@/server/db/schema";

/**
 * Server-side sessions.
 *
 * The cookie carries a random 256-bit token; the database stores only its
 * SHA-256 hash. A leaked database dump therefore contains no usable sessions —
 * the same reasoning as never storing plaintext passwords.
 *
 * Stateful rather than a JWT on purpose: sessions must be revocable. Deactivating
 * a user, changing a role, or signing out everywhere has to take effect on the
 * next request, which a self-contained token cannot offer without a blocklist
 * (i.e. without the database lookup a JWT was supposed to avoid).
 */

const COOKIE_NAME = "infoane_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
/** Sliding window: only touch the DB when the session is over a day old. */
const REFRESH_AFTER_MS = 24 * 60 * 60 * 1000;

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** The database key for a cookie token. Never store the token itself. */
async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return toHex(digest);
}

export async function createSession(
  userId: string,
  meta: { ipAddress?: string | null; userAgent?: string | null } = {},
): Promise<void> {
  const db = getDb();
  const token = toHex(crypto.getRandomValues(new Uint8Array(32)).buffer as ArrayBuffer);
  const now = Date.now();

  await db.insert(schema.sessions).values({
    id: await hashToken(token),
    userId,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
    lastSeenAt: now,
    ipAddress: meta.ipAddress ?? null,
    userAgent: meta.userAgent?.slice(0, 300) ?? null,
  });

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true, // not readable by JavaScript, so XSS cannot exfiltrate it
    // Secure is skipped on localhost only; production always sets it.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // blocks the cookie on cross-site POSTs
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

export type SessionUser = Pick<User, "id" | "email" | "name" | "role" | "mustChangePassword">;

/**
 * Resolves the signed-in user, or null.
 *
 * Re-reads the user row on every call rather than trusting anything in the
 * cookie, which is what makes deactivation and role changes take effect
 * immediately.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const db = getDb();
  const sessionId = await hashToken(token);
  const now = Date.now();

  const rows = await db
    .select({
      sessionExpiresAt: schema.sessions.expiresAt,
      sessionLastSeenAt: schema.sessions.lastSeenAt,
      id: schema.users.id,
      email: schema.users.email,
      name: schema.users.name,
      role: schema.users.role,
      isActive: schema.users.isActive,
      mustChangePassword: schema.users.mustChangePassword,
    })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
    .where(eq(schema.sessions.id, sessionId))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  // Expired, or the account has since been deactivated.
  if (row.sessionExpiresAt <= now || row.isActive !== 1) {
    await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId));
    return null;
  }

  // Sliding expiry, written at most once a day so a busy admin session does not
  // generate a D1 write on every request.
  if (now - row.sessionLastSeenAt > REFRESH_AFTER_MS) {
    await db
      .update(schema.sessions)
      .set({ lastSeenAt: now, expiresAt: now + SESSION_TTL_MS })
      .where(eq(schema.sessions.id, sessionId));
  }

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    mustChangePassword: row.mustChangePassword,
  };
}

/** Signs the current browser out and deletes the row server-side. */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (token) {
    const db = getDb();
    await db.delete(schema.sessions).where(eq(schema.sessions.id, await hashToken(token)));
  }

  store.delete(COOKIE_NAME);
}

/** Revokes every session for a user — used on password change and deactivation. */
export async function destroyAllSessionsForUser(userId: string): Promise<void> {
  const db = getDb();
  await db.delete(schema.sessions).where(eq(schema.sessions.userId, userId));
}

/**
 * Housekeeping for expired rows. Called opportunistically after sign-in rather
 * than on a cron, since the volume here is tiny.
 */
export async function pruneExpiredSessions(): Promise<void> {
  const db = getDb();
  await db.delete(schema.sessions).where(lt(schema.sessions.expiresAt, Date.now()));
}

/** Exported for the middleware, which only checks for the cookie's presence. */
export const SESSION_COOKIE_NAME = COOKIE_NAME;

/** Narrow helper used by the login flow to detect an existing valid session. */
export async function hasActiveSession(): Promise<boolean> {
  return (await getSessionUser()) !== null;
}

/** Used by tests and the admin UI to count a user's live sessions. */
export async function countActiveSessions(userId: string): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ id: schema.sessions.id })
    .from(schema.sessions)
    .where(
      and(eq(schema.sessions.userId, userId), lt(schema.sessions.expiresAt, Date.now() + SESSION_TTL_MS)),
    );
  return rows.length;
}
