"use client";

import { gsap } from "@/lib/gsap";
import { useGsap } from "./useGsap";

/**
 * Chart arrival for static dashboard markup.
 *
 *  - `[data-bar]` elements grow up from their baseline, staggered.
 *  - `[data-line]` SVG strokes draw on, `[data-area]` fills fade in after.
 *
 * Plays once when the chart scrolls into view. Without JavaScript or under
 * reduced motion the chart is simply drawn in its final state.
 */
export function GrowBars({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    const bars = root.querySelectorAll("[data-bar]");
    const lines = root.querySelectorAll("[data-line]");
    const areas = root.querySelectorAll("[data-area]");

    gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(lines, { drawSVG: "0%" });
    gsap.set(areas, { opacity: 0 });

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 90%", once: true } })
      .to(lines, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut", stagger: 0.15 }, 0.2)
      .to(areas, { opacity: 1, duration: 1, ease: "power2.out" }, 1)
      .to(bars, { scaleY: 1, duration: 1.1, ease: "expo.out", stagger: 0.05 }, 0.3);
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
