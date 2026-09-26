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
 * The body paragraph uses the read-along scrub — words brighten as it scrolls
 * through — and the stats count up the first time they appear.
 */
export function HomeAbout() {
  const about = home.about;
  const cf = home.coldfusion;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-6 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl">
            {about.title}
          </h2>
        </ScrollReveal>

        <TextScrub className="mt-8 max-w-6xl text-lg leading-relaxed text-ink-700 lg:text-xl lg:leading-relaxed">
          {about.body}
        </TextScrub>

        <Link
          href={about.link.href}
          className="group mt-8 inline-flex items-center gap-3 text-base font-semibold text-brand-600"
        >
          <span className="underline decoration-brand-300 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-brand-600">
            {about.link.label}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h13M12 6l6 6-6 6" />
          </svg>
        </Link>

        <div className="mt-14 border-t border-ink-200 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
            {about.statsLabel}
          </p>
          <ScrollReveal as="ul" stagger={0.1} className="mt-8 grid grid-cols-2 gap-10 lg:grid-cols-4">
            {about.stats.map((stat) => (
              <li key={stat.label} data-reveal-item>
                <CountUp
                  value={stat.value}
                  className="block text-4xl font-bold tracking-tight text-ink-900 tabular-nums lg:text-5xl"
                />
                <span className="mt-3 block text-sm text-ink-600">{stat.label}</span>
              </li>
            ))}
          </ScrollReveal>
          <p className="mt-10 text-base text-ink-600">{about.statsNote}</p>
        </div>

        {/* ColdFusion partner card */}
        <ScrollReveal variant="scale" className="mt-16">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-night p-8 sm:p-12 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
            <div
              className="accent-glow absolute inset-0 -z-10 opacity-70"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow !text-brand-500">{cf.eyebrow}</p>
              <h3 data-split className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-[2.6rem]">
                {cf.title}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300">{cf.body}</p>
              <p className="eyebrow mt-8 !text-brand-500">{cf.kicker}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Button href={cf.primaryCta.href} variant="coral" className="!rounded-xl">
                  {cf.primaryCta.label}
                </Button>
                <Link
                  href={cf.secondaryCta.href}
                  className="group inline-flex items-center gap-2 text-base font-semibold text-brand-500 transition-colors hover:text-brand-400"
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
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-[3.5%] left-[3.5%] flex min-h-[38%] w-[68%] flex-col justify-center rounded-2xl bg-[#151733] p-5 ring-1 ring-white/10 sm:p-7">
                  <p className="eyebrow !text-brand-500">{cf.badgeTitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white sm:text-base">{cf.badgeBody}</p>
                </div>
              </div>
            </ZoomImage>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
