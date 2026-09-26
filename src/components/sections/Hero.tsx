"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { icons } from "../ui/Icons";
import { routes } from "@/lib/routes";
import { gsap, ScrollTrigger, SplitText, ensureGsapRegistered } from "@/lib/gsap";
import type { CollectionData } from "@/server/content/schemas";

type HeroCopy = {
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  note: string;
  cardTitle: string;
  cardItems: string[];
};

/**
 * Hero.
 *
 * The H1 states plainly what the company does and who for. Something like
 * "Engineering, without the drama" would be catchier and would rank for nothing.
 *
 * The single checklist card on the right is built from markup, not a fake
 * dashboard screenshot — no image request, nothing to become the Largest
 * Contentful Paint element, and no "AI SaaS template" mockup cliché.
 *
 * Client component: the intro timeline (headline split-reveal, staggered
 * copy, a scroll-linked parallax drift on the visual) needs GSAP in the
 * browser. It receives already-resolved CMS copy as plain props, same as
 * before — no data fetching happens here.
 */
export function Hero({
  settings,
  hero,
  headline,
  labels,
}: {
  settings: CollectionData["settings"];
  hero: HeroCopy;
  /** Pre-split so the highlighted phrase survives an editor rewording the H1. */
  headline: { before: string; highlight: string; after: string };
  labels: Record<string, string>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const h1 = h1Ref.current;
    const visual = visualRef.current;
    if (!root || !h1 || !visual) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rest = root.querySelectorAll<HTMLElement>("[data-hero-in]");

    if (reducedMotion) {
      rest.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    ensureGsapRegistered();
    let split: SplitText | undefined;
    let ctx: gsap.Context | undefined;

    // Split-text reveal waits for the display font so lines don't reflow
    // mid-animation.
    document.fonts.ready.then(() => {
      if (!h1.isConnected) return;

      ctx = gsap.context(() => {
        split = SplitText.create(h1, { type: "lines", linesClass: "split-line" });
        gsap.set(split.lines, { yPercent: 110, opacity: 0 });
        gsap.set(rest, { y: 16, opacity: 0 });
        gsap.set(visual, { y: 24, opacity: 0, scale: 0.97 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(split!.lines, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 })
          .to(rest, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, "-=0.5")
          .to(visual, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, "-=0.6");

        // Subtle scroll-linked parallax/rotation on the visual — a drift, not
        // a pin; this is the hero, so it should feel alive without demanding
        // the scroll like the flagship pinned section further down the page.
        gsap.to(visual, {
          yPercent: 8,
          rotate: -1.2,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
      }, root);
    });

    return () => {
      ctx?.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-ink-50 pb-16 pt-12 lg:pb-24 lg:pt-16"
    >
      <div className="mesh-light absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p
              data-hero-in
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
            >
              <icons.shield className="h-3.5 w-3.5" />
              {settings.credentials[0]} · {settings.credentials[1]}
            </p>

            <h1
              ref={h1Ref}
              className="font-display mt-6 text-[2.6rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-6xl"
            >
              {headline.before}
              {headline.highlight && (
                <span className="italic text-brand-600">{headline.highlight}</span>
              )}
              {headline.after}
            </h1>

            <p data-hero-in className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 lg:text-lg">
              {hero.subhead}
            </p>

            <div data-hero-in className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={routes.contact}>{hero.primaryCta}</Button>
              <Button href={routes.services} variant="light" withChip={false}>
                {hero.secondaryCta}
              </Button>
            </div>

            <p data-hero-in className="mt-6 text-sm text-ink-400">
              {hero.note}
            </p>
          </div>

          {/* One clean checklist card — real content, no fake dashboard. */}
          <div ref={visualRef} className="relative mx-auto max-w-lg lg:mx-0 lg:ml-auto">
            <div className="rounded-4xl border border-ink-200 bg-white p-7 shadow-2xl shadow-ink-950/10">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-medium text-ink-900">{hero.cardTitle}</p>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                  {settings.promises.discoveryLength}
                </span>
              </div>
              <ul className="mt-5 space-y-3.5">
                {hero.cardItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-600">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"
                      aria-hidden="true"
                    >
                      <icons.check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3.5 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700">
                  {labels["hero.cadenceLabel"]}
                </p>
                <p className="mt-1 font-display text-base font-medium text-brand-800">
                  {labels["hero.cadenceValue"]}
                </p>
              </div>
              <div className="rounded-2xl border border-mint-200 bg-mint-50 px-4 py-3.5 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-mint-700">
                  {labels["hero.demoLabel"]}
                </p>
                <p className="mt-1 font-display text-base font-medium text-mint-700">
                  {labels["hero.demoValue"]}
                </p>
              </div>
              <div className="rounded-2xl border border-peach-200 bg-peach-50 px-4 py-3.5 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-peach-700">
                  {labels["hero.ipLabel"]}
                </p>
                <p className="mt-1 font-display text-base font-medium text-peach-600">
                  {labels["hero.ipValue"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
