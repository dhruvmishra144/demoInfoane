import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ExpandPanel, Parallax } from "@/components/motion/effects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionIntro } from "@/components/design/blocks";
import { webApplications } from "@/content/web-applications";

/** Dark ColdFusion section; opens out to the viewport edges as it arrives. */
export function WaColdFusion() {
  const cf = webApplications.coldfusion;

  return (
    <ExpandPanel id="coldfusion" className="relative isolate overflow-hidden bg-night py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Parallax speed={0.3} className="absolute -right-32 top-0 w-[44rem] opacity-[0.12]">
          <Image
            src="/images/glass-ribbon.webp"
            alt=""
            width={1008}
            height={957}
            className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_55%,transparent)]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-[radial-gradient(40rem_28rem_at_10%_100%,rgba(255,107,74,0.1),transparent_65%)]" />
      </div>

      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dark dot eyebrow={cf.eyebrow} title={cf.title} lead={cf.lead} titleClassName="max-w-4xl" />
        </ScrollReveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <ScrollReveal variant="blur" stagger={0.12}>
            <p data-reveal-item className="max-w-lg text-xl leading-relaxed text-ink-300">
              {cf.body}
            </p>
            <p data-reveal-item className="mt-6 max-w-lg text-base leading-relaxed text-ink-400">
              {cf.note}
            </p>
            <div data-reveal-item className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={cf.primaryCta.href} variant="coral">
                {cf.primaryCta.label}
              </Button>
              <a
                href={cf.secondaryCta.href}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
              >
                {cf.secondaryCta.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            variant="scale"
            stagger={0.18}
            className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"
          >
            <div data-reveal-item className="rounded-2xl border border-white/10 bg-night-card p-6">
              <p className="eyebrow text-brand-500">{cf.from.kicker}</p>
              <h3 className="mt-4 text-lg font-bold text-white">{cf.from.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{cf.from.body}</p>
            </div>
            <span data-reveal-item className="flex justify-center text-brand-500" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-90 sm:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M12 6l6 6-6 6" />
              </svg>
            </span>
            <div data-reveal-item className="rounded-2xl bg-brand-50 p-6 shadow-xl shadow-brand-500/10 ring-1 ring-brand-100">
              <p className="eyebrow">{cf.to.kicker}</p>
              <h3 className="mt-4 text-lg font-bold text-ink-900">{cf.to.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{cf.to.body}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </ExpandPanel>
  );
}
