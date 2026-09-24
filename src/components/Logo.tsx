import Link from "next/link";

/**
 * Wordmark.
 *
 * The mark is "Loop" — a single continuous, unbroken line standing for
 * delivery that doesn't drop the thread between discovery, build, and
 * handover. Deep violet, matching the site's one committed accent color
 * rather than a gradient.
 *
 * The company name stays real text rather than an image, so it is readable to
 * crawlers and scales crisply.
 */
export function Logo({
  theme = "light",
  withTagline = false,
  name = "Infoane",
  tagline = "Develop · Support · 24×7",
}: {
  theme?: "light" | "dark";
  withTagline?: boolean;
  name?: string;
  tagline?: string;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label={`${name} — home`}
    >
      <svg
        viewBox="0 0 84 84"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="84" height="84" rx="20" fill="#5b3aa0" />
        <path
          d="M28 52c-8 0-14-6-14-13s6-13 14-13c9 0 12 8 14 13s5 13 14 13c8 0 14-6 14-13s-6-13-14-13"
          stroke="white"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-ink-900"
          }`}
        >
          {name}
        </span>
        {withTagline && tagline && (
          <span
            className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${
              theme === "dark" ? "text-brand-200" : "text-brand-600"
            }`}
          >
            {tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
