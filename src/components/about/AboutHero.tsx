import { Intro } from "@/components/motion/Intro";
import { Eyebrow, GlassBackdrop } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/**
 * About hero on the lavender glass backdrop, closed by the "Vision & mission"
 * marker that leads into the dark Mission panel. Headline rises line by line.
 */
export function AboutHero() {
  const hero = aboutPage.hero;

  return (
    <section className="relative isolate overflow-hidden">
      <GlassBackdrop position="85% 70%" />
      <Intro className="container-x pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32">
        <div data-intro>
          <Eyebrow dot>{hero.eyebrow}</Eyebrow>
        </div>
        <h1
          data-intro="lines"
          className="mt-6 max-w-3xl text-[2.5rem] font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[4rem]"
        >
          {hero.title}
        </h1>
        <p data-intro className="mt-8 max-w-xl text-base leading-relaxed text-ink-600 lg:text-lg">
          {hero.body}
        </p>
      </Intro>

      <div className="container-x relative flex items-center gap-4 pb-6">
        <Eyebrow dot>{aboutPage.visionMission}</Eyebrow>
        <span className="h-px flex-1 bg-gradient-to-r from-brand-500/40 to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
