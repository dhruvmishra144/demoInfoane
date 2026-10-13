import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/design/blocks";
import { HeroBackdrop } from "@/components/design/HeroBackdrop";
import { Intro } from "@/components/motion/Intro";
import { mobileApps } from "@/content/mobile-apps";
import { PhoneMock } from "./PhoneMock";

/**
 * Mobile App Development hero. Like the About hero it is pulled up under the
 * 84px floating header so its backdrop shows behind the glass pill, with the
 * copy padded back down by the same amount. Copy on the left, the phones on
 * the right (stacked under the copy on small screens).
 */
export function MobileHero() {
  const hero = mobileApps.hero;

  return (
    <section className="relative isolate -mt-[84px] overflow-hidden">
      <HeroBackdrop art={false} />
      <Intro className="container-x grid items-center gap-10 pb-16 pt-[132px] lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-14 lg:pt-[84px]">
        <div>
          <div data-intro>
            <Eyebrow dot>{hero.eyebrow}</Eyebrow>
          </div>
          <h1
            data-intro="lines"
            className="mt-6 max-w-[38rem] text-[2.4rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.25rem]"
          >
            {hero.headline}
          </h1>
          <p data-intro className="mt-6 max-w-[34rem] text-[18px] leading-[28px] text-ink-700">
            {hero.subhead}
          </p>
          <p data-intro className="mt-4 max-w-[34rem] text-[15px] leading-6 text-ink-600">
            {hero.body}
          </p>
          <div data-intro className="mt-8 flex flex-wrap gap-4">
            <Button href={hero.primaryCta.href} className="!py-2.5">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="light" className="!py-2.5">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div data-intro="media" className="w-full">
          <PhoneMock chips={hero.chips} />
        </div>
      </Intro>
    </section>
  );
}
