import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/**
 * Technology stack: the headline's second line in coral with the CTA level
 * with the lead, then the three groups of the draft as columns, each a wrap of chips
 * carrying the technology's real logo.
 */
export function HomeTechnology() {
  const technology = home.technology;

  return (
    <section id="technology" className="border-y border-ink-200/70 pb-20 pt-12">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal>
            <p data-reveal-item className="eyebrow inline-flex rounded-full bg-brand-50 px-4 py-1.5 !text-[13px]">
              {technology.eyebrow}
            </p>
            <h2 data-split className="mt-6 text-[40px] font-bold leading-[48px] [text-wrap:wrap]">
              {technology.title} <span className="block text-brand-500">{technology.titleAccent}</span>
            </h2>
            <p data-reveal-item className="mt-3 max-w-[660px] text-[16px] leading-[26px] text-body">
              {technology.lead}
            </p>
          </ScrollReveal>
          <div className="shrink-0">
            <Button href={technology.cta.href} variant="primary" withChip className="!px-6 !py-3 !text-[14px] !leading-5">
              {technology.cta.label}
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {technology.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink-500">{group.label}</h3>
              <ScrollReveal as="ul" variant="up" stagger={0.04} className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item: Technology) => (
                  <li key={item.name} data-reveal-item>
                    <span
                      title={item.detail}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-white py-2 pl-2.5 pr-4 text-[14px] font-semibold leading-5 text-ink-900 shadow-[0_1px_2px_rgba(18,19,26,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10"
                    >
                      <TechLogos item={item} />
                      {item.name}
                    </span>
                  </li>
                ))}
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Technology = { name: string; monogram?: string; logos?: string[]; detail?: string };

/**
 * A technology's logo (or a few, for a category) at chip size. The logos are
 * decorative — the chip's text names the technology.
 */
function TechLogos({ item }: { item: Technology }) {
  if (item.monogram) {
    return (
      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-ink-900 px-1 text-[10px] font-bold tracking-wide text-white" aria-hidden="true">
        {item.monogram}
      </span>
    );
  }

  return (
    <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
      {item.logos?.map((logo) => (
        <Image key={logo} src={`/logos/${logo}.svg`} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
      ))}
    </span>
  );
}

/** Client reviews: three quotes in cards, with the reviewer's name (when given) and role beneath. */
export function HomeReviews() {
  const reviews = home.reviews;

  return (
    <section id="reviews" className="border-t border-ink-200/70 bg-[#f9fafb] py-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{reviews.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {reviews.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.1} className="mt-10 grid gap-6 lg:grid-cols-3">
          {reviews.items.map((review, index) => (
            <li key={index} data-reveal-item>
              <figure className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-7 shadow-[0_1px_3px_rgba(18,19,26,0.06)]">
                <span className="block h-1 w-8 rounded-full bg-brand-500" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-[15px] leading-[26px] text-ink-700">“{review.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-ink-200 pt-5 text-[14px] leading-5">
                  {review.author && <span className="block font-semibold text-ink-900">{review.author}</span>}
                  <span className={review.author ? "mt-0.5 block text-ink-500" : "block font-semibold text-ink-900"}>
                    {review.role}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
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
