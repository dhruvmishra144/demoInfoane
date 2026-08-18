"use client";

import Link from "next/link";
import { useState } from "react";
import { icons } from "../ui/Icons";
import { routes } from "@/lib/routes";
import type { CollectionData } from "@/server/content/schemas";

type EngagementModel = CollectionData["engagementModel"] & { slug: string };
type Stat = { value: string; label: string };

/**
 * Engagement models, in the reference design's pricing layout: a selector list on
 * the left, the chosen option detailed on the right, inside one contained dark
 * panel.
 *
 * This replaces the reference's SaaS pricing table on purpose — a consultancy
 * sells engagement shapes, not per-seat plans. The figures are placeholders until
 * you give me rates you will honour (CONTENT-TODO.md).
 *
 * All three options are rendered in the HTML; the selector only toggles
 * visibility, so every option is crawlable.
 */
export function EngagementModels({
  engagementModels,
  primaryStat,
  secondaryStat,
}: {
  engagementModels: EngagementModel[];
  primaryStat: Stat;
  secondaryStat: Stat;
}) {
  const [active, setActive] = useState(
    Math.max(0, engagementModels.findIndex((model) => model.popular)),
  );

  return (
    <section
      id="engagement"
      aria-labelledby="engagement-heading"
      className="scroll-mt-28 bg-white py-8"
    >
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-5xl bg-brand-950 px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
          <div className="mesh absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
          <div
            className="grid-lines absolute inset-0 -z-10 opacity-40"
            aria-hidden="true"
            style={{
              maskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent)",
              WebkitMaskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent)",
            }}
          />

          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 ring-1 ring-inset ring-white/15">
              Engagement models
            </p>
            <h2
              id="engagement-heading"
              className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
            >
              Three ways to work with us
            </h2>
            <p className="mt-4 leading-relaxed text-ink-300 lg:text-lg">
              Most clients start with discovery and then pick the shape that fits
              what discovery found. You are never locked into the first choice.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            {/* Selector */}
            <div
              role="tablist"
              aria-label="Engagement models"
              className="space-y-3"
            >
              {engagementModels.map((model, index) => (
                <button
                  key={model.name}
                  role="tab"
                  type="button"
                  id={`engagement-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls={`engagement-panel-${index}`}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`w-full rounded-3xl border p-5 text-left transition-all duration-300 ${
                    active === index
                      ? "border-brand-400/60 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-white">
                      {model.name}
                    </span>
                    {model.popular && (
                      <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Most chosen
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-400">
                    {model.tagline}
                  </span>
                </button>
              ))}

              {/* Social proof strip */}
              <div className="mt-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex -space-x-2" aria-hidden="true">
                  {[0, 1, 2, 3].map((index) => (
                    <span
                      key={index}
                      className="h-8 w-8 rounded-full border-2 border-brand-950 bg-gradient-to-br from-brand-300 to-brand-700"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {primaryStat.value} {primaryStat.label.toLowerCase()}
                  </p>
                  <p className="text-xs text-ink-400">
                    {secondaryStat.value} {secondaryStat.label.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Detail panels */}
            <div>
              {engagementModels.map((model, index) => (
                <div
                  key={model.name}
                  id={`engagement-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`engagement-tab-${index}`}
                  hidden={active !== index}
                  className="rounded-4xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm lg:p-9"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-brand-200">
                        {model.name}
                      </p>
                      <p className="mt-3 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {model.price}
                        </span>
                        <span className="text-sm text-ink-400">{model.unit}</span>
                      </p>
                    </div>
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-200"
                      aria-hidden="true"
                    >
                      <icons.shield className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-ink-300">
                    {model.summary}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                    {model.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-ink-200">
                        <span
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/25 text-brand-200"
                          aria-hidden="true"
                        >
                          <icons.check className="h-3 w-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={routes.contact}
                    className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-brand-950 transition-colors duration-300 hover:bg-brand-50"
                  >
                    Schedule a call
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <icons.arrow className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
