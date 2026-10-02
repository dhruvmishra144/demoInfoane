import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel, Parallax, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/** Dark Mission panel (copy left, photo right). */
export function AboutMission() {
  const m = aboutPage.mission;
  return (
    <ExpandPanel id="mission" className="relative isolate overflow-hidden bg-night py-20 lg:py-28">
      <div className="accent-glow absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      {/* Oversized ghost word, drifting slower than the page. */}
      <Parallax speed={0.25} className="pointer-events-none absolute -right-10 top-4 -z-10 select-none">
        <span className="block text-[12rem] font-bold leading-none tracking-tighter text-white/[0.03] lg:text-[22rem]" aria-hidden="true">
          Mission
        </span>
      </Parallax>

      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal stagger={0.12}>
          <div data-reveal-item>
            <Eyebrow>{m.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-lg text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem]">
            {m.title}
          </h2>
          <p data-reveal-item className="mt-6 max-w-md text-base leading-relaxed text-ink-400">
            {m.body}
          </p>
        </ScrollReveal>

        <ZoomImage className="relative aspect-[864/705] overflow-hidden rounded-3xl lg:max-w-xl lg:justify-self-end">
          <Image
            src={m.image}
            alt={m.imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </ZoomImage>
      </div>
    </ExpandPanel>
  );
}

/** Light Vision section (photo left, copy right with a coral rule). */
export function AboutVision() {
  const v = aboutPage.vision;
  return (
    <section id="vision" className="relative isolate overflow-hidden py-20 lg:py-28">
      <Parallax speed={0.3} className="halo absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem]" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ZoomImage className="relative aspect-[1024/704] overflow-hidden rounded-3xl">
          <Image
            src={v.image}
            alt={v.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </ZoomImage>

        <ScrollReveal stagger={0.12} className="border-l-2 border-brand-500/70 pl-6 sm:pl-10">
          <div data-reveal-item>
            <Eyebrow>{v.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-md text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
            {v.title}
          </h2>
          <p data-reveal-item className="mt-6 max-w-md text-base leading-relaxed text-ink-600">
            {v.body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
