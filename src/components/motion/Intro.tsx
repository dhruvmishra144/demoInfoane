"use client";

import { gsap, SplitText } from "@/lib/gsap";
import { EASE, useGsap } from "./useGsap";

/**
 * Page-load choreography for a hero.
 *
 * Mark children with `data-intro`; they play in DOM order:
 *  - `data-intro="lines"` — split into lines, each rising out of a mask (the
 *    Apple keynote headline move).
 *  - `data-intro="media"` — scales down from 1.08 and un-blurs.
 *  - anything else — a short rise with a blur-to-sharp fade.
 *
 * Everything is hidden from first paint by the `[data-intro]` rule in
 * globals.css, so there is no flash between SSR paint and hydration.
 */
export function Intro({
  children,
  className,
  as: Tag = "div",
  delay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header";
  delay?: number;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-intro]"));
    const tl = gsap.timeline({ delay, defaults: { ease: EASE } });
    const splits: SplitText[] = [];

    nodes.forEach((node, index) => {
      const at = index === 0 ? 0 : "<0.12";
      const kind = node.dataset.intro;

      if (kind === "lines") {
        gsap.set(node, { opacity: 1 });
        const split = SplitText.create(node, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
        splits.push(split);
        tl.from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.09 }, at);
        return;
      }

      if (kind === "media") {
        tl.fromTo(
          node,
          { opacity: 0, scale: 1.08, filter: "blur(12px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8 },
          index === 0 ? 0 : "<0.05",
        );
        return;
      }

      tl.fromTo(
        node,
        { opacity: 0, y: 28, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
        at,
      );
    });

    return () => splits.forEach((split) => split.revert());
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
