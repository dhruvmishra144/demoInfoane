"use client";

import { useEffect, useRef, useState } from "react";
import { icons } from "../ui/Icons";
import type { SectionCopy } from "@/lib/page-sections";
import type { CollectionData } from "@/server/content/schemas";
import { gsap, ScrollTrigger, ensureGsapRegistered } from "@/lib/gsap";

type ProcessStep = CollectionData["process"] & { slug: string };

/**
 * The flagship scroll-pinned moment: this section pins in place while scroll
 * progress steps through the four delivery stages, Apple-product-page style.
 *
 * It's still a real tablist underneath (arrow keys, click, `aria-selected`) —
 * scrolling is an additional way to move through the same four panels, not a
 * replacement for it. `prefers-reduced-motion` disables the pin/scrub
 * entirely and falls back to the plain click-driven tablist this component
 * always was.
 */

const tabVisuals = [
  { label: "Discovery output", rows: ["System audit", "Architecture options", "Costed plan"] },
  { label: "Architecture review", rows: ["Target design", "Security model", "Delivery sequence"] },
  { label: "Sprint board", rows: ["In progress", "In review", "Accepted"] },
  { label: "Operations", rows: ["Monitoring", "Runbooks", "Handover"] },
];

export function Capabilities({
  steps,
  copy,
  labels,
}: {
  steps: ProcessStep[];
  copy: SectionCopy;
  labels: Record<string, string>;
}) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (steps.length < 2) return;

    ensureGsapRegistered();

    const st = ScrollTrigger.create({
      trigger: stage,
      start: "top top+=80",
      end: `+=${(steps.length - 1) * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      onUpdate(self) {
        const index = Math.min(
          steps.length - 1,
          Math.round(self.progress * (steps.length - 1)),
        );
        if (index !== activeRef.current) setActive(index);
      },
    });
    scrollTriggerRef.current = st;

    return () => {
      st.kill();
      scrollTriggerRef.current = null;
    };
  }, [steps.length]);

  /** Used by both click and arrow-key navigation. Scrolls to the matching
   * point in the pinned range when scroll-driving is active, or just flips
   * the panel directly (reduced motion / no scroll trigger). */
  function goToStage(index: number) {
    const st = scrollTriggerRef.current;
    if (!st || steps.length < 2) {
      setActive(index);
      return;
    }
    const target = st.start + (index / (steps.length - 1)) * (st.end - st.start);
    gsap.to(window, { duration: 0.8, ease: "power2.inOut", scrollTo: target });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % steps.length
        : (active - 1 + steps.length) % steps.length;
    goToStage(next);
    document.getElementById(`capability-tab-${next}`)?.focus();
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-28 bg-ink-50 py-16 lg:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-inset ring-brand-100">
            {copy.eyebrow}
          </p>
          <h2
            id="capabilities-heading"
            className="font-display text-3xl font-medium sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
          >
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500 lg:text-lg">
            {copy.lead}
          </p>
        </div>

        <div ref={stageRef} className="pt-10">
          {/* Pill switcher */}
          <div
            role="tablist"
            aria-label="Delivery stages"
            onKeyDown={onKeyDown}
            className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-center gap-1 rounded-full border border-ink-200 bg-white p-1.5 shadow-sm"
          >
            {steps.map((step, index) => (
              <button
                key={step.title}
                id={`capability-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={active === index}
                aria-controls={`capability-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => goToStage(index)}
                className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === index
                    ? "bg-ink-900 text-white shadow-md shadow-ink-900/20"
                    : "text-ink-500 hover:bg-ink-50 hover:text-brand-700"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Panels */}
          <div className="mt-10">
            {steps.map((step, index) => {
              // The visuals are positional but the process steps come from the CMS,
              // so an added step reuses the last visual rather than crashing.
              const visual = tabVisuals[Math.min(index, tabVisuals.length - 1)];
              return (
                <div
                  key={step.title}
                  id={`capability-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`capability-tab-${index}`}
                  hidden={active !== index}
                  className="grid gap-6 lg:grid-cols-[1.15fr_1fr]"
                >
                  {/* Dark visual card */}
                  <div className="relative isolate overflow-hidden rounded-4xl bg-ink-900 p-6 lg:p-8">
                    <div className="mesh absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{visual.label}</p>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-brand-200">
                        {labels["process.stageWord"]} {step.step}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-2.5">
                      {visual.rows.map((row, rowIndex) => (
                        <li
                          key={row}
                          className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3.5 ring-1 ring-inset ring-white/10"
                        >
                          <span className="flex items-center gap-3 text-sm text-ink-200">
                            <span
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-200"
                              aria-hidden="true"
                            >
                              <icons.check className="h-3.5 w-3.5" />
                            </span>
                            {row}
                          </span>
                          <span className="text-[11px] font-semibold text-ink-400">
                            {rowIndex === 0
                              ? labels["process.statusComplete"]
                              : rowIndex === 1
                                ? labels["process.statusActive"]
                                : labels["process.statusQueued"]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Copy card */}
                  <div className="flex flex-col justify-center rounded-4xl border border-ink-200 bg-white p-7 lg:p-9">
                    <span className="inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {labels["process.stageWord"]} {step.step}
                    </span>
                    <h3 className="font-display mt-5 text-2xl font-medium">{step.title}</h3>
                    <p className="mt-4 leading-relaxed text-ink-500">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
