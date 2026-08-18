import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/server/auth/session";

/**
 * Redirects anonymous visitors away from /admin before a page renders.
 *
 * This is a convenience, NOT a security boundary. It only checks that a session
 * cookie is present — it does not and cannot validate it, because the Edge runtime
 * has no D1 access here and a database round trip on every request would be
 * wasteful anyway. A forged cookie sails straight through this check and is then
 * rejected by `requireUser()`/`requireRole()` on the server, which is where
 * authorisation actually happens.
 *
 * It also sets noindex on everything under /admin: robots.txt asks crawlers not to
 * look, but a header is what actually keeps an accidentally-shared admin URL out
 * of search results.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);

  if (!isLoginPage && !hasSessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
