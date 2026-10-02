import { Intro } from "@/components/motion/Intro";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassBackdrop, Eyebrow } from "@/components/design/blocks";
import { DesignIcon } from "@/components/design/DesignIcon";
import { aiPage } from "@/content/redesign";

/** Lavender glass hero; the four capability cards sit on it and tilt up as they arrive. */
export function AiHero() {
  const { hero, capabilities } = aiPage;
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-16 lg:pb-28 lg:pt-20">
      <GlassBackdrop />
      <Intro className="container-x">
        <div data-intro>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>
        <h1
          data-intro="lines"
          className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl"
        >
          {hero.title}
        </h1>
        <p data-intro className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600">
          {hero.body}
        </p>
      </Intro>

      <ScrollReveal
        variant="tilt"
        stagger={0.12}
        start="top 92%"
        className="container-x mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {capabilities.map((card) => (
          <article
            key={card.title}
            data-reveal-item
            className="group rounded-2xl border border-ink-200/70 bg-white p-6 shadow-xl shadow-ink-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-transform duration-500 group-hover:scale-110">
              <DesignIcon name={card.icon} />
            </span>
            <h2 className="mt-6 text-lg font-bold leading-snug">{card.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">{card.body}</p>
          </article>
        ))}
      </ScrollReveal>
    </section>
  );
}
