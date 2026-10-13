import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/**
 * Dark "Trusted by" panel: a ragged bento of client tiles, each with its own
 * width and height (`size` in the content), tops aligned. Client names are
 * published only with permission (see the note in redesign.ts).
 */
export function AboutTrusted() {
  const t = aboutPage.trusted;
  return (
    <ExpandPanel id="clients" className="relative isolate overflow-hidden bg-[#141420] py-16 lg:pb-20 lg:pt-20">
      <div className="accent-glow absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
      <div className="container-x">
        <ScrollReveal stagger={0.12} className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
          <div>
            <div data-reveal-item>
              <Eyebrow dot>{t.eyebrow}</Eyebrow>
            </div>
            <h2
              data-split
              className="mt-7 max-w-[38rem] text-[2.25rem] font-bold leading-[1.15] text-white lg:text-[52px] lg:leading-[58px]"
            >
              {t.title}
            </h2>
          </div>
          <p data-reveal-item className="text-[14px] leading-6 text-ink-400 lg:mt-[52px]">
            {t.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="scale" stagger={0.06} className="mt-[53px] flex flex-wrap items-start gap-[15px]">
          {t.clients.map((client) => (
            <li
              key={client.name}
              data-reveal-item
              className={`flex min-h-24 basis-[calc(50%-8px)] grow flex-col rounded-2xl px-5 pt-[26px] ring-1 ring-inset transition-colors duration-500 sm:basis-[calc(33%-8px)] lg:grow ${
                client.warm
                  ? "bg-[#2a1b14] ring-brand-500/15 hover:ring-brand-500/50"
                  : "bg-[#1b1b2d] ring-white/[0.06] hover:ring-white/25"
              } ${client.size}`}
            >
              <p className="text-[15px] font-bold leading-5 text-white">{client.name}</p>
              <p className="mt-1.5 text-[9px] font-bold uppercase leading-[11px] tracking-[0.14em] text-brand-500">
                {client.sector}
              </p>
            </li>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="blur">
          <div data-reveal-item className="mt-14 flex items-center gap-6 lg:mt-16">
            <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
            <p className="max-w-[22rem] text-center text-[13px] leading-5 text-ink-400">{t.footnote}</p>
            <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
          </div>
        </ScrollReveal>
      </div>
    </ExpandPanel>
  );
}
