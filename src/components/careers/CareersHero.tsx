import { Button } from "@/components/ui/Button";
import { Intro } from "@/components/motion/Intro";
import { Float } from "@/components/motion/effects";
import { Eyebrow, GlassBackdrop } from "@/components/design/blocks";
import { careersRedesign } from "@/content/redesign";

/**
 * Careers landing hero: the headline rises line by line, then the copy and
 * buttons, and the team-photo card resolves out of a soft blur.
 *
 * The right-hand card is an intentional placeholder (the design has no photo
 * yet). Swap the inner block for a <Image> once there is a real, consented
 * team photo — nothing is invented here.
 */
export function CareersHero() {
  const hero = careersRedesign.hero;
  const placeholder = careersRedesign.heroPlaceholder;

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-200/60">
      <GlassBackdrop />
      <Intro className="container-x grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="relative z-10">
          <div data-intro>
            <Eyebrow dot>{hero.eyebrow}</Eyebrow>
          </div>
          <h1
            data-intro="lines"
            className="mt-6 text-[2.5rem] font-bold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]"
          >
            {hero.title}
          </h1>
          <p data-intro className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600">
            {hero.body}
          </p>
          <div data-intro className="mt-9 flex flex-wrap gap-4">
            <Button href={hero.primary.href} variant="coral">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="light">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div data-intro="media" className="relative mx-auto w-full max-w-xl">
          <Float amount={8} duration={8}>
            <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border border-ink-200/80 bg-ink-100/90 p-8 text-center shadow-xl shadow-ink-900/10 backdrop-blur">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-ink-200/80 text-ink-500">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                  <circle cx="9" cy="10" r="1.5" />
                  <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" />
                </svg>
              </span>
              <p className="mt-5 text-lg font-semibold text-ink-600">{placeholder.title}</p>
              <p className="mt-1.5 text-base text-ink-500">{placeholder.body}</p>
              <p className="mt-2 text-xs text-ink-400">{placeholder.hint}</p>
            </div>
          </Float>
        </div>
      </Intro>
    </section>
  );
}
