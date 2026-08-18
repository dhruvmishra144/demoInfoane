import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { icons } from "../ui/Icons";
import { techStack } from "@/content/home";
import { routes } from "@/lib/routes";

/**
 * "Works with your stack" — the reference design's integrations block.
 *
 * Beyond credibility this earns long-tail traffic: buyers search for
 * "[technology] development company" far more often than for generic terms, and
 * the chips are real text, so those words are indexable.
 */
export function TechStack() {
  const chips = techStack.flatMap((group) => group.items).slice(0, 16);

  return (
    <section
      id="technologies"
      aria-labelledby="tech-heading"
      className="scroll-mt-28 bg-white py-16 lg:py-24"
    >
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <p className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-inset ring-brand-100">
                Technology
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2
                id="tech-heading"
                className="text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
              >
                We work in the stack you already run
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-500 lg:text-lg">
                We pick the boring, proven tool unless there is a specific reason
                not to — a stack you can still hire for in five years matters more
                than one that is exciting this quarter. You inherit the
                maintenance, not us.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8">
                <Button href={routes.technology}>See our full stack</Button>
              </div>
            </Reveal>

            <ul className="mt-10 space-y-4">
              {[
                "Managed services over self-hosted, unless there is a reason",
                "Where two options are close, your team's stack wins",
                "Nothing load-bearing without a maintained release history",
              ].map((item, index) => (
                <Reveal as="li" key={item} delay={220 + index * 80}>
                  <span className="flex items-start gap-3 text-sm text-ink-600">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"
                      aria-hidden="true"
                    >
                      <icons.check className="h-3 w-3" />
                    </span>
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Chip cloud. Real text, so it is indexable and needs no images. */}
          <Reveal delay={140} x="right">
            <div className="relative isolate overflow-hidden rounded-4xl border border-ink-200 bg-ink-50 p-8 lg:p-10">
              <div className="mesh-light absolute inset-0 -z-10" aria-hidden="true" />
              <ul className="flex flex-wrap justify-center gap-2.5">
                {chips.map((chip, index) => (
                  <li
                    key={chip}
                    className="rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                    style={{
                      // A little vertical jitter so the cloud does not read as a grid.
                      marginTop: index % 3 === 1 ? "0.5rem" : undefined,
                    }}
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-3xl border border-ink-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-900">
                    Not on the list?
                  </p>
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
                    Ask us
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  This reflects what our clients run, not the limit of what we
                  will work on — and we would rather tell you we are not a fit
                  than learn your platform on your budget.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
