import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ChecklistProgress, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { DesignIcon } from "@/components/design/DesignIcon";
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

            {/* The capabilities tick themselves off as they scroll through:
                icon lights up and redraws, badge pops, counter and bar advance. */}
            <ChecklistProgress className="border-t border-white/10 p-6 sm:px-12 sm:pb-14 sm:pt-12">
              <p className="eyebrow">{cf.capabilitiesLabel}</p>
              <div className="mt-5 flex items-center gap-4" aria-hidden="true">
                <span data-check-count className="w-9 text-[15px] font-semibold tabular-nums text-brand-500">
                  {cf.capabilities.length}/{cf.capabilities.length}
                </span>
                <div className="w-56">
                  <p className="text-[12px] leading-4 text-body-dark">{cf.progressLabel}</p>
                  <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/10">
                    <div data-check-bar className="h-full origin-left rounded-full bg-brand-500" />
                  </div>
                </div>
              </div>

              <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {cf.capabilities.map((capability, index) => (
                  <li key={capability.title} data-check-item data-checked="" className="group">
                    <div className="flex items-start justify-between">
                      <span
                        data-check-icon
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30 ring-1 ring-inset ring-white/10 transition-all duration-500 group-data-[checked]:bg-brand-500/15 group-data-[checked]:text-brand-500 group-data-[checked]:ring-brand-500/30"
                      >
                        <DesignIcon name={capability.icon} className="h-6 w-6" />
                      </span>
                      <span
                        className="inline-flex h-6 w-6 scale-0 items-center justify-center rounded-full bg-brand-500 text-white opacity-0 shadow-lg shadow-brand-500/30 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[checked]:scale-100 group-data-[checked]:opacity-100"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 12.5 4 4 8-9" />
                        </svg>
                      </span>
                    </div>
                    <p className="mt-5 text-[12px] font-semibold tabular-nums leading-4 text-brand-500/50 transition-colors duration-500 group-data-[checked]:text-brand-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1.5 text-[16px] font-bold leading-6 text-white/45 transition-colors duration-500 group-data-[checked]:text-white">
                      {capability.title}
                    </h3>
                    <p className="mt-2 max-w-[22rem] text-[14px] leading-[22px] text-body-dark/50 transition-colors duration-500 group-data-[checked]:text-body-dark">
                      {capability.body}
                    </p>
                    <span
                      className="mt-6 block h-px bg-gradient-to-r from-brand-500/0 via-brand-500/40 to-brand-500/0 opacity-0 transition-opacity duration-700 group-data-[checked]:opacity-100"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            </ChecklistProgress>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
