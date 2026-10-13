import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { IconTile } from "@/components/design/DesignIcon";
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

        <ScrollReveal as="ul" variant="tilt" stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <p className="mt-3 text-[14px] leading-[22px] text-body">{service.body}</p>
              </Link>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * AI technology: a dark band with the focus areas and the "practical
 * application" note beside the photo.
 */
export function HomeAi() {
  const ai = home.ai;

  return (
    <section id="ai" className="bg-night pb-24 pt-[73px] text-white">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{ai.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] text-white [text-wrap:wrap]">
            {ai.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[680px] text-[16px] leading-[26px] text-body-dark [text-wrap:wrap]">
            {ai.lead}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_487px]">
          <ScrollReveal variant="up" stagger={0.12} className="grid content-start gap-6">
            <article
              data-reveal-item
              className="rounded-[20px] border border-white/[0.08] bg-night-card p-8 transition-colors duration-500 hover:border-brand-500/40"
            >
              <h3 className="text-[19px] font-bold leading-6 text-white">{ai.focusTitle}</h3>
              <p className="mt-3 text-[14px] leading-[22px] text-body-dark">{ai.focusBody}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {ai.areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-brand-500/15 px-4 py-2 text-[13px] font-semibold text-brand-400 ring-1 ring-inset ring-brand-500/20"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </article>
            <article
              data-reveal-item
              className="rounded-[20px] border border-white/[0.08] bg-night-card p-8 transition-colors duration-500 hover:border-brand-500/40"
            >
              <h3 className="text-[19px] font-bold leading-6 text-white">{ai.goalTitle}</h3>
              <p className="mt-3 text-[14px] leading-[22px] text-body-dark">{ai.goalBody}</p>
            </article>
          </ScrollReveal>

          <ZoomImage className="relative min-h-[22rem] overflow-hidden rounded-[20px]">
            <Image src={ai.image} alt={ai.imageAlt} fill sizes="(min-width: 1024px) 487px, 90vw" className="object-cover" />
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
