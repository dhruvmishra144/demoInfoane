"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import type { home } from "@/content/redesign";

type Strength = (typeof home.why.items)[number];

/**
 * "Why Infoane" switcher: short labels down the left, the active strength's
 * heading, copy and photo on the right.
 *
 * A real ARIA tablist (arrow keys move between tabs, Home/End jump), the same
 * idiom as IndustryTabs and the careers BenefitsTabs. Below `lg` the labels
 * become a horizontal scroller above the panel.
 */
export function WhyTabs({ items }: { items: Strength[] }) {
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
          gsap.fromTo(panel.querySelector("[data-why-image]"), { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "expo.out" });
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
    <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
      <div
        role="tablist"
        aria-label="Why Infoane"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-6 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
      >
        {items.map((strength, index) => {
          const selected = index === active;
          return (
            <button
              key={strength.title}
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
              className={`shrink-0 border-b-2 py-3 text-left text-[14px] leading-5 transition-colors duration-300 lg:py-[22px] ${
                selected
                  ? "border-brand-500 font-semibold text-brand-500"
                  : "border-transparent text-ink-600 hover:text-ink-900"
              }`}
            >
              {strength.tab}
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        <h3 className="text-[28px] font-bold leading-[34px] text-ink-900">{item.title}</h3>
        <p className="mt-5 max-w-[880px] text-[16px] leading-[26px] text-body">{item.body}</p>
        <div className="relative mt-6 aspect-[872/318] min-h-[200px] overflow-hidden rounded-2xl bg-ink-100">
          <div data-why-image className="absolute inset-0">
            <Image
              key={item.image}
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 1280px) 872px, (min-width: 1024px) 70vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
