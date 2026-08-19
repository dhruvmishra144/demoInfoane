import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { icons } from "../ui/Icons";
import { routes } from "@/lib/routes";
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
 * The stacked cards on the right are built from markup and CSS rather than a
 * screenshot: no image request, nothing to become the Largest Contentful Paint
 * element, and no asset to re-export when the brand changes.
 */
export function Hero({
  settings,
  hero,
  headline,
  labels,
}: {
  settings: CollectionData["settings"];
  hero: HeroCopy;
  /** Pre-split so the gradient phrase survives an editor rewording the H1. */
  headline: { before: string; highlight: string; after: string };
  labels: Record<string, string>;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-50 pb-16 pt-12 lg:pb-24 lg:pt-16">
      <div className="mesh-light absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
                <icons.shield className="h-3.5 w-3.5" />
                {settings.credentials[0]} · {settings.credentials[1]}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-5xl lg:text-6xl">
                {headline.before}
                {headline.highlight && (
                  <span className="text-gradient">{headline.highlight}</span>
                )}
                {headline.after}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 lg:text-lg">
                {hero.subhead}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={routes.contact}>{hero.primaryCta}</Button>
                <Button href={routes.services} variant="light" withChip={false}>
                  {hero.secondaryCta}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-6 text-sm text-ink-400">{hero.note}</p>
            </Reveal>
          </div>

          {/* Stacked, gently floating UI cards. Entirely decorative. */}
          <Reveal delay={200} x="right" className="relative">
            <div className="relative mx-auto max-w-lg lg:mx-0 lg:ml-auto">
              {/* Card 1 — engagement checklist */}
              <div className="float-slow rounded-4xl border border-ink-200 bg-white p-6 shadow-2xl shadow-brand-950/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-900">{hero.cardTitle}</p>
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
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

              {/* Card 2 — delivery cadence. Offset right with a real gap rather
                  than a negative margin: the two cards float independently, and
                  overlapping them means one can drift over the other's text. */}
              <div className="float-slower relative z-10 ml-auto mt-5 w-[82%] rounded-3xl border border-ink-200 bg-white p-5 shadow-2xl shadow-brand-950/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                    {labels["hero.cadenceLabel"]}
                  </p>
                  <span className="text-xs font-semibold text-brand-700">
                    {labels["hero.cadenceValue"]}
                  </span>
                </div>

                {/* Decorative bar chart. */}
                <div className="mt-4 flex h-20 items-end gap-2" aria-hidden="true">
                  {[38, 55, 46, 72, 60, 88, 76].map((height, index) => (
                    <span
                      key={index}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-brand-200 to-brand-500"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3.5">
                  <p className="text-xs text-ink-500">{labels["hero.demoLabel"]}</p>
                  <p className="text-sm font-bold text-ink-900">{labels["hero.demoValue"]}</p>
                </div>
              </div>

              {/* Card 3 — small badge, tucked into the space left of card 2 */}
              <div className="absolute bottom-3 left-0 z-20 hidden rounded-2xl border border-ink-200 bg-white px-4 py-3 shadow-xl shadow-brand-950/10 lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                  {labels["hero.ipLabel"]}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-900">
                  {labels["hero.ipValue"]}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
