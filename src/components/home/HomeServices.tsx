import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel, Float, Parallax, ZoomImage } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { IconTile } from "@/components/design/DesignIcon";
import { home } from "@/content/redesign";

/** Services grid on the lavender wash, cards swinging up in sequence. */
export function HomeServices() {
  const services = home.services;

  return (
    <section id="services" className="relative isolate overflow-hidden border-y border-ink-200/60 py-24 lg:py-32">
      <div className="wash absolute inset-0 -z-20" aria-hidden="true" />
      {/* Glass render drifting behind the cards at its own pace. */}
      <Parallax speed={0.5} rotate={-8} className="absolute left-1/2 top-24 -z-10 w-[56rem] -translate-x-1/2 opacity-60">
        <Image src="/images/hero-orbit.webp" alt="" width={1436} height={1238} className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_60%,transparent)]" />
      </Parallax>
      <Float className="absolute right-[18%] top-28 -z-10" amount={22}>
        <div className="orb-peach h-24 w-24 opacity-70" />
      </Float>

      <div className="container-x">
        <ScrollReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro eyebrow={services.eyebrow} title={services.title} />
          <div data-reveal-item>
            <Button href={services.cta.href} variant="outline" withChip className="!ring-ink-900">
              {services.cta.label}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="tilt" stagger={0.09} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <li key={service.title} data-reveal-item>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-3xl border border-ink-200/80 bg-white/90 p-8 shadow-sm backdrop-blur transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10"
              >
                <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
                  <IconTile name={service.icon} />
                </span>
                <h3 className="mt-7 text-lg font-bold">{service.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-ink-600">
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
 * "How we use AI" — a dark panel that opens out to the viewport edges as it
 * arrives, with the photo un-clipping beside the cards.
 */
export function HomeAi() {
  const ai = home.ai;
  const [first, ...rest] = ai.cards;

  return (
    <ExpandPanel id="ai" className="bg-night py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dark eyebrow={ai.eyebrow} title={ai.title} lead={ai.lead} />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr_1.5fr]">
          <ScrollReveal variant="up" className="h-full">
            <article className="h-full rounded-3xl border border-white/10 bg-night-card p-8 transition-colors duration-500 hover:border-brand-500/40">
              <IconTile name={first.icon} tone="dark" />
              <h3 className="mt-8 text-xl font-bold text-white">{first.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-ink-400">{first.body}</p>
            </article>
          </ScrollReveal>

          <ScrollReveal variant="up" stagger={0.12} className="grid gap-6">
            {rest.map((card) => (
              <article
                key={card.title}
                data-reveal-item
                className="rounded-3xl border border-white/10 bg-night-card p-7 transition-colors duration-500 hover:border-brand-500/40"
              >
                <IconTile name={card.icon} tone="dark" />
                <h3 className="mt-5 text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{card.body}</p>
              </article>
            ))}
          </ScrollReveal>

          <ZoomImage className="relative min-h-[22rem] overflow-hidden rounded-3xl">
            <Image src={ai.image} alt={ai.imageAlt} fill sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
          </ZoomImage>
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-400">{ai.footnote}</p>
          <Button href={ai.cta.href} variant="coral" withChip className="shrink-0">
            {ai.cta.label}
          </Button>
        </div>
      </div>
    </ExpandPanel>
  );
}
