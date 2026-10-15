"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The header's outer bar. Client-side for three scroll behaviours:
 *
 *  - Once the page has scrolled, the bar turns translucent and frosted.
 *  - Scrolling down (past the first screenful) slides it out of the way;
 *    any scroll up brings it straight back. It never hides while focus is
 *    inside it or a menu is open, so keyboard users and open panels are safe.
 *  - A hairline along its bottom edge fills coral with reading progress.
 *
 * Reduced motion keeps the bar pinned: it still frosts, but never slides.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const header = ref.current;
      setScrolled(y > 8);

      const busy =
        !!header &&
        (header.contains(document.activeElement) ||
          header.querySelector("[aria-expanded='true']") !== null);
      if (reduce || busy || y < 160) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // A floating capsule: the header itself is transparent, and the bar is a
  // rounded glass pill inset from the page edges. 12px + 60px + 12px keeps the
  // header 84px tall, so nothing below it moves.
  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 py-3 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
        hidden ? "-translate-y-[120%]" : "translate-y-0"
      }`}
    >
      <div className="container-x">
        {/* Positioned, not clipped: the mega panels and the mobile menu hang
            off this capsule's bottom edge. */}
        <div
          className={`relative rounded-full ring-1 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
            scrolled
              ? "bg-white/75 shadow-[0_18px_44px_-18px_rgba(18,19,26,0.28)] ring-white/70 backdrop-blur-2xl backdrop-saturate-[1.8]"
              : "bg-white/60 shadow-[0_10px_32px_-16px_rgba(18,19,26,0.16)] ring-ink-900/[0.06] backdrop-blur-xl"
          }`}
        >
          {children}
          {/* Reading progress, as a hairline along the capsule's lower curve. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-0 h-px overflow-hidden rounded-full"
          >
            <span
              ref={progressRef}
              className="block h-full origin-left bg-gradient-to-r from-brand-400 to-brand-600"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>
    </header>
  );
}
