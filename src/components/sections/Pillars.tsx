import { Reveal } from "../ui/Reveal";
import type { CollectionData } from "@/server/content/schemas";

type Pillar = CollectionData["pillar"] & { slug: string };

/** Three numbered cards, staggered in on scroll. */
export function Pillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <section aria-labelledby="pillars-heading" className="bg-white py-16 lg:py-20">
      <div className="container-x">
        <h2 id="pillars-heading" className="sr-only">
          How an engagement works
        </h2>

        <ul className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.step} delay={index * 110}>
              <article className="group h-full rounded-3xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/8">
                <span className="inline-flex h-10 items-center rounded-full bg-brand-50 px-3.5 text-sm font-bold text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  {pillar.step}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                  {pillar.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
