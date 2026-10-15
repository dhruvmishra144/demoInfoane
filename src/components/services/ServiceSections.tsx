import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow, SectionIntro } from "@/components/design/blocks";
import { IconTile } from "@/components/design/DesignIcon";
import type { IconName } from "@/content/redesign";

/**
 * Sections shared by the service pages (Mobile App Development, and the
 * later sections of Web Application Development). Each takes plain content
 * and renders server-side; motion comes from the ScrollReveal wrappers.
 */

type Cta = { label: string; href: string };
type Titled = { title: string; body: string };

/* ------------------------------------------------------------------- Intro */

/** Headline on the left, the supporting paragraphs and a call to action on the right. */
export function ServiceIntro({
  id = "overview",
  eyebrow,
  title,
  paragraphs,
  cta,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  cta?: Cta;
}) {
  return (
    <section id={id} className="py-20 lg:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <ScrollReveal stagger={0.1}>
          <div data-reveal-item>
            <Eyebrow dot>{eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-[34rem] text-[2rem] font-bold leading-[1.2] lg:text-[40px] lg:leading-[48px]">
            {title}
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger={0.1} className="space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} data-reveal-item className="text-[16px] leading-[27px] text-ink-600">
              {paragraph}
            </p>
          ))}
          {cta && (
            <div data-reveal-item className="pt-3">
              <Button href={cta.href} variant="coral" withChip>
                {cta.label}
              </Button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Cards */

/** An icon-led grid of services: four across on desktop. */
export function ServiceCards({
  id = "services",
  eyebrow,
  title,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: readonly (Titled & { icon: IconName })[];
}) {
  return (
    <section id={id} className="relative bg-[#f6f4fb] py-20 lg:py-24">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={eyebrow} title={title} titleClassName="max-w-3xl" />
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.07} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.title}
              data-reveal-item
              className="group flex flex-col rounded-2xl border border-white bg-white p-6 shadow-[0_1px_3px_rgba(18,19,26,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <IconTile name={item.icon} size="sm" />
              <h3 className="mt-5 text-[17px] font-bold leading-6 text-ink-900">{item.title}</h3>
              <p className="mt-2.5 text-[14px] leading-[22px] text-ink-600">{item.body}</p>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Capabilities */

/** A dark panel of numbered capabilities, hairline-divided. */
export function ServiceCapabilities({
  id = "capabilities",
  eyebrow,
  title,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: readonly Titled[];
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-night py-20 lg:py-24">
      <div className="accent-glow absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot dark eyebrow={eyebrow} title={title} titleClassName="max-w-3xl" />
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.08} className="mt-12 grid gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.title} data-reveal-item className="border-t border-white/10 py-8">
              <span className="text-[13px] font-bold tabular-nums tracking-[0.14em] text-brand-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[18px] font-bold leading-6 text-white">{item.title}</h3>
              <p className="mt-2.5 max-w-[22rem] text-[14px] leading-[22px] text-ink-400">{item.body}</p>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Technology */

/** Technology chips in labelled groups, with a closing call to action. */
export function ServiceTechnology({
  id = "technology",
  eyebrow,
  title,
  lead,
  groups,
  cta,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead: string;
  groups: readonly { label: string; items: readonly string[] }[];
  cta?: Cta;
}) {
  return (
    <section id={id} className="py-20 lg:py-24">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={eyebrow} title={title} lead={lead} titleClassName="max-w-3xl" />
        </ScrollReveal>

        <div className="mt-12 space-y-10">
          {groups.map((group) => (
            <ScrollReveal key={group.label} variant="up" stagger={0.04}>
              <p data-reveal-item className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500">
                {group.label}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    data-reveal-item
                    className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-[14px] font-semibold leading-5 text-ink-900 shadow-[0_1px_3px_rgba(18,19,26,0.05)] transition-colors duration-300 hover:border-brand-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {cta && (
          <div className="mt-10">
            <Button href={cta.href} variant="outline" withChip className="!py-3 !text-[14px] !leading-5 !ring-ink-900">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- Why */

/** "Why Infoane": six short strengths on a lavender wash. */
export function ServiceWhy({
  id = "why",
  eyebrow,
  title,
  lead,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  items: readonly Titled[];
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden py-20 lg:py-24">
      <div className="wash absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={eyebrow} title={title} lead={lead} titleClassName="max-w-3xl" />
        </ScrollReveal>

        <ScrollReveal as="ul" variant="up" stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              data-reveal-item
              className="rounded-2xl border border-white/80 bg-white/85 p-7 shadow-[0_1px_3px_rgba(18,19,26,0.06)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <span className="block h-1 w-8 rounded-full bg-brand-500" aria-hidden="true" />
              <h3 className="mt-5 text-[18px] font-bold leading-6 text-ink-900">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-[22px] text-ink-600">{item.body}</p>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Benefits */

/** The business benefits as a two-column checklist in a soft panel. */
export function ServiceBenefits({
  id = "benefits",
  eyebrow,
  title,
  lead,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  items: readonly string[];
}) {
  return (
    <section id={id} className="py-20 lg:py-24">
      <div className="container-x">
        <div className="rounded-[28px] bg-[#f6f4fb] p-8 sm:p-12 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-14">
          <ScrollReveal stagger={0.1}>
            <div data-reveal-item>
              <Eyebrow dot>{eyebrow}</Eyebrow>
            </div>
            <h2 data-split className="mt-5 max-w-md text-[2rem] font-bold leading-[1.2] lg:text-[40px] lg:leading-[48px]">
              {title}
            </h2>
            {lead && (
              <p data-reveal-item className="mt-4 max-w-md text-[15px] leading-6 text-ink-600">
                {lead}
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal as="ul" variant="up" stagger={0.05} className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:mt-0">
            {items.map((item) => (
              <li key={item} data-reveal-item className="flex items-start gap-3 text-[15px] leading-6 text-ink-700">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 12.5 4 4 8-9" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Approach */

/** A vertical timeline: the heading sticks beside it while the steps scroll. */
export function ServiceApproach({
  id = "approach",
  eyebrow,
  title,
  steps,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  steps: readonly Titled[];
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-night py-20 lg:py-24">
      <div className="accent-glow absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <ScrollReveal stagger={0.1} className="lg:sticky lg:top-32 lg:self-start">
          <div data-reveal-item>
            <Eyebrow dot>{eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-md text-[2rem] font-bold leading-[1.2] text-white lg:text-[40px] lg:leading-[48px]">
            {title}
          </h2>
        </ScrollReveal>

        <ScrollReveal as="ol" variant="up" stagger={0.1} className="relative">
          <span className="absolute bottom-3 left-[19px] top-3 w-px bg-gradient-to-b from-brand-500/60 via-white/15 to-transparent" aria-hidden="true" />
          {steps.map((step, index) => (
            <li key={step.title} data-reveal-item className="relative flex gap-6 pb-9 last:pb-0">
              <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-night-card text-[13px] font-bold tabular-nums text-brand-500 ring-1 ring-inset ring-brand-500/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <h3 className="text-[18px] font-bold leading-6 text-white">{step.title}</h3>
                <p className="mt-2 max-w-[34rem] text-[14px] leading-[22px] text-ink-400">{step.body}</p>
              </div>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- FAQ */

/**
 * FAQ on <details>/<summary>: keyboard accessible with no JavaScript, and every
 * answer is in the HTML whether or not its panel is open, which is what lets the
 * same text back the page's FAQPage structured data.
 */
export function ServiceFaq({
  id = "faq",
  eyebrow,
  title,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-20 lg:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <ScrollReveal variant="blur" stagger={0.1} className="lg:sticky lg:top-32 lg:self-start">
          <div data-reveal-item>
            <Eyebrow dot>{eyebrow}</Eyebrow>
          </div>
          <h2 id={`${id}-heading`} data-split className="mt-5 text-[2rem] font-bold leading-[1.2] lg:text-[40px] lg:leading-[48px]">
            {title}
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="up" stagger={0.06} className="space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              data-reveal-item
              className="group rounded-2xl border border-ink-200 bg-white px-6 transition-colors duration-300 open:border-brand-200 open:shadow-lg open:shadow-brand-500/5 hover:border-brand-200"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[16px] font-semibold leading-6 text-ink-900">{item.question}</h3>
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[14px] leading-[22px] text-ink-600">{item.answer}</p>
            </details>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Related */

/** A row of internal links to related pages. */
export function ServiceRelated({
  eyebrow,
  title,
  links,
}: {
  eyebrow: string;
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <section className="pb-20 lg:pb-24">
      <div className="container-x">
        <ScrollReveal stagger={0.05}>
          <div data-reveal-item>
            <Eyebrow dot>{eyebrow}</Eyebrow>
          </div>
          <h2 data-reveal-item className="mt-4 text-[22px] font-bold leading-8">
            {title}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.label} data-reveal-item>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-800 transition-colors duration-300 hover:border-brand-300 hover:text-brand-600"
                >
                  {link.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
