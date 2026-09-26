"use client";

import { useEffect, useLayoutEffect, useRef, type DependencyList } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";

/** Layout effect in the browser (runs before paint), plain effect on the server. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

/**
 * Runs GSAP setup against a container ref, inside a `gsap.context` so every
 * tween and ScrollTrigger it creates is reverted on unmount (route changes
 * included — otherwise pinned/scrubbed triggers from the previous page would
 * keep firing against detached nodes).
 *
 * The callback only runs when the visitor has not asked for reduced motion.
 * Under reduced motion the content is simply left in its final, static state:
 * nothing is ever hidden that GSAP would need to reveal.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (root: T) => void | (() => void),
  deps: DependencyList = [],
) {
  const ref = useRef<T>(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    ensureGsapRegistered();

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Cancels the CSS fallback reveal on any [data-intro] this scope owns.
      root.querySelectorAll<HTMLElement>("[data-intro]").forEach((node) => {
        node.classList.add("gsap-on");
      });
      if (root.hasAttribute("data-intro")) root.classList.add("gsap-on");
      return setup(root);
    }, root);

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
