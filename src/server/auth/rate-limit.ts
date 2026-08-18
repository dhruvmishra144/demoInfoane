import { and, eq, gt } from "drizzle-orm";
import { getDb, schema } from "@/server/db";

/**
 * Login throttling.
 *
 * Two independent counters, because they defend against different attacks:
 *  - per email: someone guessing one account's password
 *  - per IP: someone spraying one password across many accounts
 *
 * Counted in D1 rather than in memory: Workers isolates are per-location and
 * short-lived, so an in-memory counter would reset constantly and be trivially
 * bypassed by hitting a different edge location.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_EMAIL = 8;
const MAX_FAILURES_PER_IP = 25;

function emailScope(email: string): string {
  return `email:${email.toLowerCase()}`;
}

function ipScope(ip: string): string {
  return `ip:${ip}`;
}

async function countRecentFailures(scope: string): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ id: schema.loginAttempts.id })
    .from(schema.loginAttempts)
    .where(
      and(
        eq(schema.loginAttempts.scope, scope),
        eq(schema.loginAttempts.succeeded, 0),
        gt(schema.loginAttempts.createdAt, Date.now() - WINDOW_MS),
      ),
    );
  return rows.length;
}

export type ThrottleResult = { allowed: true } | { allowed: false; retryAfterMinutes: number };

/** Checked before a password is ever verified. */
export async function checkLoginAllowed(
  email: string,
  ip: string | null,
): Promise<ThrottleResult> {
  const [emailFailures, ipFailures] = await Promise.all([
    countRecentFailures(emailScope(email)),
    ip ? countRecentFailures(ipScope(ip)) : Promise.resolve(0),
  ]);

  if (emailFailures >= MAX_FAILURES_PER_EMAIL || ipFailures >= MAX_FAILURES_PER_IP) {
    return { allowed: false, retryAfterMinutes: Math.ceil(WINDOW_MS / 60000) };
  }

  return { allowed: true };
}

export async function recordLoginAttempt(
  email: string,
  ip: string | null,
  succeeded: boolean,
): Promise<void> {
  const db = getDb();
  const now = Date.now();
  const flag = succeeded ? 1 : 0;

  const rows = [
    { id: crypto.randomUUID(), scope: emailScope(email), succeeded: flag, createdAt: now },
    ...(ip ? [{ id: crypto.randomUUID(), scope: ipScope(ip), succeeded: flag, createdAt: now }] : []),
  ];

  await db.insert(schema.loginAttempts).values(rows);
}

/**
 * Clears a user's failed attempts after a successful sign-in, so one bad typo
 * earlier in the day does not count towards a later lockout.
 */
export async function clearFailuresForEmail(email: string): Promise<void> {
  const db = getDb();
  await db.delete(schema.loginAttempts).where(eq(schema.loginAttempts.scope, emailScope(email)));
}
