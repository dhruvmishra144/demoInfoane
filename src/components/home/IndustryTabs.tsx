"use client";

import { useId, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { home } from "@/content/redesign";

type Industry = (typeof home.industries.items)[number];

/**
 * Industry switcher: a segmented tab bar over a two-panel card.
 *
 * A real ARIA tablist — arrow keys move between tabs, and only the active
 * panel is rendered. Switching cross-fades the panel with a short rise; the
 * tab's white pill slides to the new tab rather than jumping.
 */
export function IndustryTabs({ items, activeLabel }: { items: Industry[]; activeLabel: string }) {
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
      y: 12,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);
        requestAnimationFrame(() => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
          );
          gsap.fromTo(
            panel.querySelectorAll("[data-tab-item]"),
            { opacity: 0, x: -12 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.06, ease: "expo.out", delay: 0.1 },
          );
        });
      },
    });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  const industry = items[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Industries"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto rounded-2xl bg-[#f3f2ef] p-1"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.name}
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
              className={`shrink-0 rounded-xl px-5 py-2.5 leading-5 transition-all duration-500 ease-[var(--ease-out-expo)] ${
                selected
                  ? "bg-white text-[15px] font-semibold text-brand-500 shadow-sm"
                  : "text-[13px] font-medium text-body hover:text-ink-900"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-10 grid overflow-hidden rounded-[28px] border border-ink-200 bg-white shadow-xl shadow-ink-900/5 lg:min-h-[419px] lg:grid-cols-[420px_1fr]"
      >
        <div
          className={`relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden bg-gradient-to-br p-8 lg:px-8 lg:pb-8 lg:pt-10 ${industry.gradient}`}
        >
          {/* Line-art diamond and arc from the mockup. */}
          <div className="absolute right-[48px] top-[54px] h-[127px] w-[127px] rotate-45 border border-white/70" aria-hidden="true" />
          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full border border-white/60" aria-hidden="true" />
          <p className="relative inline-flex self-start rounded-full bg-white/15 px-3 py-1 text-[13px] font-bold uppercase leading-5 tracking-[0.14em] text-brand-500">
            {industry.name}
          </p>
          <p className="relative mt-4 text-[21px] font-bold leading-7 text-white">
            {industry.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="p-8 lg:px-12 lg:pb-6 lg:pt-12">
          <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[13px] font-bold uppercase leading-5 tracking-[0.14em] text-brand-500">{activeLabel}</p>
          <h3 className="mt-[26px] max-w-[22rem] text-[24px] font-bold leading-[30px] [text-wrap:wrap]">
            {industry.headline}
          </h3>
          <p className="mt-[7px] max-w-[26rem] text-[15px] leading-6 text-body [text-wrap:wrap]">{industry.body}</p>
          <ul className="mt-[22px] space-y-3">
            {industry.points.map((point) => (
              <li key={point} data-tab-item className="flex items-center gap-3 text-[14px] leading-6 text-body">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
