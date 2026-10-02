import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Float, ZoomImage } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { webApplications } from "@/content/web-applications";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((item) => (
        <li key={item} data-reveal-item className="flex items-center gap-3 text-sm font-semibold text-ink-900">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeatureCopy({
  title,
  body,
  bullets,
}: {
  title: string;
  body: string;
  bullets: readonly string[];
}) {
  return (
    <ScrollReveal variant="blur" stagger={0.1}>
      <h3 data-split className="max-w-md text-3xl font-bold leading-[1.1] text-ink-900">
        {title}
      </h3>
      <p data-reveal-item className="mt-6 max-w-md text-base leading-relaxed text-ink-600">
        {body}
      </p>
      <CheckList items={bullets} />
    </ScrollReveal>
  );
}

/** "Why we stand apart": two alternating feature rows. */
export function WaStandards() {
  const standards = webApplications.standards;

  return (
    <section id="standards" className="relative overflow-hidden pb-24 pt-4 lg:pb-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={standards.eyebrow} title={standards.title} lead={standards.lead} titleClassName="max-w-4xl" />
        </ScrollReveal>

        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-24">
          <FeatureCopy {...standards.scalable} />
          <ZoomImage className="relative overflow-hidden rounded-3xl bg-[#f1f4f8] p-4 ring-1 ring-ink-200/60 sm:p-6">
            <div data-zoom-media className="relative aspect-[14/10]">
              <ArchitectureDiagram label={standards.scalable.diagramLabel} />
              <Float amount={6} duration={5} className="absolute right-[6%] top-[8%]">
                <span className="block h-3 w-3 rounded-full bg-brand-500 shadow-[0_0_0_6px_rgba(255,107,74,0.18)]" />
              </Float>
            </div>
          </ZoomImage>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-2 lg:gap-24">
          <ZoomImage className="relative order-2 aspect-[7/6] overflow-hidden rounded-3xl lg:order-1">
            <Image
              src={standards.security.image}
              alt={standards.security.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </ZoomImage>
          <div className="order-1 lg:order-2">
            <FeatureCopy {...standards.security} />
          </div>
        </div>
      </div>
    </section>
  );
}
