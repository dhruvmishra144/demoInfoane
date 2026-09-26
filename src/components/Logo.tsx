import Link from "next/link";

/**
 * Wordmark: a coral rounded tile carrying a lower-case "i", then the name.
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
        className="h-9 w-9 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-8deg] group-hover:scale-105"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="84" height="84" rx="20" fill="#ff6b4a" />
        <circle cx="42" cy="27" r="4.5" fill="white" />
        <rect x="38" y="36" width="8" height="24" rx="3" fill="white" />
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
            className={`mt-1 text-xs font-semibold uppercase tracking-[0.18em] ${
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
