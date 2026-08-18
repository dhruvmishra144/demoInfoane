"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "@/server/db";
import { fakeVerify, needsRehash, hashPassword, verifyPassword } from "./password";
import {
  createSession,
  destroySession,
  getSessionUser,
  pruneExpiredSessions,
} from "./session";
import {
  checkLoginAllowed,
  clearFailuresForEmail,
  recordLoginAttempt,
} from "./rate-limit";
import { writeAudit } from "./audit";
import { getClientIp, getUserAgent } from "./guards";

/**
 * Sign-in and sign-out.
 *
 * Server actions rather than a route handler: Next verifies the Origin against the
 * Host for every action invocation, which — together with the SameSite=Lax session
 * cookie — is what closes CSRF here. Adding a hand-rolled token on top would be
 * ceremony, not defence.
 */

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
  next: z.string().optional(),
});

export type LoginState = { error?: string } | undefined;

/**
 * Note on error messages: every failure path returns the same wording. Telling a
 * visitor whether the email exists, or whether the account is deactivated, is a
 * free account-enumeration oracle.
 */
const GENERIC_FAILURE = "Email or password is incorrect.";

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? GENERIC_FAILURE };
  }

  const { email, password } = parsed.data;
  const ip = await getClientIp();

  const throttle = await checkLoginAllowed(email, ip);
  if (!throttle.allowed) {
    await writeAudit({
      actorId: null,
      action: "user.login_failed",
      detail: { email, reason: "throttled" },
      ipAddress: ip,
    });
    return {
      error: `Too many failed attempts. Try again in ${throttle.retryAfterMinutes} minutes.`,
    };
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  const user = rows[0];

  // Unknown address: still burn the CPU a real verification would, so the
  // response time does not reveal whether the account exists.
  if (!user || user.isActive !== 1) {
    await fakeVerify();
    await recordLoginAttempt(email, ip, false);
    await writeAudit({
      actorId: null,
      action: "user.login_failed",
      detail: { email, reason: user ? "inactive" : "unknown" },
      ipAddress: ip,
    });
    return { error: GENERIC_FAILURE };
  }

  const valid = await verifyPassword(password, user);
  if (!valid) {
    await recordLoginAttempt(email, ip, false);
    await writeAudit({
      actorId: user.id,
      action: "user.login_failed",
      targetType: "user",
      targetId: user.id,
      detail: { reason: "bad_password" },
      ipAddress: ip,
    });
    return { error: GENERIC_FAILURE };
  }

  // Transparently upgrade the stored hash if the work factor has been raised
  // since this password was set.
  if (needsRehash(user)) {
    const rehashed = await hashPassword(password);
    await db.update(schema.users).set(rehashed).where(eq(schema.users.id, user.id));
  }

  const now = Date.now();
  await db
    .update(schema.users)
    .set({ lastLoginAt: now, updatedAt: now })
    .where(eq(schema.users.id, user.id));

  await createSession(user.id, { ipAddress: ip, userAgent: await getUserAgent() });
  await recordLoginAttempt(email, ip, true);
  await clearFailuresForEmail(email);
  await writeAudit({
    actorId: user.id,
    action: "user.login",
    targetType: "user",
    targetId: user.id,
    ipAddress: ip,
  });
  await pruneExpiredSessions();

  /**
   * `next` is validated as a relative admin path before use. Redirecting to
   * whatever a query string contains is an open-redirect: an attacker sends
   * /admin/login?next=https://evil.example and the victim lands there already
   * trusting the link.
   */
  const requested = parsed.data.next;
  const safeNext =
    requested && /^\/admin(?:\/[^\s]*)?$/.test(requested) && !requested.startsWith("/admin/login")
      ? requested
      : "/admin";

  redirect(safeNext);
}

export async function logoutAction(): Promise<void> {
  const user = await getSessionUser();

  if (user) {
    await writeAudit({
      actorId: user.id,
      action: "user.logout",
      targetType: "user",
      targetId: user.id,
      ipAddress: await getClientIp(),
    });
  }

  await destroySession();
  redirect("/admin/login");
}
