import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CountUp } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { home } from "@/content/redesign";

/**
 * Company introduction, laid out as the mockup has it: headline, one block of
 * copy, the link, three photo cards (the first twice as wide), then the
 * numbers. The ColdFusion card that follows in the mockup is its own section
 * (HomeColdFusion).
 */
export function HomeAbout() {
  const about = home.about;

  return (
    <section id="about" className="pb-20 pt-24">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[29px] max-w-[900px] text-[40px] font-bold leading-[45px] [text-wrap:wrap]">
            {about.title}
          </h2>
          <p data-reveal-item className="mt-[25px] text-[16px] leading-[26px] text-body">
            {about.entity} {about.paragraphs.join(" ")}
          </p>
        </ScrollReveal>

        <Link
          href={about.link.href}
          className="group mt-10 inline-flex items-center gap-6 text-[15px] font-semibold leading-6 text-brand-500"
        >
          <span className="underline decoration-brand-500 decoration-[1.5px] underline-offset-[3px]">
            {about.link.label}
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h13M12 6l6 6-6 6" />
          </svg>
        </Link>

        <ScrollReveal as="ul" variant="up" stagger={0.12} className="mt-8 grid gap-[18px] md:grid-cols-[1.9fr_1fr_1fr]">
          {about.cards.map((card, index) => (
            <li
              key={card.label}
              data-reveal-item
              className="group relative isolate h-[278px] overflow-hidden rounded-2xl bg-night ring-1 ring-inset ring-ink-200/70"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes={index === 0 ? "(min-width: 768px) 566px, 90vw" : "(min-width: 768px) 298px, 90vw"}
                className="-z-10 object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              {/* The caption sits in a dark box that fades out to the right, as
                  the mockup draws it, rather than under a full-width scrim. */}
              <div className="absolute bottom-0 left-0 rounded-tr-xl bg-gradient-to-r from-[#0c0d18]/85 via-[#0c0d18]/60 to-[#0c0d18]/0 py-5 pl-6 pr-10">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#3b82f6]">{card.label}</p>
                <p className="mt-1.5 max-w-[19rem] text-[13px] leading-5 text-white">{card.caption}</p>
              </div>
            </li>
          ))}
        </ScrollReveal>

        <div className="mt-8 border-t border-ink-200 pt-11">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">{about.numbersLabel}</p>
          <ScrollReveal as="ul" variant="up" stagger={0.1} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {about.numbers.map((item) => (
              <li key={item.label} data-reveal-item>
                <CountUp value={item.value} className="block text-[36px] font-bold leading-[40px] text-ink-900" />
                <p className="mt-1 text-[15px] font-semibold leading-5 text-ink-900">{item.title}</p>
                <p className="mt-1.5 max-w-[15rem] text-[13px] leading-5 text-body">{item.label}</p>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
