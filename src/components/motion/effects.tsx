"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
// DrawSVG is registered in ensureGsapRegistered(); `drawSVG` below relies on it.
import { EASE, useGsap } from "./useGsap";

/**
 * Small scroll-linked effects used across the redesigned pages. Each one is a
 * thin wrapper that server components can drop around static markup — the
 * markup stays server-rendered and readable without JavaScript.
 */

/* ---------------------------------------------------------------- TextScrub */

/**
 * Words brighten from faint to full as the paragraph scrolls through the
 * viewport — the "read along" effect from Apple's product pages. The text is
 * real and fully readable at the faint end; only its opacity changes.
 */
export function TextScrub({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "div" | "h2";
}) {
  const ref = useGsap<HTMLParagraphElement>((root) => {
    const split = SplitText.create(root, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.18 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 85%", end: "bottom 45%", scrub: 0.6 },
      },
    );
    return () => split.revert();
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ CountUp */

/**
 * Counts the leading number of a stat up from zero when it scrolls into view,
 * keeping any suffix: "12+" counts 0→12 then shows "+", "24×7" counts the 24.
 * The final value is what the server renders, so crawlers and no-JS visitors
 * see the real figure.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useGsap<HTMLSpanElement>(
    (root) => {
      const match = value.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = Number(match[1]);
      const suffix = match[2];
      const counter = { n: 0 };
      root.textContent = `0${suffix}`;
      gsap.to(counter, {
        n: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
        onUpdate: () => {
          root.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
      return () => {
        root.textContent = value;
      };
    },
    [value],
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/* -------------------------------------------------------- ChecklistProgress */

/**
 * A checklist that ticks itself off as it scrolls through the viewport: items
 * marked `[data-check-item]` gain `data-checked` one by one, in order, and the
 * markup's own `group-data-[checked]:` styles colour the icon and pop the
 * badge. Each newly ticked item redraws the strokes inside its
 * `[data-check-icon]`. Optional `[data-check-count]` shows "n/total" and
 * `[data-check-bar]` scales across with the count.
 *
 * The server renders every item already checked, so no-JS and reduced-motion
 * visitors see the finished list; scrolling back up un-ticks it.
 */
export function ChecklistProgress({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-check-item]"));
    const count = root.querySelector<HTMLElement>("[data-check-count]");
    const bar = root.querySelector<HTMLElement>("[data-check-bar]");
    const total = items.length;
    let shown = -1;

    const render = (checked: number) => {
      if (checked === shown) return;
      items.forEach((item, index) => {
        const on = index < checked;
        if (on && !item.hasAttribute("data-checked")) {
          const strokes = item.querySelectorAll("[data-check-icon] svg > *");
          if (strokes.length) gsap.fromTo(strokes, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, stagger: 0.08, ease: "power2.inOut" });
        }
        item.toggleAttribute("data-checked", on);
      });
      if (count) count.textContent = `${checked}/${total}`;
      if (bar) gsap.to(bar, { scaleX: checked / total, duration: 0.5, ease: EASE });
      shown = checked;
    };

    render(0);
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      end: "bottom 55%",
      onUpdate: (self) => render(Math.round(self.progress * total)),
    });
    render(Math.round(trigger.progress * total));

    return () => {
      items.forEach((item) => item.setAttribute("data-checked", ""));
      if (count) count.textContent = `${total}/${total}`;
      if (bar) gsap.set(bar, { scaleX: 1 });
    };
  });

  return (
    // @ts-expect-error — one ref type covers every allowed tag here.
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- IconDrawIn */

/**
 * Duotone icons that draw themselves on as their card arrives. For every
 * `[data-draw-item]` inside: its `[data-draw]` strokes draw on, its
 * `[data-fill]` shapes bloom in behind them, then the item gets `.is-live` so
 * the icon's idle loop (globals.css) starts. Cards in the same row start a
 * beat apart. The same one-shot arrival StepFocus gives the step icons, for a
 * grid instead of a list.
 */
export function IconDrawIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useGsap<HTMLDivElement>((root) => {
    root.querySelectorAll<HTMLElement>("[data-draw-item]").forEach((item, index) => {
      const strokes = item.querySelectorAll("[data-draw]");
      const fills = item.querySelectorAll("[data-fill]");
      if (strokes.length) gsap.set(strokes, { drawSVG: "0%" });
      if (fills.length) gsap.set(fills, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
      gsap
        .timeline({ delay: (index % 4) * 0.12, scrollTrigger: { trigger: item, start: "top 85%", once: true } })
        .to(strokes, { drawSVG: "100%", duration: 0.9, stagger: 0.1, ease: "power2.inOut" })
        .to(fills, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "back.out(2)" }, 0.45)
        .call(() => item.classList.add("is-live"));
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------- Parallax */

/**
 * Drifts its content vertically against the scroll. `speed` is the travel as a
 * fraction of the element's own height — positive moves up faster than the
 * page, negative lags behind. Decorative layers only: never wrap copy in it.
 */
export function Parallax({
  children,
  className,
  speed = 0.2,
  rotate = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  rotate?: number;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    gsap.fromTo(
      root,
      { yPercent: speed * 50, rotate: -rotate / 2 },
      {
        yPercent: -speed * 50,
        rotate: rotate / 2,
        ease: "none",
        scrollTrigger: {
          trigger: root.parentElement ?? root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  return (
    <div ref={ref} className={className} aria-hidden={children ? undefined : true}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- ZoomImage */

/**
 * An image that opens up as it arrives: the frame un-clips from a smaller
 * rounded rectangle while the photo inside settles from a slight zoom. Scrubbed
 * to scroll, so it moves exactly as fast as the visitor does.
 */
export function ZoomImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    const media = root.querySelector("[data-zoom-media]") ?? root.querySelector("img");
    const trigger = { trigger: root, start: "top 95%", end: "top 35%", scrub: 0.8 };
    gsap.fromTo(
      root,
      { clipPath: "inset(10% 8% 10% 8% round 32px)" },
      { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: trigger },
    );
    if (media) {
      gsap.fromTo(media, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: trigger });
    }
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- ExpandPanel */

/**
 * A full-bleed section that starts as an inset rounded card and expands to the
 * viewport edges as it scrolls in — the "the product fills the screen" beat.
 */
export function ExpandPanel({
  children,
  className,
  id,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  const ref = useGsap<HTMLElement>((root) => {
    gsap.fromTo(
      root,
      { clipPath: "inset(0% 4% 0% 4% round 48px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "top 20%", scrub: 0.6 },
      },
    );
  });

  return (
    // @ts-expect-error — one ref type covers every allowed tag here.
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ Float */

/**
 * Slow, endless bob for decorative glass spheres. Randomised per instance so a
 * cluster of them never moves in lockstep.
 */
export function Float({
  className,
  children,
  amount = 18,
  duration = 6,
}: {
  className?: string;
  children?: React.ReactNode;
  amount?: number;
  duration?: number;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    gsap.to(root, {
      y: `random(${-amount}, ${amount})`,
      x: `random(${-amount / 2}, ${amount / 2})`,
      duration: `random(${duration * 0.8}, ${duration * 1.2})`,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
    });
  });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- StepFocus */

/**
 * A vertical list whose items come into focus one at a time as they pass the
 * middle of the viewport: the active card is full strength, the others recede.
 * Mark items with `[data-step]`.
 *
 * Optional extras, picked up when present:
 *  - `[data-draw]` strokes inside a step draw on the first time it arrives,
 *    `[data-fill]` shapes bloom in behind them, then the step gets `.is-live`
 *    so its icon's idle loop starts.
 *  - `[data-ping]` inside a step pulses outward once as it arrives.
 *  - `[data-rail-fill]` anywhere in the list fills top-to-bottom with scroll.
 */
export function StepFocus({
  children,
  className,
  as: Tag = "ol",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "ol" | "ul" | "div";
}) {
  const ref = useGsap<HTMLOListElement>((root) => {
    root.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
      // The card itself only moves and scales; its *contents* do the fading.
      // Fading the card would make its background translucent too, letting
      // whatever sits behind it (the connector rail) show through.
      const content = Array.from(step.children);
      gsap
        .timeline({
          scrollTrigger: { trigger: step, start: "top 85%", end: "bottom 30%", scrub: 0.5 },
        })
        .fromTo(step, { scale: 0.94, y: 40 }, { scale: 1, y: 0, ease: EASE, duration: 0.4 })
        .fromTo(content, { opacity: 0.3 }, { opacity: 1, ease: EASE, duration: 0.4 }, 0)
        .to(step, { scale: 1, duration: 0.3 })
        .to(step, { scale: 0.98, duration: 0.3 })
        .to(content, { opacity: 0.5, duration: 0.3 }, "<");

      // One-shot arrival: draw the outlines, bloom the duotone fills in behind
      // them, ping the badge, then go live.
      const strokes = step.querySelectorAll("[data-draw]");
      const fills = step.querySelectorAll("[data-fill]");
      const ping = step.querySelector("[data-ping]");
      if (strokes.length) gsap.set(strokes, { drawSVG: "0%" });
      if (fills.length) {
        gsap.set(fills, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
      }
      gsap
        .timeline({ scrollTrigger: { trigger: step, start: "top 70%", once: true } })
        .to(strokes, { drawSVG: "100%", duration: 0.9, stagger: 0.12, ease: "power2.inOut" })
        .to(
          fills,
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2)" },
          0.45,
        )
        .fromTo(
          ping,
          { scale: 1, opacity: 0.6 },
          { scale: 1.9, opacity: 0, duration: 0.9, ease: "power2.out" },
          0.2,
        )
        .call(() => step.classList.add("is-live"));
    });

    const rail = root.querySelector("[data-rail-fill]");
    if (rail) {
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 65%", end: "bottom 55%", scrub: 0.5 },
        },
      );
    }
  });

  return (
    // @ts-expect-error — one ref type covers every allowed tag here.
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
