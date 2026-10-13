import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/** Technology stack: thirteen chips, from Adobe ColdFusion to database technologies. */
export function HomeTechnology() {
  const technology = home.technology;

  return (
    <section id="technology" className="py-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{technology.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {technology.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[820px] text-[16px] leading-[26px] text-body">
            {technology.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.04} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {technology.items.map((item) => (
            <li
              key={item}
              data-reveal-item
              className="rounded-xl border border-ink-200 bg-white px-5 py-4 text-[15px] font-semibold leading-6 text-ink-900 shadow-[0_1px_3px_rgba(18,19,26,0.06)] transition-colors duration-300 hover:border-brand-200"
            >
              {item}
            </li>
          ))}
        </ScrollReveal>

        <div className="mt-10">
          <Button href={technology.cta.href} variant="outline" withChip className="!py-3 !text-[14px] !leading-5 !ring-ink-900">
            {technology.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Trust and credibility: four proof points and the client testimonial. */
export function HomeTrust() {
  const trust = home.trust;

  return (
    <section id="trust" className="bg-[#f9fafb] py-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{trust.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {trust.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[820px] text-[16px] leading-[26px] text-body">
            {trust.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item) => (
            <li key={item.title} data-reveal-item className="rounded-2xl border border-ink-200 bg-white p-6">
              <h3 className="text-[24px] font-bold leading-8 text-ink-900">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-[22px] text-body">{item.body}</p>
            </li>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="up" className="mt-8">
          <figure className="rounded-[28px] border border-ink-200 bg-white p-8 sm:p-12">
            <p className="eyebrow">{trust.testimonialLabel}</p>
            <blockquote className="mt-5 max-w-[860px] text-[22px] font-medium leading-[34px] text-ink-900">
              “{trust.quote}”
            </blockquote>
            <figcaption className="mt-6 text-[14px] leading-5">
              <span className="block font-semibold text-ink-900">{trust.author}</span>
              <span className="block text-ink-500">{trust.authorRole}</span>
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Careers band: a dark card with the draft's three paragraphs and both CTAs. */
export function HomeCareers() {
  const careers = home.careers;

  return (
    <section id="careers" className="py-24">
      <div className="container-x">
        <ScrollReveal variant="scale">
          <div className="rounded-[32px] bg-night p-8 sm:p-12 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">{careers.eyebrow}</p>
              <h2 data-split className="mt-4 text-[36px] font-bold leading-[40px] text-white [text-wrap:wrap]">
                {careers.title}
              </h2>
              <div className="mt-4 space-y-3">
                {careers.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] leading-[26px] text-[#d1d5db]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:flex-col lg:items-start">
              <Button href={careers.primaryCta.href} variant="coral" withChip>
                {careers.primaryCta.label}
              </Button>
              <Button href={careers.secondaryCta.href} variant="onDark">
                {careers.secondaryCta.label}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * FAQ. Built on <details>/<summary>: keyboard accessible with no JavaScript,
 * and every answer is in the HTML whether or not its panel is open — which is
 * what lets the same text back the FAQPage structured data on this page.
 */
export function HomeFaq() {
  const faq = home.faq;

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#f9fafb] py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <ScrollReveal variant="blur" stagger={0.1} className="lg:sticky lg:top-32 lg:self-start">
          <div data-reveal-item>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
          </div>
          <h2 id="faq-heading" data-split className="mt-[17px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {faq.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="up" stagger={0.06} className="space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.question}
              data-reveal-item
              className="group rounded-2xl border border-ink-200 bg-white px-6 transition-colors duration-300 open:border-brand-200 open:shadow-lg open:shadow-brand-500/5 hover:border-brand-200"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[16px] font-semibold leading-6 text-ink-900">{item.question}</h3>
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[14px] leading-[22px] text-body">{item.answer}</p>
            </details>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
