import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { WhyTabs } from "./WhyTabs";
import { home } from "@/content/redesign";

/** "Why Infoane": the six strengths as a vertical tab list beside a photo panel. */
export function HomeWhy() {
  const why = home.why;

  return (
    <section id="why" className="border-t border-ink-200/70 pb-20 pt-[92px]">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{why.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[580px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {why.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[680px] text-[16px] leading-[26px] text-body">
            {why.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" className="mt-12">
          <WhyTabs items={why.items} />
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * ColdFusion spotlight: the dark partner card — the draft's copy and two
 * actions beside the summit photo, then the seven capabilities under a
 * full-width rule.
 */
export function HomeColdFusion() {
  const cf = home.coldfusion;

  return (
    <section id="coldfusion" className="pb-24">
      <div className="container-x">
        <ScrollReveal variant="scale">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-night">
            <div className="p-6 sm:p-12 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
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
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Button href={cf.primaryCta.href} variant="coral" className="!rounded-md !px-7 !py-3.5 !text-[14px] !leading-5">
                    {cf.primaryCta.label}
                  </Button>
                  <Link
                    href={cf.cta.href}
                    className="group inline-flex items-center gap-1.5 text-[16px] font-semibold leading-6 text-brand-500 transition-colors duration-300 hover:text-brand-400"
                  >
                    {cf.cta.label}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h13M12 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <ZoomImage className="relative aspect-[976/756] overflow-hidden rounded-3xl">
                  {/* Photo and caption scale together (one zoom layer) so the caption stays locked to the photo through the
                      zoom. From sm up the caption sits over the photo; on a phone
                      it would cover most of it, so it moves below (see next block). */}
                  <div data-zoom-media className="absolute inset-0">
                    <Image
                      src={cf.image}
                      alt={cf.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 496px, 90vw"
                      className="object-cover object-[50%_28%]"
                    />
                    <div className="absolute bottom-6 left-6 hidden w-80 max-w-[calc(100%-3rem)] flex-col justify-center rounded-2xl bg-[#151733]/95 p-6 ring-1 ring-white/10 sm:flex">
                      <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-500">{cf.badgeTitle}</p>
                      <p className="mt-2 text-[13px] leading-5 text-white">{cf.badgeBody}</p>
                    </div>
                  </div>
                </ZoomImage>
                <div className="mt-4 rounded-2xl bg-[#151733] p-5 ring-1 ring-white/10 sm:hidden">
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-500">{cf.badgeTitle}</p>
                  <p className="mt-2 text-[13px] leading-5 text-white">{cf.badgeBody}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-6 sm:px-12 sm:pb-14 sm:pt-12">
              <p className="eyebrow">{cf.capabilitiesLabel}</p>
              <ul className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                {cf.capabilities.map((capability) => (
                  <li key={capability.title}>
                    <h3 className="flex items-center gap-2.5 text-[16px] font-bold leading-6 text-white">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white" aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 12.5 4 4 8-9" />
                        </svg>
                      </span>
                      {capability.title}
                    </h3>
                    <p className="mt-2 max-w-[22rem] text-[14px] leading-[22px] text-body-dark">{capability.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
