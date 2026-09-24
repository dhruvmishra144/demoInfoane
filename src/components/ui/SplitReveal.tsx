"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, ensureGsapRegistered } from "@/lib/gsap";

/**
 * Word/line-stagger heading reveal, GSAP's version of `Reveal.tsx`'s
 * philosophy: the heading is real server-rendered text, fully visible with
 * no JS. Only once this component mounts does it split the text and animate
 * it in — a JS failure, a crawler, or reduced-motion all just leave the
 * plain heading exactly as written.
 *
 * `children` must be a plain string — `SplitText` needs to own the node's
 * text content, so this isn't a place for rich JSX titles.
 */
export function SplitReveal({
  children,
  as: Tag = "h2",
  id,
  className,
  type = "words",
  start = "top 85%",
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  type?: "words" | "lines";
  start?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureGsapRegistered();

    const split = SplitText.create(node, {
      type,
      wordsClass: "split-word",
      linesClass: "split-line",
    });
    const targets = type === "lines" ? split.lines : split.words;

    gsap.set(targets, { yPercent: 110, opacity: 0 });
    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.045,
      scrollTrigger: {
        trigger: node,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [type, start]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
