import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/** "Why Infoane": six short strengths on the plain page color. */
export function HomeWhy() {
  const why = home.why;

  return (
    <section id="why" className="py-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{why.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {why.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[820px] text-[16px] leading-[26px] text-body">
            {why.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item) => (
            <li
              key={item.title}
              data-reveal-item
              className="rounded-2xl border border-ink-200/80 bg-white p-7 shadow-[0_1px_3px_rgba(18,19,26,0.06)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <span className="block h-1 w-8 rounded-full bg-brand-500" aria-hidden="true" />
              <h3 className="mt-5 text-[18px] font-bold leading-6">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-[22px] text-body">{item.body}</p>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * ColdFusion spotlight: the dark partner card, with the draft's three
 * paragraphs and the seven ColdFusion capabilities listed beneath.
 */
export function HomeColdFusion() {
  const cf = home.coldfusion;

  return (
    <section id="coldfusion" className="pb-24">
      <div className="container-x">
        <ScrollReveal variant="scale">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-night p-6 sm:p-12">
            <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow">{cf.eyebrow}</p>
                <h2 data-split className="mt-4 text-[36px] font-bold leading-[40px] text-white [text-wrap:wrap]">
                  {cf.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {cf.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-[26px] text-[#d1d5db] [text-wrap:wrap]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href={cf.cta.href} variant="coral" withChip className="!rounded-xl !py-[10.5px] !text-[14px] !leading-6">
                    {cf.cta.label}
                  </Button>
                </div>
              </div>

              <ZoomImage className="relative mt-10 aspect-[976/756] overflow-hidden rounded-3xl lg:mt-0">
                {/* Photo and caption scale together (one `data-zoom-media`
                    layer), so the live caption stays locked over the one baked
                    into the source image throughout the zoom. */}
                <div data-zoom-media className="absolute inset-0">
                  <Image
                    src={cf.image}
                    alt={cf.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 496px, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6 flex w-80 max-w-[calc(100%-3rem)] flex-col justify-center rounded-2xl bg-[#151733]/95 p-6 ring-1 ring-white/10">
                    <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-500">{cf.badgeTitle}</p>
                    <p className="mt-2 text-[13px] leading-5 text-white">{cf.badgeBody}</p>
                  </div>
                </div>
              </ZoomImage>
            </div>

            <ul className="mt-12 grid gap-x-8 gap-y-7 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {cf.capabilities.map((capability) => (
                <li key={capability.title}>
                  <h3 className="text-[16px] font-bold leading-6 text-white">{capability.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-[22px] text-body-dark">{capability.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
