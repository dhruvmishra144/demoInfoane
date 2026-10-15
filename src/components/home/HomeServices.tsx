import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { IconDrawIn, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { DesignIcon } from "@/components/design/DesignIcon";
import { ServiceIcon } from "@/components/design/ServiceIcon";
import { home } from "@/content/redesign";

/**
 * Services grid over the glass-render wash, cards swinging up in sequence —
 * eight cards, four to a row, each with the draft's one-paragraph description.
 */
export function HomeServices() {
  const services = home.services;

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-t border-ink-200/60 bg-[#f3f2f8] pb-24 pt-[74px] lg:pb-[160px]"
    >
      {/* The hero render again, at section scale and faded: its discs sit
          behind the cards and the pedestal under them. */}
      <Image
        src="/images/hero-orbit.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-60"
        aria-hidden="true"
      />

      <div className="container-x">
        <ScrollReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-reveal-item>
              <Eyebrow>{services.eyebrow}</Eyebrow>
            </div>
            <h2
              data-split
              className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]"
            >
              {services.title}
            </h2>
            <p data-reveal-item className="mt-[17px] max-w-[680px] text-[16px] leading-[26px] text-body">
              {services.lead}
            </p>
          </div>
          <div data-reveal-item className="shrink-0">
            <Button href={services.cta.href} variant="outline" withChip className="!py-3 !text-[14px] !leading-5 !ring-ink-900">
              {services.cta.label}
            </Button>
          </div>
        </ScrollReveal>

        {/* Each card's icon draws itself on as the card arrives, then keeps a
            small idle loop going (see ServiceIcon). */}
        <IconDrawIn className="mt-10">
          <ScrollReveal as="ul" variant="tilt" stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((service) => (
              <li key={service.title} data-reveal-item data-draw-item>
                <Link
                  href={service.href}
                  className="group flex h-full min-h-[238px] flex-col rounded-2xl border border-ink-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(18,19,26,0.06)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center self-start rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <h3 className="mt-5 text-[17.5px] font-bold leading-6">{service.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-[14px] leading-5 text-body">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ScrollReveal>
        </IconDrawIn>
      </div>
    </section>
  );
}

/**
 * AI technology: a dark band with the two intro paragraphs, then the six
 * areas of interest as cards beside the photo.
 */
export function HomeAi() {
  const ai = home.ai;
  const card = "rounded-[14px] border border-white/[0.08] bg-night-card transition-colors duration-500 hover:border-brand-500/40";

  return (
    <section id="ai" className="bg-night pb-24 pt-[84px] text-white">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{ai.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[580px] text-[36px] font-bold leading-[40px] text-white [text-wrap:wrap]">
            {ai.title}
          </h2>
          <p data-reveal-item className="mt-8 max-w-[700px] text-[16px] leading-[26px] text-body-dark [text-wrap:wrap]">
            {ai.lead}
          </p>
          <p data-reveal-item className="mt-4 max-w-[700px] text-[16px] leading-[26px] text-white [text-wrap:wrap]">
            {ai.goal}
          </p>
        </ScrollReveal>

        {/* Six areas of interest, each with its one-line description, beside the photo. */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          <ScrollReveal as="ul" variant="up" stagger={0.08} className="grid gap-5 sm:grid-cols-2">
            {ai.areas.map((area) => (
              <li key={area.title} data-reveal-item className={`${card} p-6`}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500">
                  <DesignIcon name="chip" className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-4 text-[17px] font-bold leading-6 text-white">{area.title}</h3>
                <p className="mt-2 text-[14px] leading-[22px] text-body-dark">{area.body}</p>
              </li>
            ))}
          </ScrollReveal>

          <ZoomImage className="relative min-h-[22rem] overflow-hidden rounded-[14px]">
            <Image src={ai.image} alt={ai.imageAlt} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
          </ZoomImage>
        </div>

        <div className="mt-10">
          <Button href={ai.cta.href} variant="coral" withChip className="!py-3 !text-[14px] !leading-5">
            {ai.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
