import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CountUp, ExpandPanel } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
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
    <ExpandPanel id="success" className="relative isolate overflow-hidden bg-night py-20 lg:py-28">
      <div className="accent-glow absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <ScrollReveal stagger={0.12}>
            <div data-reveal-item>
              <Eyebrow dot>{s.eyebrow}</Eyebrow>
            </div>
            <h2 data-split className="mt-5 max-w-md text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem]">
              {s.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="scale">
            <div data-reveal-item className="rounded-2xl bg-night-card px-8 py-5 text-center ring-1 ring-inset ring-white/10">
              <CountUp value={s.stat.value} className="block text-4xl font-bold tabular-nums text-brand-500" />
              <span className="mt-1 block text-xs text-ink-400">{s.stat.label}</span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal as="ul" variant="tilt" stagger={0.14} className="mt-14 grid gap-5 lg:grid-cols-3">
          {s.quotes.map((q, i) => {
            const coral = i === s.quotes.length - 1;
            return (
              <li
                key={i}
                data-reveal-item
                className={`flex flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 ${
                  coral ? "bg-brand-500 text-white" : "bg-night-card text-ink-300 ring-1 ring-inset ring-white/10"
                }`}
              >
                <span
                  className={`text-5xl font-bold leading-none ${coral ? "text-white/70" : "text-brand-500"}`}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className={`mt-4 flex-1 text-base leading-relaxed ${coral ? "text-white" : "text-ink-200"}`}>
                  {q.quote}
                </blockquote>
                <div className="mt-8 flex items-center gap-3">
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      coral ? "bg-white/25 text-white" : "bg-white/10 text-white"
                    }`}
                    aria-hidden="true"
                  >
                    {q.role.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{q.role}</p>
                    <p className={`text-xs ${coral ? "text-white/80" : "text-ink-400"}`}>{q.company}</p>
                  </div>
                </div>
                <Link
                  href={routes.caseStudies}
                  className={`mt-6 inline-flex items-center gap-1.5 text-xs font-semibold ${
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
