"use client";

import { useState } from "react";
import { icons } from "../ui/Icons";
import type { CollectionData } from "@/server/content/schemas";

type ProcessStep = CollectionData["process"] & { slug: string };

/**
 * Tabbed delivery-process panel, mirroring the reference design's pill switcher.
 *
 * A real tablist: arrow keys move between tabs, only the active tab is in the tab
 * order, and each panel is associated with its tab. All four panels are rendered
 * in the HTML (inactive ones hidden), so the content is crawlable rather than
 * conjured on click.
 */

const tabVisuals = [
  { label: "Discovery output", rows: ["System audit", "Architecture options", "Costed plan"] },
  { label: "Architecture review", rows: ["Target design", "Security model", "Delivery sequence"] },
  { label: "Sprint board", rows: ["In progress", "In review", "Accepted"] },
  { label: "Operations", rows: ["Monitoring", "Runbooks", "Handover"] },
];

export function Capabilities({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % steps.length
        : (active - 1 + steps.length) % steps.length;
    setActive(next);
    document.getElementById(`capability-tab-${next}`)?.focus();
  }

  return (
    <section
      id="process"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-28 bg-ink-50 py-16 lg:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-inset ring-brand-100">
            How we work
          </p>
          <h2
            id="capabilities-heading"
            className="text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
          >
            A delivery process you can hold us to
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500 lg:text-lg">
            Most failed projects fail in the first month, on assumptions nobody
            wrote down. This is the sequence we use so that does not happen.
          </p>
        </div>

        {/* Pill switcher */}
        <div
          role="tablist"
          aria-label="Delivery stages"
          onKeyDown={onKeyDown}
          className="mx-auto mt-10 flex w-full max-w-2xl flex-wrap items-center justify-center gap-1 rounded-full border border-ink-200 bg-white p-1.5 shadow-sm"
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
              onClick={() => setActive(index)}
              className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active === index
                  ? "bg-brand-950 text-white shadow-md shadow-brand-950/20"
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
            const visual = tabVisuals[index];
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
                <div className="relative isolate overflow-hidden rounded-4xl bg-brand-950 p-6 lg:p-8">
                  <div className="mesh absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{visual.label}</p>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-brand-200">
                      Stage {step.step}
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
                          {rowIndex === 0 ? "Complete" : rowIndex === 1 ? "Active" : "Queued"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copy card */}
                <div className="flex flex-col justify-center rounded-4xl border border-ink-200 bg-white p-7 lg:p-9">
                  <span className="inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    Stage {step.step}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-500">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
