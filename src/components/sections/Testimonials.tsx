import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import type { SectionCopy } from "@/lib/page-sections";
import type { CollectionData } from "@/server/content/schemas";

type Testimonial = CollectionData["testimonial"] & { slug: string };

/**
 * Client quotes in the reference design's staggered card layout.
 *
 * Note there is deliberately no AggregateRating markup anywhere near this
 * section: Google prohibits self-serving review markup for your own business, and
 * using it risks a manual action against the whole site.
 */
export function Testimonials({
  testimonials,
  copy,
  labels,
}: {
  testimonials: Testimonial[];
  copy: SectionCopy;
  labels: Record<string, string>;
}) {
  return (
    <Section
      id="testimonials"
      align="center"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <ul className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            as="li"
            key={testimonial.slug}
            delay={index * 110}
            // Vertical offset on the middle card gives the staggered look.
            className={index === 1 ? "lg:mt-8" : undefined}
          >
            <figure className="flex h-full flex-col rounded-4xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/8">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-brand-200"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.6 6C6.5 7.6 5 10 5 13v5h5v-5H7.6c0-2 .8-3.5 2.4-4.4L9.6 6Zm9 0c-3.1 1.6-4.6 4-4.6 7v5h5v-5h-2.4c0-2 .8-3.5 2.4-4.4L18.6 6Z" />
              </svg>

              <blockquote className="mt-5 flex-1">
                <p className="leading-relaxed text-ink-700">{testimonial.quote}</p>
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3.5 border-t border-ink-100 pt-5">
                {/* Placeholder avatar — swap for a real photo with permission. */}
                <span
                  className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-brand-300 to-brand-700"
                  aria-hidden="true"
                />
                <span className="text-sm">
                  <span className="block font-semibold text-ink-900">
                    {testimonial.name}
                  </span>
                  <span className="mt-0.5 block text-ink-500">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}

        {/* Third slot: a stats card, so the row reads complete with two quotes. */}
        <Reveal as="li" delay={220}>
          <div className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-4xl bg-brand-950 p-7">
            <div className="mesh absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
            <p className="text-lg font-semibold leading-relaxed text-white">
              {labels["testimonials.extraTitle"]}
            </p>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-sm text-ink-300">
                {labels["testimonials.extraBody"]}
              </p>
            </div>
          </div>
        </Reveal>
      </ul>
    </Section>
  );
}
