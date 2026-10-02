import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel, Parallax, ZoomImage } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { BenefitsTabs } from "./BenefitsTabs";
import { VoicesCarousel } from "./VoicesCarousel";
import { careersRedesign } from "@/content/redesign";

/** Benefits & culture: headline reveal, then the tab switcher scales in. */
export function CareersBenefits() {
  const benefits = careersRedesign.benefits;
  return (
    <section id="benefits" className="py-24 lg:py-28">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={benefits.eyebrow} title={benefits.title} titleClassName="max-w-4xl" />
        </ScrollReveal>
        <ScrollReveal variant="scale" className="mt-12">
          <BenefitsTabs items={benefits.items} />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function CareersVoices() {
  const voices = careersRedesign.voices;
  return (
    <section id="voices" className="border-t border-ink-200/70 py-24 lg:py-28">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={voices.eyebrow} title={voices.title} />
        </ScrollReveal>
        <ScrollReveal variant="up" className="mt-12">
          <VoicesCarousel items={voices.items} />
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Dark "Work with purpose" panel: opens from an inset card to full bleed on scroll. */
export function CareersImpact() {
  const impact = careersRedesign.impact;
  return (
    <ExpandPanel id="impact" className="relative isolate overflow-hidden bg-night py-24 lg:py-32">
      <div className="accent-glow absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <Parallax speed={0.3} className="absolute -right-40 top-10 -z-10 h-[30rem] w-[30rem]">
        <div className="h-full w-full rounded-full border border-white/10 bg-gradient-to-br from-brand-500/10 to-transparent" />
      </Parallax>
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dark dot eyebrow={impact.eyebrow} title={impact.title} lead={impact.lead} />
        </ScrollReveal>

        <ScrollReveal as="ul" variant="tilt" stagger={0.14} className="mt-14 grid gap-8 md:grid-cols-3">
          {impact.items.map((item) => (
            <li key={item.image} data-reveal-item>
              <figure className="group">
                <div className="relative aspect-[6/5] overflow-hidden rounded-2xl bg-night-card">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-4 text-sm leading-relaxed text-ink-300">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </ExpandPanel>
  );
}

function Tile({ index, className }: { index: number; className: string }) {
  const photo = careersRedesign.inside.photos[index];
  return (
    <ZoomImage className={`relative overflow-hidden rounded-2xl bg-ink-100 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 90vw"
        className="object-cover"
      />
    </ZoomImage>
  );
}

/**
 * "Inside Infoane" gallery. Two staggered columns on desktop (a tall tile over
 * a pair in one, a pair over a tall tile in the other), as in the mockup; each
 * photo un-clips and settles as it scrolls into view.
 */
export function CareersInside() {
  const inside = careersRedesign.inside;
  const tall = "aspect-[4/3] lg:aspect-auto lg:h-[22.5rem]";
  const small = "aspect-[4/3] lg:aspect-auto lg:h-[13.75rem]";
  return (
    <section id="inside" className="py-24 lg:py-28">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={inside.eyebrow} title={inside.title} />
        </ScrollReveal>

        {/* Photo order in content: whiteboard, desk, wall, hackathon, terrace, code. */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Tile index={0} className={tall} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Tile index={4} className={small} />
              <Tile index={5} className={small} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Tile index={1} className={small} />
              <Tile index={2} className={small} />
            </div>
            <Tile index={3} className={tall} />
          </div>
        </div>
      </div>
    </section>
  );
}
