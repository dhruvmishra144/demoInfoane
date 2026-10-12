import { Button } from "@/components/ui/Button";
import { Intro } from "@/components/motion/Intro";
import { LiquidMetal } from "./LiquidMetal";
import { home } from "@/content/redesign";

/**
 * Homepage hero: liquid metal flowing edge to edge behind a single centred
 * column. The headline rises line by line, the copy and buttons follow, and the
 * metal resolves out of a soft blur, then keeps flowing under the pointer.
 *
 * The shader keeps the middle of the field calm, so the copy stays readable
 * while the chrome shows fully toward the edges.
 */
export function HomeHero() {
  const hero = home.hero;

  return (
    <section className="relative isolate flex min-h-[741px] items-center overflow-hidden border-b border-ink-200/60 bg-[#eae5f3]">
      <div data-intro="media" className="pointer-events-none absolute inset-0 -z-10">
        <LiquidMetal className="absolute inset-0" />
      </div>

      <Intro className="container-x relative py-24 text-center">
        <div className="relative mx-auto max-w-[68rem]">
          {/* A feathered pane of frosted white behind the copy: bright in the
              middle, fading to nothing at the edges, so the text sits a step
              above the metal without a visible box. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-24 -inset-y-14 -z-10 bg-[radial-gradient(ellipse_closest-side,rgba(255,255,255,0.62),rgba(255,255,255,0.34)_55%,rgba(255,255,255,0)_100%)] backdrop-blur-[3px] [mask-image:radial-gradient(ellipse_closest-side,#000_45%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_closest-side,#000_45%,transparent_100%)]"
          />
          <h1
            data-intro="lines"
            className="mx-auto max-w-[64rem] text-[2.75rem] font-bold leading-none [text-wrap:balance] sm:text-6xl lg:text-[4rem]"
          >
            {hero.headline}
          </h1>
          <p data-intro className="mx-auto mt-7 max-w-[46rem] text-lg leading-[1.54] text-ink-600 [text-wrap:balance]">
            {hero.subhead}
          </p>
          <div data-intro className="mt-7 flex flex-wrap justify-center gap-4">
            <Button href={hero.primaryCta.href} className="!py-2.5">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="light" className="!py-2.5">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p data-intro className="mt-4 text-sm leading-6 text-ink-500">
            {hero.note}
          </p>
        </div>
      </Intro>
    </section>
  );
}
