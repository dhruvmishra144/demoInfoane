"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { EASE, useGsap } from "./useGsap";

type Variant = "up" | "scale" | "tilt" | "blur";

const FROM: Record<Variant, gsap.TweenVars> = {
  up: { opacity: 0, y: 48 },
  scale: { opacity: 0, y: 40, scale: 0.94 },
  // Cards swing up from a slight backward lean — reads as depth, not bounce.
  tilt: { opacity: 0, y: 70, rotateX: -18, transformOrigin: "50% 100%" },
  blur: { opacity: 0, y: 24, filter: "blur(10px)" },
};

/**
 * Scroll-triggered entrance for a block.
 *
 * Inside the wrapper:
 *  - `[data-split]` headings rise line by line out of a mask.
 *  - `[data-reveal-item]` children animate in as a staggered group, in the
 *    chosen variant. With none marked, the wrapper itself animates.
 *
 * Plays once. Scrolling back up leaves it in place — re-hiding content the
 * visitor has already read is distracting.
 */
export function ScrollReveal({
  children,
  className,
  variant = "up",
  stagger = 0.1,
  start = "top 88%",
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  stagger?: number;
  start?: string;
  as?: "div" | "section" | "ul" | "ol" | "header" | "article";
  id?: string;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    const splits: SplitText[] = [];

    root.querySelectorAll<HTMLElement>("[data-split]").forEach((heading) => {
      const split = SplitText.create(heading, { type: "lines", mask: "lines" });
      splits.push(split);
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: EASE,
        scrollTrigger: { trigger: heading, start: "top 88%", once: true },
      });
    });

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    const targets = items.length ? items : [root];
    if (variant === "tilt") gsap.set(root, { perspective: 1200 });

    gsap.set(targets, FROM[variant]);
    ScrollTrigger.batch(targets, {
      start,
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger,
          ease: EASE,
          overwrite: true,
          clearProps: "filter,transform",
        }),
    });

    return () => splits.forEach((split) => split.revert());
  });

  return (
    // @ts-expect-error — one ref type covers every allowed tag here.
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
