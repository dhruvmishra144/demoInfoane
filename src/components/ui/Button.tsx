import Link from "next/link";

type Variant = "primary" | "coral" | "light" | "outline" | "onDark";

/**
 * Pill buttons from the 2026 redesign: a navy-black primary, a coral action
 * button, and a quiet outlined secondary. Hover lifts the pill a pixel and
 * deepens its fill; the optional arrow nudges right.
 */
const variants: Record<Variant, string> = {
  primary: "bg-ink-900 text-white hover:bg-ink-800 shadow-lg shadow-ink-900/15",
  coral: "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25",
  light: "bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-ink-300",
  outline: "bg-transparent text-ink-900 ring-1 ring-inset ring-ink-300 hover:bg-white",
  onDark: "bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  withChip = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** A trailing arrow. Off by default — the redesign's pills are text-only. */
  withChip?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-px ${variants[variant]} ${className}`}
    >
      {children}
      {withChip && (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h13M12 6l6 6-6 6" />
        </svg>
      )}
    </Link>
  );
}
