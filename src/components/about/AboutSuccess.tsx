import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CountUp, ExpandPanel } from "@/components/motion/effects";
import { aboutPage } from "@/content/redesign";
import { routes } from "@/lib/routes";

/**
 * Dark client-success panel: three quote cards (the last in coral) and the
 * "40+ Success Stories" counter. Quotes are attributed by role only; the
 * company is a placeholder until each client consents (see redesign.ts).
 */
export function AboutSuccess() {
  const s = aboutPage.success;
  return (
    <ExpandPanel id="success" className="relative isolate overflow-hidden bg-night py-20 lg:pb-[88px] lg:pt-[100px]">
      <div className="accent-glow absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <ScrollReveal stagger={0.12}>
            <div data-reveal-item>
              {/* Highlighted: a solid coral tag so "Client success" stands out on the dark panel. */}
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-1.5 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-white shadow-lg shadow-brand-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                {s.eyebrow}
              </p>
            </div>
            <h2 data-split className="mt-5 max-w-[32rem] text-3xl font-bold leading-[1.2] text-white sm:text-4xl lg:text-[40px] lg:leading-[48px]">
              {s.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="scale">
            <div data-reveal-item className="rounded-xl bg-white/[0.04] px-8 py-4 text-center ring-1 ring-inset ring-white/10">
              <CountUp value={s.stat.value} className="block text-[30px] font-bold leading-9 tabular-nums text-brand-500" />
              <span className="mt-0.5 block text-[10px] leading-4 text-ink-500">{s.stat.label}</span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal as="ul" variant="tilt" stagger={0.14} className="mt-[59px] grid gap-5 lg:grid-cols-3">
          {s.quotes.map((q, i) => {
            const coral = i === s.quotes.length - 1;
            return (
              <li
                key={i}
                data-reveal-item
                className={`flex flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 lg:min-h-[440px] lg:p-11 ${
                  coral ? "bg-brand-500 text-white" : "bg-[#1a1a2e] text-ink-300 ring-1 ring-inset ring-white/[0.05]"
                }`}
              >
                <span
                  className={`text-4xl font-bold leading-none ${coral ? "text-white/70" : "text-brand-500"}`}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className={`mt-9 flex-1 text-[15px] leading-[26px] ${coral ? "text-white" : "text-ink-200"}`}>
                  {q.quote}
                </blockquote>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      coral ? "bg-white/25 text-white" : "bg-white/10 text-white"
                    }`}
                    aria-hidden="true"
                  >
                    {(q.author || q.role).charAt(0)}
                  </span>
                  <div>
                    {q.author && <p className="text-[13px] font-semibold leading-5 text-white">{q.author}</p>}
                    <p className={q.author ? "text-[12px] leading-4 text-white/85" : "text-[13px] font-semibold leading-5 text-white"}>
                      {q.role}
                    </p>
                    <p className={`text-[11px] ${coral ? "text-white/80" : "text-ink-500"}`}>{q.company}</p>
                  </div>
                </div>
                <Link
                  href={routes.caseStudies}
                  className={`mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold ${
                    coral ? "text-white" : "text-brand-500 hover:text-brand-400"
                  }`}
                >
                  {s.storyLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            );
          })}
        </ScrollReveal>
      </div>
    </ExpandPanel>
  );
}
