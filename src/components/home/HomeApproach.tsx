import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/**
 * "How we work": the heading and lead stay in view in a 420px column while the
 * five numbered delivery steps (Understand through Support & Improve) run
 * beside them.
 */
export function HomeApproach() {
  const approach = home.approach;

  return (
    <section id="approach" className="bg-[#f9fafb] py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[420px_544px] lg:justify-between">
        <ScrollReveal variant="blur" stagger={0.1} className="lg:sticky lg:top-32 lg:self-start">
          <div data-reveal-item>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[14px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {approach.title}
          </h2>
          <p data-reveal-item className="mt-4 text-[16px] leading-[26px] text-body [text-wrap:wrap]">
            {approach.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal as="ol" variant="up" stagger={0.12} className="space-y-5">
          {approach.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal-item
              className="flex gap-5 rounded-3xl border border-ink-200 bg-white px-6 py-[22px]"
            >
              <span
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[14px] font-bold text-white"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[19px] font-bold leading-7">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-[22px] text-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
