import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { routes } from "@/lib/routes";
import type { CollectionData } from "@/server/content/schemas";

type FaqItem = CollectionData["faq"] & { slug: string };

/**
 * FAQ in the reference design's two-column layout: heading and CTA on the left,
 * accordion on the right.
 *
 * Built on <details>/<summary>: keyboard accessible and screen-reader friendly
 * with zero JavaScript. The answers are in the HTML whether or not a panel is
 * open, which is what makes them eligible for FAQ rich results and for citation
 * in AI answers. The open/close height animation is the CSS grid-rows trick, so
 * nothing measures the DOM at runtime.
 */
export function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-28 bg-ink-50 py-16 lg:py-24"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-inset ring-brand-100">
                FAQ
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2
                id="faq-heading"
                className="text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
              >
                Your questions, answered
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 leading-relaxed text-ink-500">
                If yours is not here, ask it on the call — we would rather answer
                it before you sign than after.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8">
                <Button href={routes.contact} variant="light">
                  Contact us
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.slug} delay={index * 60}>
                <details className="group rounded-3xl border border-ink-200 bg-white px-6 transition-colors duration-300 hover:border-brand-200 open:border-brand-200 open:shadow-lg open:shadow-brand-950/5">
                  <summary className="flex items-start justify-between gap-6 py-5 text-left">
                    <h3 className="text-base font-semibold text-ink-900">
                      {faq.question}
                    </h3>
                    <span
                      className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="accordion-panel">
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
