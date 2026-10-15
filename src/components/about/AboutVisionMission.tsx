import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel, Parallax, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/**
 * Dark Mission panel: copy on the left behind a coral rule, a 440px photo on
 * the right. Sized to the 1440px design (60px above and below, ~480px tall).
 */
export function AboutMission() {
  const m = aboutPage.mission;
  return (
    <ExpandPanel id="mission" className="relative isolate overflow-hidden bg-night py-14 lg:py-[60px]">
      <div className="accent-glow absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      {/* Oversized ghost word, drifting slower than the page. */}
      <Parallax speed={0.25} className="pointer-events-none absolute -right-10 top-4 -z-10 select-none">
        <span className="block text-[12rem] font-bold leading-none tracking-tighter text-white/[0.03] lg:text-[22rem]" aria-hidden="true">
          Mission
        </span>
      </Parallax>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-12">
        <ScrollReveal stagger={0.12} className="border-l border-brand-500/80 pl-5 lg:min-h-[318px] lg:pb-[78px] lg:pt-1">
          <div data-reveal-item>
            <Eyebrow>{m.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-[34rem] text-[2rem] font-bold leading-[1.2] text-white lg:text-[40px] lg:leading-[48px]">
            {m.title}
          </h2>
          <p data-reveal-item className="mt-5 max-w-[44rem] text-[15px] leading-[25px] text-ink-400">
            {m.body}
          </p>
        </ScrollReveal>

        <ZoomImage className="relative aspect-[864/705] overflow-hidden rounded-[14px] lg:w-[440px]">
          <Image
            src={m.image}
            alt={m.imageAlt}
            fill
            sizes="(min-width: 1024px) 440px, 90vw"
            // Not lazy: the panel opens from a clip-path inset, and the browser's
            // lazy-load check treats the image as hidden, so it never loaded.
            loading="eager"
            className="object-cover"
          />
        </ZoomImage>
      </div>
    </ExpandPanel>
  );
}

/** Light Vision section: photo left, copy right behind a thin coral rule, peach halo behind. */
export function AboutVision() {
  const v = aboutPage.vision;
  return (
    <section id="vision" className="relative isolate overflow-hidden py-14 lg:py-[60px]">
      <Parallax speed={0.3} className="absolute -right-24 -top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#fbf0ed]" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-[519px_1fr] lg:gap-16">
        <ZoomImage className="relative aspect-[1024/704] overflow-hidden rounded-[14px] lg:w-[519px]">
          <Image
            src={v.image}
            alt={v.imageAlt}
            fill
            sizes="(min-width: 1024px) 519px, 90vw"
            className="object-cover"
          />
        </ZoomImage>

        <ScrollReveal stagger={0.12} className="flex flex-col justify-center border-l border-brand-500/60 pl-6 lg:min-h-[320px] lg:pl-[38px]">
          <div data-reveal-item>
            <Eyebrow>{v.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-[34rem] text-[2rem] font-bold leading-[1.2] lg:text-[40px] lg:leading-[48px]">
            {v.title}
          </h2>
          <p data-reveal-item className="mt-5 max-w-[36rem] text-[15px] leading-[25px] text-ink-600">
            {v.body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
