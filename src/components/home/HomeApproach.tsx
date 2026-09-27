import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StepFocus } from "@/components/motion/effects";
import { Eyebrow, SectionIntro } from "@/components/design/blocks";
import { StepIcon } from "@/components/design/StepIcon";
import { home } from "@/content/redesign";

/**
 * "We embed, not just deliver." The left column sticks while the three steps
 * scroll past it, each one coming into focus as it crosses the middle of the
 * screen.
 */
export function HomeApproach() {
  const approach = home.approach;

  return (
    <section id="approach" className="bg-ink-50/70 py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro eyebrow={approach.eyebrow} title={approach.title} />
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal variant="blur" stagger={0.1}>
              <div data-reveal-item>
                <Eyebrow>{approach.kicker}</Eyebrow>
              </div>
              <h3 data-reveal-item className="mt-4 text-3xl font-bold leading-tight">
                {approach.subtitle}
              </h3>
              <div data-reveal-item className="mt-8 border-t border-ink-200 pt-8">
                <Eyebrow>{approach.howEyebrow}</Eyebrow>
                <h4 className="mt-4 text-xl font-bold">{approach.howTitle}</h4>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600">
                  {approach.howBody}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <StepFocus className="relative isolate space-y-10 lg:py-16">
            {/* Connector rail through the icon column. The cards cover it, so
                only the stretches in the gaps show — filling coral with scroll,
                it reads as the steps linking up one after another. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-[3.75rem] -z-10 w-0.5 bg-ink-200 lg:inset-y-16 lg:left-16"
            >
              <span data-rail-fill className="block h-full w-full origin-top bg-brand-500" />
            </span>

            {approach.steps.map((step, index) => (
              <li
                key={step.title}
                data-step
                className="flex gap-6 rounded-3xl border border-ink-200 bg-white p-7 shadow-sm lg:p-8"
              >
                <span className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-white shadow-lg shadow-brand-500/10 ring-1 ring-inset ring-brand-100">
                  <span data-ping className="absolute inset-0 rounded-2xl bg-brand-200 opacity-0" aria-hidden="true" />
                  <span className="relative">
                    <StepIcon name={step.icon} />
                  </span>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-600">{step.body}</p>
                </div>
              </li>
            ))}
          </StepFocus>
        </div>
      </div>
    </section>
  );
}
