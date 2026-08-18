import Link from "next/link";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { icons } from "../ui/Icons";
import { routes } from "@/lib/routes";
import type { CollectionData } from "@/server/content/schemas";

type CaseStudy = CollectionData["caseStudy"] & { slug: string };

/**
 * Success stories, in the reference design's 2×2 card grid.
 *
 * Each card leads with a coloured media panel. Those panels are CSS gradients
 * standing in for real client imagery — swap them for photography or product
 * screenshots when the case studies are approved (CONTENT-TODO.md).
 */

const cardTints = [
  "from-brand-400 to-brand-700",
  "from-brand-300 to-brand-600",
  "from-brand-500 to-brand-900",
  "from-brand-200 to-brand-500",
];

export function CaseStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <Section
      id="work"
      tone="muted"
      align="center"
      eyebrow="Success stories"
      title="Results our clients can point at"
      lead="Described the way we would describe them to your board: what was broken, what we built, and the number that changed."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {caseStudies.map((study, index) => (
          <Reveal as="li" key={study.slug} delay={index * 90}>
            <article className="group h-full overflow-hidden rounded-4xl border border-ink-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-950/10">
              {/* Media panel */}
              <div
                className={`relative flex h-44 items-end bg-gradient-to-br p-6 ${cardTints[index % cardTints.length]}`}
              >
                <div
                  className="grid-lines absolute inset-0 opacity-30"
                  aria-hidden="true"
                />
                <p className="relative text-xl font-semibold text-white">
                  {study.client}
                </p>
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                    {study.industry}
                  </p>
                  <p className="text-2xl font-bold text-ink-900">{study.metric}</p>
                </div>
                <p className="mt-1 text-right text-xs text-ink-400">
                  {study.metricLabel}
                </p>

                <dl className="mt-6 space-y-4 border-t border-ink-100 pt-5 text-sm">
                  <div>
                    <dt className="font-semibold text-ink-900">Challenge</dt>
                    <dd className="mt-1 leading-relaxed text-ink-500">
                      {study.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-900">Outcome</dt>
                    <dd className="mt-1 leading-relaxed text-ink-500">
                      {study.outcome}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={routes.caseStudies}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  Read the full case study
                  <icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200} className="mt-10 flex justify-center">
        <Button href={routes.caseStudies} variant="light">
          All case studies
        </Button>
      </Reveal>
    </Section>
  );
}
