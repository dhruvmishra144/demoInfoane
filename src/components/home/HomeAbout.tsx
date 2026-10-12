import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CountUp, TextScrub, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/**
 * "About us" intro, the by-the-numbers row and the ColdFusion partner card.
 *
 * Sized to the 1440px design (1200px of content): every gap below is a measured
 * distance, so the section lands at the same height as the mockup.
 *
 * The body paragraph uses the read-along scrub — words brighten as it scrolls
 * through — and the stats count up the first time they appear.
 */
export function HomeAbout() {
  const about = home.about;
  const cf = home.coldfusion;

  return (
    <section id="about" className="pb-[100px] pt-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[29px] text-[40px] font-bold leading-[45px] [text-wrap:wrap]">
            {about.title}
          </h2>
        </ScrollReveal>

        {/* Three lines tall in the design, so the rows below keep their place. */}
        <TextScrub className="mt-[25px] min-h-[78px] text-[16px] leading-[26px] text-body">
          {about.body}
        </TextScrub>

        <Link
          href={about.link.href}
          className="group mt-7 inline-flex items-center gap-6 text-[15px] font-semibold leading-6 text-brand-500"
        >
          <span className="underline decoration-brand-500 decoration-[1.5px] underline-offset-[3px]">
            {about.link.label}
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h13M12 6l6 6-6 6" />
          </svg>
        </Link>

        <div className="mt-[30px] border-t border-ink-200 pt-9">
          <p className="text-xs font-semibold uppercase leading-4 tracking-[0.15em] text-ink-500">
            {about.statsLabel}
          </p>
          <ScrollReveal as="ul" stagger={0.1} className="mt-[29px] grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {about.stats.map((stat) => (
              <li key={stat.label} data-reveal-item>
                <CountUp
                  value={stat.value}
                  className="block text-[36px] font-bold leading-none text-ink-900 tabular-nums"
                />
                <span className="mt-2 block text-[13px] leading-5 text-body">{stat.label}</span>
              </li>
            ))}
          </ScrollReveal>
          <p className="mt-6 text-[15px] leading-6 text-body [text-wrap:wrap]">{about.statsNote}</p>
        </div>

        {/* ColdFusion partner card */}
        <ScrollReveal variant="scale" className="mt-[49px]">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-night p-6 sm:p-12 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">{cf.eyebrow}</p>
              <h3 data-split className="mt-4 text-[40px] font-bold leading-[44px] text-white [text-wrap:wrap]">
                {cf.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[26px] text-[#d1d5db] [text-wrap:wrap]">{cf.body}</p>
              <p className="eyebrow mt-[26px]">{cf.kicker}</p>
              <div className="mt-[26px] flex flex-wrap items-center gap-4">
                <Button href={cf.primaryCta.href} variant="coral" className="!rounded-xl !py-[10.5px] !text-[14px] !leading-6">
                  {cf.primaryCta.label}
                </Button>
                <Link
                  href={cf.secondaryCta.href}
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-brand-500 transition-colors hover:text-brand-400"
                >
                  {cf.secondaryCta.label}
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
        </ScrollReveal>
      </div>
    </section>
  );
}
