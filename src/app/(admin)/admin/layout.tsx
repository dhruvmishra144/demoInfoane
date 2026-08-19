import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/server/auth/session";
import { hasRole } from "@/server/auth/guards";
import { logoutAction } from "@/server/auth/actions";

/**
 * Admin shell.
 *
 * Belongs to the (admin) route group, so it shares only <html>/<body> and the
 * stylesheet with the public site — no marketing header, and none of that markup
 * shipped to editors.
 *
 * `noindex, nofollow` here as well as in middleware and robots.txt. Three layers
 * because each covers a different gap: robots.txt is advisory, the middleware
 * header covers non-HTML responses, and this covers anything that bypasses the
 * middleware matcher.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Infoane Admin" },
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The admin panel reads and writes per-request data, so nothing here should be
 * prerendered or cached.
 */
export const dynamic = "force-dynamic";

const navigation = [
  { label: "Dashboard", href: "/admin", minRole: "editor" as const },
  { label: "Content", href: "/admin/content", minRole: "editor" as const },
  { label: "Media", href: "/admin/media", minRole: "editor" as const },
  { label: "Users", href: "/admin/users", minRole: "admin" as const },
  { label: "Activity", href: "/admin/activity", minRole: "admin" as const },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Null on the login page, which lives inside this layout but outside the
  // authenticated area. Pages themselves call requireUser().
  const user = await getSessionUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-ink-100">
        <main id="main">{children}</main>
      </div>
    );
  }

  const visible = navigation.filter((item) => hasRole(user, item.minRole));

  return (
    <div className="min-h-screen bg-ink-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span
                className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-800"
                aria-hidden="true"
              />
              <span className="text-sm font-bold text-ink-900">Infoane Admin</span>
            </Link>

            <nav aria-label="Admin">
              <ul className="hidden items-center gap-1 md:flex">
                {visible.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-ink-900">{user.name}</p>
              <p className="text-xs capitalize text-ink-500">{user.role}</p>
            </div>
            {/* A form POST, not a link: signing out mutates state, so it must not
                be reachable by a GET a browser or crawler might prefetch. */}
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <nav aria-label="Admin (mobile)" className="border-t border-ink-100 md:hidden">
          <ul className="flex overflow-x-auto px-3 py-2">
            {visible.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-ink-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {user.mustChangePassword === 1 && (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 py-3 text-sm text-amber-900 lg:px-8">
            <span className="font-semibold">Set a new password.</span>
            <span>
              This account is still using the password it was created with.
            </span>
            <Link href="/admin/password" className="font-semibold underline">
              Change it now
            </Link>
          </div>
        </div>
      )}

      <main id="main" className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {children}
      </main>
    </div>
  );
}
