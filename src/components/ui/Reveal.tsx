"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * One IntersectionObserver per instance flips `data-reveal` to "in" the first
 * time the element enters the viewport; the actual fade/rise is defined in CSS
 * (globals.css) so the animation never depends on JavaScript timing.
 *
 * Two deliberate properties:
 *  - It only ever *adds* visibility. If the observer never runs — JS disabled,
 *    an old browser, a crawler — the CSS reduced-motion rule and the fallback
 *    below still leave the content readable, and the HTML is present either way
 *    because these are server-rendered children.
 *  - `once` is the default: elements do not re-hide when scrolled past, which is
 *    distracting when scrolling back up.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  x,
  scale = false,
  className,
  amount = 0.15,
}: {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article" | "span" | "header" | "figure";
  /** Stagger offset in milliseconds. */
  delay?: number;
  /** Slide in horizontally instead of vertically. */
  x?: "left" | "right";
  /** Add a slight scale-up — used for large media cards. */
  scale?: boolean;
  className?: string;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect the OS setting here too, not just in CSS: no observer, no work.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.reveal = "in";
      return;
    }

    // No IntersectionObserver (very old browsers): show the content rather than
    // leaving it at opacity 0 with nothing able to reveal it.
    if (!("IntersectionObserver" in window)) {
      node.dataset.reveal = "in";
      return;
    }

    // Elements already in view on load (the hero) should not wait for a scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          observer.unobserve(entry.target);
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <Tag
      // @ts-expect-error — one ref type covers every allowed tag here.
      ref={ref}
      data-reveal=""
      data-reveal-x={x}
      data-reveal-scale={scale ? "" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
