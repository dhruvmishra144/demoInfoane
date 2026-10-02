import { Button } from "@/components/ui/Button";
import { Intro } from "@/components/motion/Intro";
import Image from "next/image";
import { home } from "@/content/redesign";

/**
 * Homepage hero: the headline rises line by line, the copy and buttons follow,
 * and the glass-orbit render resolves out of a soft blur, then stays still.
 */
export function HomeHero() {
  const hero = home.hero;

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-200/60">
      {/* Lavender haze only behind the render, fading out before the copy —
          the mockup's left column sits on the plain page color. */}
      <div
        className="absolute inset-y-0 right-0 -z-10 w-[70%] bg-[radial-gradient(60%_70%_at_65%_45%,#ebe9f6,transparent_75%)]"
        aria-hidden="true"
      />

      <Intro className="container-x grid items-center gap-6 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div className="relative z-10">
          <h1
            data-intro="lines"
            className="text-[2.75rem] font-bold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]"
          >
            {hero.headline}
          </h1>
          <p
            data-intro
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600"
          >
            {hero.subhead}
          </p>
          <div data-intro className="mt-9 flex flex-wrap gap-4">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="light">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p data-intro className="mt-9 text-sm text-ink-500">
            {hero.note}
          </p>
        </div>

        {/* Static render; only the page-load fade-in touches it. */}
        <div data-intro="media" className="relative lg:-mr-16">
          <Image
            src="/images/hero-orbit.webp"
            alt=""
            width={1800}
            height={1200}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full select-none [mask-image:radial-gradient(closest-side,#000_75%,transparent)]"
          />
        </div>
      </Intro>
    </section>
  );
}
