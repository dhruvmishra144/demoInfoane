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

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 border-b transition-[transform,background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-white/60 bg-paper/70 shadow-[0_10px_40px_-18px_rgba(20,21,31,0.18)] backdrop-blur-2xl backdrop-saturate-[1.8]"
          : "border-ink-200/60 bg-paper"
      }`}
    >
      {children}
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
        <span
          ref={progressRef}
          className="block h-full origin-left bg-gradient-to-r from-brand-400 to-brand-600"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
    </header>
  );
}
