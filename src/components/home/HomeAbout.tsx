import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CountUp, TextScrub } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/**
 * Company introduction, laid out as the mockup has it: headline and entity
 * statement, the supporting copy, three photo cards, then the numbers.
 *
 * The entity statement uses the read-along scrub (words brighten as it scrolls
 * through); everything else rises in beneath it. The ColdFusion card that
 * follows in the mockup is its own section (HomeColdFusion).
 */
export function HomeAbout() {
  const about = home.about;
  const [intro, detail, closing] = about.paragraphs;

  return (
    <section id="about" className="pb-[100px] pt-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[29px] max-w-[780px] text-[40px] font-bold leading-[45px] [text-wrap:wrap]">
            {about.title}
          </h2>
        </ScrollReveal>

        <TextScrub className="mt-[25px] max-w-[900px] text-[20px] leading-[32px] text-ink-700">
          {about.entity}
        </TextScrub>

        <ScrollReveal as="div" variant="up" stagger={0.1} className="mt-6 grid max-w-[1000px] gap-x-10 gap-y-4 lg:grid-cols-2">
          <p data-reveal-item className="text-[15px] leading-[25px] text-body">
            {intro}
          </p>
          <p data-reveal-item className="text-[15px] leading-[25px] text-body">
            {detail}
          </p>
        </ScrollReveal>

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

        <ScrollReveal as="ul" variant="up" stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-3">
          {about.cards.map((card) => (
            <li
              key={card.label}
              data-reveal-item
              className="group relative isolate aspect-[16/9] overflow-hidden rounded-2xl bg-night md:aspect-[3/2] lg:aspect-[2/1]"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 90vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d18]/95 via-[#0c0d18]/60 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500">{card.label}</p>
                <p className="mt-1.5 max-w-[19rem] text-[14px] leading-5 text-white">{card.caption}</p>
              </div>
            </li>
          ))}
        </ScrollReveal>

        <div className="mt-14 border-t border-ink-200 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500">{about.numbersLabel}</p>
          <ScrollReveal as="ul" variant="up" stagger={0.1} className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {about.numbers.map((item) => (
              <li key={item.label} data-reveal-item>
                <CountUp value={item.value} className="block text-[44px] font-bold leading-[48px] text-ink-900" />
                <p className="mt-2 max-w-[13rem] text-[14px] leading-[21px] text-body">{item.label}</p>
              </li>
            ))}
          </ScrollReveal>
          <p className="mt-10 max-w-[820px] text-[15px] leading-[25px] text-body">{closing}</p>
        </div>
      </div>
    </section>
  );
}
