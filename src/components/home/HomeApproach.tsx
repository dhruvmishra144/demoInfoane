import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StepFocus } from "@/components/motion/effects";
import { Eyebrow, SectionIntro } from "@/components/design/blocks";
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

          <StepFocus className="space-y-6 lg:py-16">
            {approach.steps.map((step, index) => (
              <li
                key={step.title}
                data-step
                className="flex gap-6 rounded-3xl border border-ink-200 bg-white p-7 shadow-sm lg:p-8"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-bold text-white shadow-lg shadow-brand-500/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
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
