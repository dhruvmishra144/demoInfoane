import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/**
 * "We embed, not just deliver." A 420px column of copy beside three numbered
 * cards, all at the design's measured sizes: 544px cards, 20px apart, with
 * 24px padding around a 40px badge.
 */
export function HomeApproach() {
  const approach = home.approach;

  return (
    <section id="approach" className="bg-[#f9fafb] pb-[83px] pt-[81px]">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[14px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {approach.title}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[420px_544px]">
          <ScrollReveal variant="blur" stagger={0.1} className="pt-0.5">
            <div data-reveal-item>
              <Eyebrow>{approach.kicker}</Eyebrow>
            </div>
            <h3 data-reveal-item className="mt-[15px] text-[29.5px] font-bold leading-[31px] [text-wrap:wrap]">
              {approach.subtitle}
            </h3>
            <div data-reveal-item className="mt-[34px] border-t border-ink-200 pt-[34px]">
              <Eyebrow>{approach.howEyebrow}</Eyebrow>
              <h4 className="mt-3 text-[18.7px] font-bold leading-7 [text-wrap:wrap]">{approach.howTitle}</h4>
              <p className="mt-2.5 text-[15px] leading-6 text-body [text-wrap:wrap]">{approach.howBody}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal as="ol" variant="up" stagger={0.14} className="space-y-5">
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
      </div>
    </section>
  );
}
