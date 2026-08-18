import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSessionUser, type SessionUser } from "./session";
import type { UserRole } from "@/server/db/schema";

/**
 * Authorisation guards.
 *
 * Every server action and every admin page calls one of these. The middleware
 * only checks whether a session cookie exists — that is a cheap redirect for
 * humans, not a security boundary, because it never validates the session against
 * the database. These functions are the boundary, and they run on the server on
 * every request.
 *
 * Rule of thumb enforced throughout the admin panel: hiding a button is not a
 * permission. If an action mutates data, it calls a guard first.
 */

/** Roles that satisfy a required role, most privileged last. */
const ROLE_RANK: Record<UserRole, number> = {
  editor: 1,
  approver: 2,
  admin: 3,
};

export function hasRole(user: SessionUser, required: UserRole): boolean {
  return ROLE_RANK[user.role] >= ROLE_RANK[required];
}

/** Redirects to the login page when not signed in. */
export async function requireUser(returnTo?: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    const target = returnTo ? `?next=${encodeURIComponent(returnTo)}` : "";
    redirect(`/admin/login${target}`);
  }
  return user;
}

/**
 * Requires a minimum role.
 *
 * Throws rather than redirects: an authenticated user hitting an action above
 * their role is a bug or an attempt, not a navigation problem, and it should be
 * loud in the logs.
 */
export async function requireRole(required: UserRole): Promise<SessionUser> {
  const user = await requireUser();
  if (!hasRole(user, required)) {
    throw new Error(
      `Forbidden: ${user.email} has role "${user.role}" but "${required}" is required.`,
    );
  }
  return user;
}

/**
 * The client IP, for throttling and the audit log.
 *
 * On Cloudflare, CF-Connecting-IP is set by the edge and cannot be spoofed by the
 * client. X-Forwarded-For is attacker-controlled and is only a local-development
 * fallback — never trust it for anything that matters.
 */
export async function getClientIp(): Promise<string | null> {
  const headerList = await headers();
  return (
    headerList.get("cf-connecting-ip") ??
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function getUserAgent(): Promise<string | null> {
  const headerList = await headers();
  return headerList.get("user-agent");
}
