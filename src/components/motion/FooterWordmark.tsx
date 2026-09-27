"use client";

import { gsap, SplitText } from "@/lib/gsap";
import { useGsap } from "./useGsap";

/**
 * The oversized brand wordmark along the bottom of the footer.
 *
 * Two stacked copies of the word: a faint base layer, and a coral layer that is
 * only visible inside a soft circle around the cursor — so moving across the
 * footer "lights up" the letters under the pointer. The letters also rise into
 * place, one after another, scrubbed to the scroll as the footer arrives.
 *
 * Decorative: the brand name is already the logo's text, so the whole thing is
 * hidden from assistive technology.
 */
export function FooterWordmark({ text }: { text: string }) {
  const ref = useGsap<HTMLDivElement>((root) => {
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-word]"));
    // Gradient text breaks once letters get their own transforms, so the fill
    // moves from the word onto each letter (see `.wordmark` in globals.css).
    const splits = layers.map((layer) => {
      const split = SplitText.create(layer, { type: "chars", charsClass: "wordmark-char" });
      layer.classList.add("is-split");
      return split;
    });

    // Both layers share one scrubbed timeline, so they never drift apart.
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
    });
    splits.forEach((split) => {
      tl.from(split.chars, { yPercent: 105, rotate: 6, stagger: 0.06, ease: "power3.out" }, 0);
    });

    // Cursor spotlight (fine pointers only). Written to CSS variables so the
    // mask moves on the compositor, with quickTo easing it toward the pointer.
    let removePointer = () => {};
    if (window.matchMedia("(pointer: fine)").matches) {
      const glow = root.querySelector<HTMLElement>("[data-glow]");
      if (glow) {
        const pos = { x: 50, y: 50 };
        const apply = () => {
          glow.style.setProperty("--mx", `${pos.x}%`);
          glow.style.setProperty("--my", `${pos.y}%`);
        };
        const toX = gsap.quickTo(pos, "x", { duration: 0.6, ease: "power3.out", onUpdate: apply });
        const toY = gsap.quickTo(pos, "y", { duration: 0.6, ease: "power3.out", onUpdate: apply });
        const onMove = (event: PointerEvent) => {
          const box = root.getBoundingClientRect();
          toX(((event.clientX - box.left) / box.width) * 100);
          toY(((event.clientY - box.top) / box.height) * 100);
        };
        const footer = root.closest("footer") ?? root;
        const show = () => gsap.to(glow, { opacity: 1, duration: 0.4 });
        const hide = () => gsap.to(glow, { opacity: 0, duration: 0.6 });
        footer.addEventListener("pointermove", onMove as EventListener);
        footer.addEventListener("pointerenter", show);
        footer.addEventListener("pointerleave", hide);
        removePointer = () => {
          footer.removeEventListener("pointermove", onMove as EventListener);
          footer.removeEventListener("pointerenter", show);
          footer.removeEventListener("pointerleave", hide);
        };
      }
    }

    return () => {
      removePointer();
      splits.forEach((split) => split.revert());
      layers.forEach((layer) => layer.classList.remove("is-split"));
    };
  });

  const word =
    "wordmark block whitespace-nowrap text-center text-[21vw] font-bold uppercase leading-[0.8] tracking-[-0.06em] xl:text-[17.5rem]";

  return (
    <div ref={ref} aria-hidden="true" className="relative select-none overflow-hidden pt-4">
      {/* Base layer: a faint top-lit fill, like engraved glass. */}
      <span
        data-word
        className={word}
        style={{
          ["--word-fill" as string]:
            "linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0.05) 60%, rgba(255,255,255,0))",
        }}
      >
        {text}
      </span>
      {/* Spotlight layer: coral, shown only inside the cursor's circle. */}
      <span
        data-glow
        className="pointer-events-none absolute inset-0 pt-4 opacity-0 [mask-image:radial-gradient(18rem_circle_at_var(--mx,50%)_var(--my,50%),#000,transparent_70%)]"
      >
        <span
          data-word
          className={word}
          style={{
            ["--word-fill" as string]:
              "linear-gradient(to bottom, #ff8664, #ff6b4a 45%, rgba(236,84,49,0))",
          }}
        >
          {text}
        </span>
      </span>
    </div>
  );
}
