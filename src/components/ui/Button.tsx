import Link from "next/link";

type Variant = "primary" | "light" | "outline" | "onDark";

/**
 * Pill buttons matching the reference design: a dark/blue solid primary and a
 * white secondary, both with a circular icon chip on the right that slides on
 * hover.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-brand-950 text-white hover:bg-brand-900 shadow-lg shadow-brand-950/20",
  light:
    "bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-ink-300 shadow-sm",
  outline:
    "bg-transparent text-ink-800 ring-1 ring-inset ring-ink-300 hover:bg-white",
  onDark:
    "bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/20",
};

const chipVariants: Record<Variant, string> = {
  primary: "bg-white/15 text-white",
  light: "bg-brand-600 text-white",
  outline: "bg-brand-600 text-white",
  onDark: "bg-white/15 text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  withChip = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** The circular arrow chip. Off for plain text pills. */
  withChip?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full py-2 pl-5 text-sm font-semibold transition-all duration-300 ${
        withChip ? "pr-2" : "pr-5"
      } ${variants[variant]} ${className}`}
    >
      {children}
      {withChip && (
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${chipVariants[variant]}`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h13M12 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </Link>
  );
}
