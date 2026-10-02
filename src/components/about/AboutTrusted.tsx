import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/**
 * Dark "Trusted by" panel: a 16-column bento of client tiles, sized by each
 * client's `span`. Client names are published only with permission (see the
 * note in redesign.ts).
 */
export function AboutTrusted() {
  const t = aboutPage.trusted;
  return (
    <ExpandPanel id="clients" className="relative isolate overflow-hidden bg-night py-20 lg:py-28">
      <div className="accent-glow absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="container-x">
        <ScrollReveal stagger={0.12} className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div data-reveal-item>
              <Eyebrow dot>{t.eyebrow}</Eyebrow>
            </div>
            <h2 data-split className="mt-5 max-w-xl text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.9rem]">
              {t.title}
            </h2>
          </div>
          <p data-reveal-item className="max-w-xs text-base leading-relaxed text-ink-400 lg:justify-self-end">
            {t.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal as="ul" variant="scale" stagger={0.06} className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-16 lg:gap-4">
          {t.clients.map((client) => (
            <li
              key={client.name}
              data-reveal-item
              className={`flex min-h-28 flex-col justify-end rounded-2xl p-5 ring-1 ring-inset transition-colors duration-500 lg:min-h-32 ${
                client.warm
                  ? "bg-[#2a1c19] ring-brand-500/20 hover:ring-brand-500/50"
                  : "bg-night-card ring-white/10 hover:ring-white/25"
              } ${client.span}`}
            >
              <p className="text-base font-bold text-white">{client.name}</p>
              <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-500">
                {client.sector}
              </p>
            </li>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="blur">
          <p data-reveal-item className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-ink-400">
            {t.footnote}
          </p>
        </ScrollReveal>
      </div>
    </ExpandPanel>
  );
}
