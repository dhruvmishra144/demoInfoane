import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { getSessionUser } from "@/server/auth/session";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // Already signed in: skip the form.
  if (await getSessionUser()) redirect("/admin");

  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5">
          <span
            className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-800"
            aria-hidden="true"
          />
          <span className="text-lg font-bold text-ink-900">Infotech Admin</span>
        </div>

        <div className="mt-8 rounded-3xl border border-ink-200 bg-white p-8 shadow-lg shadow-brand-950/5">
          <h1 className="text-xl font-semibold text-ink-900">Sign in</h1>
          <p className="mt-1.5 text-sm text-ink-500">
            Manage the content of the Infotech website.
          </p>

          <div className="mt-7">
            {/* `next` is passed through but validated server-side before any
                redirect — see loginAction. An unchecked value here would be an
                open-redirect. */}
            <LoginForm next={next} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-400">
          Locked out? An administrator can reset your password.
        </p>
      </div>
    </div>
  );
}
