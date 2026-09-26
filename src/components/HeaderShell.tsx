"use client";

import { useEffect, useState } from "react";

/**
 * The header's outer bar. Client-side only for one thing: once the page has
 * scrolled, the bar gains a blurred backdrop and a hairline shadow so it reads
 * as floating above the content rather than part of the hero.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled
          ? "border-ink-200/80 bg-paper/75 shadow-[0_8px_30px_-12px_rgba(20,21,31,0.12)] backdrop-blur-xl backdrop-saturate-150"
          : "border-ink-200/60 bg-paper"
      }`}
    >
      {children}
    </header>
  );
}
