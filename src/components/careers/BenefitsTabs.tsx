"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import type { careersRedesign } from "@/content/redesign";

type Benefit = (typeof careersRedesign)["benefits"]["items"][number];

/**
 * Benefits switcher: a vertical tab list beside an image card.
 *
 * A real ARIA tablist (arrow keys move between tabs, Home/End jump). Switching
 * cross-fades the card with a short rise, and the image settles from a slight
 * zoom — the same idiom as the homepage's IndustryTabs.
 */
export function BenefitsTabs({ items }: { items: Benefit[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    if (index === active) return;
    const panel = panelRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!panel || reduce) {
      setActive(index);
      return;
    }
    ensureGsapRegistered();
    gsap.to(panel, {
      opacity: 0,
      y: 10,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);
        requestAnimationFrame(() => {
          gsap.fromTo(panel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
          gsap.fromTo(
            panel.querySelector("[data-benefit-image]"),
            { scale: 1.08 },
            { scale: 1, duration: 1.2, ease: "expo.out" },
          );
        });
      },
    });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  const item = items[active];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
      <div
        role="tablist"
        aria-label="Benefits and culture"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {items.map((benefit, index) => {
          const selected = index === active;
          return (
            <button
              key={benefit.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className={`shrink-0 rounded-xl border-l-[4px] bg-white px-5 py-4 text-left text-base transition-all duration-500 ease-[var(--ease-out-expo)] lg:w-full ${
                selected
                  ? "border-brand-500 font-semibold text-ink-900 shadow-md shadow-ink-900/5"
                  : "border-ink-200 text-ink-600 hover:border-ink-300 hover:text-ink-900"
              }`}
            >
              {benefit.title}
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xl shadow-ink-900/5 sm:p-6"
      >
        <div className="relative aspect-[16/7] overflow-hidden rounded-2xl bg-ink-100">
          <div data-benefit-image className="absolute inset-0">
            <Image
              key={item.image}
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-600">{item.body}</p>
      </div>
    </div>
  );
}
