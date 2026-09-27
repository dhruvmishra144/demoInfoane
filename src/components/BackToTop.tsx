"use client";

/**
 * Round "back to top" button for the footer. Smooth-scrolls unless the visitor
 * prefers reduced motion, and moves focus to the skip link — the first thing on
 * the page — so keyboard users continue from the top rather than the footer.
 */
export function BackToTop() {
  function onClick() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("a[href='#main']")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className="group inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-500 ring-1 ring-inset ring-brand-500/60 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-brand-500 hover:text-white hover:ring-brand-500"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
