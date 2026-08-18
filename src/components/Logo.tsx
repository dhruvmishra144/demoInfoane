import Link from "next/link";

/**
 * Wordmark.
 *
 * The mark echoes the attached logo's treatment — a cyan-to-navy gradient — and
 * the optional tagline mirrors its "DEVELOP · SUPPORT · 24x7" strip. It is still
 * a placeholder: swap in the real brand SVG when you send it (CONTENT-TODO.md).
 *
 * The company name stays real text rather than an image, so it is readable to
 * crawlers and scales crisply.
 */
export function Logo({
  theme = "light",
  withTagline = false,
}: {
  theme?: "light" | "dark";
  withTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Infotech — home"
    >
      <svg
        viewBox="0 0 36 36"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="logo-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4fb2f5" />
            <stop offset="55%" stopColor="#1e97e5" />
            <stop offset="100%" stopColor="#114f80" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill="url(#logo-mark)" />
        <path
          d="M10 23.5l5-5.5 3.4 3.4L26 12.5"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="26" cy="12.5" r="2.1" fill="white" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-ink-900"
          }`}
        >
          Infotech
        </span>
        {withTagline && (
          <span
            className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${
              theme === "dark" ? "text-brand-200" : "text-brand-600"
            }`}
          >
            Develop · Support · 24×7
          </span>
        )}
      </span>
    </Link>
  );
}
