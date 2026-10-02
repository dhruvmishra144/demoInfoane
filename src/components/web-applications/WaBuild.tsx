import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ZoomImage } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { webApplications } from "@/content/web-applications";
import Image from "next/image";
import { WaIcon } from "./WaIcon";

type Card = (typeof webApplications.build.cards)[number];

function BuildCard({ card, large = false }: { card: Card; large?: boolean }) {
  return (
    <article
      data-reveal-item
      className="group flex flex-col rounded-3xl border border-ink-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5"
    >
      <WaIcon name={card.icon} />
      <h3 className={`mt-6 font-bold text-ink-900 ${large ? "text-[1.7rem] leading-tight" : "text-xl"}`}>
        {card.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-600">{card.body}</p>
      {card.art && (
        <ZoomImage className="relative mt-6 aspect-[2/1] overflow-hidden rounded-xl">
          <Image
            src={card.art}
            alt={`${card.title} example`}
            fill
            sizes="(min-width: 1024px) 26vw, 90vw"
            className="object-cover"
          />
        </ZoomImage>
      )}
    </article>
  );
}

/** "What we build": a three-column bento, the middle column offset like the design. */
export function WaBuild() {
  const build = webApplications.build;
  const [portals, saas, ecommerce, api, internal, pwa] = build.cards;

  return (
    <section id="what-we-build" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={build.eyebrow} title={build.title} lead={build.lead} titleClassName="max-w-4xl" />
        </ScrollReveal>

        <ScrollReveal variant="tilt" stagger={0.1} className="mt-14 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <BuildCard card={portals} large />
            <BuildCard card={internal} />
          </div>
          <div className="flex flex-col gap-6 lg:pt-6">
            <BuildCard card={saas} />
            <BuildCard card={api} large />
          </div>
          <div className="flex flex-col gap-6 md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex">
            <BuildCard card={ecommerce} large />
            <BuildCard card={pwa} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
