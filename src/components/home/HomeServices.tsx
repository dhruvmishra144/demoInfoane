import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { IconTile } from "@/components/design/DesignIcon";
import { home } from "@/content/redesign";

/**
 * Services grid over the glass-render wash, cards swinging up in sequence.
 * Measured to the 1440px design: 384x238 cards on a 24px grid, with the
 * render's pedestal showing in the 228px below them.
 */
export function HomeServices() {
  const services = home.services;

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-t border-ink-200/60 bg-[#f3f2f8] pb-24 pt-[74px] lg:pb-[228px]"
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
              className="mt-[17px] max-w-[620px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]"
            >
              {services.title}
            </h2>
          </div>
          <div data-reveal-item>
            <Button href={services.cta.href} variant="outline" withChip className="!py-3 !text-[14px] !leading-5 !ring-ink-900">
              {services.cta.label}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="tilt" stagger={0.09} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <li key={service.title} data-reveal-item>
              <Link
                href={service.href}
                className="group flex h-full min-h-[238px] flex-col rounded-2xl border border-ink-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(18,19,26,0.06)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10"
              >
                <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
                  <IconTile name={service.icon} />
                </span>
                <h3 className="mt-5 text-[17.5px] font-bold leading-6">{service.title}</h3>
                <ul className="mt-[19px] space-y-[3.5px]">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-[9px] text-[14px] leading-6 text-body">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * "How we use AI": a dark band with three cards beside the photo.
 * Card paddings (32px for the tall card, 20px for the two small ones) and the
 * 312/312/487px column widths are the design's. The two small cards use a
 * 40px icon and 20px body leading so their text fits the 218px the mockup
 * gives them (the mockup's own text runs into the card edge).
 */
export function HomeAi() {
  const ai = home.ai;
  const [first, ...rest] = ai.cards;

  return (
    <section id="ai" className="bg-night pb-[34px] pt-[73px] text-white">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{ai.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[620px] text-[36px] font-bold leading-[40px] text-white [text-wrap:wrap]">
            {ai.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[560px] text-[16px] leading-[26px] text-body-dark [text-wrap:wrap]">
            {ai.lead}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-[312px_312px_487px]">
          <ScrollReveal variant="up" className="h-full">
            <article className="h-full rounded-[20px] border border-white/[0.08] bg-night-card p-8 transition-colors duration-500 hover:border-brand-500/40">
              <IconTile name={first.icon} tone="dark" />
              <h3 className="mt-4 text-[17px] font-bold leading-6 text-white">{first.title}</h3>
              <p className="mt-4 text-[14px] leading-[22px] text-body-dark">{first.body}</p>
            </article>
          </ScrollReveal>

          <ScrollReveal variant="up" stagger={0.12} className="grid gap-6 md:grid-rows-[218px_217px]">
            {rest.map((card) => (
              <article
                key={card.title}
                data-reveal-item
                className="rounded-[20px] border border-white/[0.08] bg-night-card p-5 transition-colors duration-500 hover:border-brand-500/40"
              >
                <IconTile name={card.icon} tone="dark" size="sm" />
                <h3 className="mt-2 text-[17px] font-bold leading-6 text-white">{card.title}</h3>
                <p className="mt-2 text-[14px] leading-[22px] text-body-dark">{card.body}</p>
              </article>
            ))}
          </ScrollReveal>

          <ZoomImage className="relative min-h-[22rem] overflow-hidden rounded-[20px] md:col-span-2 xl:col-span-1 xl:min-h-0">
            <Image src={ai.image} alt={ai.imageAlt} fill sizes="(min-width: 1280px) 487px, 90vw" className="object-cover" />
          </ZoomImage>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] leading-6 text-[#7b8190]">{ai.footnote}</p>
          <Button href={ai.cta.href} variant="coral" withChip className="shrink-0 !py-3 !text-[14px] !leading-5">
            {ai.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
