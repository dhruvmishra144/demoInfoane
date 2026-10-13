import { Intro } from "@/components/motion/Intro";
import { Eyebrow } from "@/components/design/blocks";
import { HeroBackdrop } from "@/components/design/HeroBackdrop";
import { aboutPage } from "@/content/redesign";

/**
 * About hero. It starts at the very top of the page (pulled up under the
 * 84px header) so its background shows behind the header, and the copy,
 * grouped and vertically centred, is padded back down by the same amount.
 * The "Vision & mission" marker follows in its own strip before the dark
 * Mission panel.
 */
export function AboutHero() {
  const hero = aboutPage.hero;

  return (
    <>
      <section className="relative isolate -mt-[84px] overflow-hidden">
        <HeroBackdrop />
        <Intro className="container-x flex min-h-[540px] flex-col justify-center pb-16 pt-[148px] lg:min-h-[560px] lg:pb-14 lg:pt-[84px]">
          <div data-intro>
            <Eyebrow dot>{hero.eyebrow}</Eyebrow>
          </div>
          <h1
            data-intro="lines"
            className="mt-6 max-w-[46rem] text-[2.5rem] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.25rem]"
          >
            {hero.title}
          </h1>
          <p data-intro className="mt-6 max-w-[31rem] text-[16px] leading-[26px] text-ink-600">
            {hero.body}
          </p>
        </Intro>
      </section>

      <div className="container-x pb-1.5 pt-8">
        <Eyebrow dot>{aboutPage.visionMission}</Eyebrow>
      </div>
    </>
  );
}
