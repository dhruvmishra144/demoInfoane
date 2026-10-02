import { Button } from "@/components/ui/Button";
import { GlassBackdrop } from "@/components/design/blocks";
import { Float } from "@/components/motion/effects";
import { GrowBars } from "@/components/motion/GrowBars";
import { Intro } from "@/components/motion/Intro";
import { webApplications } from "@/content/web-applications";

const BARS = [28, 40, 34, 52, 46, 64, 58, 76, 70, 88, 80, 96];

/** Small dark analytics panel, built in HTML/SVG. Bars and lines draw on arrival. */
function DashboardCard() {
  const card = webApplications.hero.card;

  return (
    <div className="relative">
      <div className="rounded-3xl bg-white p-5 shadow-2xl shadow-ink-900/10 ring-1 ring-ink-200/60 sm:p-6">
        <div className="flex items-center justify-between text-xs">
          <p className="flex items-center gap-2 font-bold uppercase tracking-wide text-ink-900">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-60 motion-reduce:hidden" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-brand-500" />
            </span>
            {card.status}
          </p>
          <p className="text-ink-400">{card.uptime}</p>
        </div>

        <GrowBars className="mt-4 rounded-xl bg-night p-3 sm:p-4">
          <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white">{card.dashboardTitle}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-brand-500/60 bg-night-card p-2.5">
              <p className="text-[0.5rem] uppercase tracking-wider text-ink-400">API requests (last 60 mins)</p>
              <p className="mt-1 text-sm font-bold text-white">2,854</p>
              <svg viewBox="0 0 120 40" className="mt-1 h-10 w-full" aria-hidden="true">
                <path
                  data-area
                  d="M0 34C10 30 14 22 24 24s14 10 24 4 12-20 24-14 12 8 22-6 14-6 26-8V40H0Z"
                  fill="#ff6b4a"
                  fillOpacity="0.18"
                />
                <path
                  data-line
                  d="M0 34C10 30 14 22 24 24s14 10 24 4 12-20 24-14 12 8 22-6 14-6 26-8"
                  fill="none"
                  stroke="#ff6b4a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="rounded-lg bg-night-card p-2.5">
              <p className="text-[0.5rem] uppercase tracking-wider text-ink-400">Latency &amp; error rate</p>
              <svg viewBox="0 0 120 52" className="mt-3 h-14 w-full" aria-hidden="true">
                <path
                  data-line
                  d="M0 22C14 18 20 28 34 22s20-10 32-4 22 10 34 2 14-6 20-8"
                  fill="none"
                  stroke="#ffa487"
                  strokeWidth="1.4"
                />
                <path
                  data-line
                  d="M0 40C16 42 24 36 40 40s24-6 40-2 28 4 40-2"
                  fill="none"
                  stroke="#8f86f5"
                  strokeWidth="1.4"
                />
              </svg>
            </div>
            <div className="rounded-lg bg-night-card p-2.5">
              <p className="text-[0.5rem] uppercase tracking-wider text-ink-400">System utilization</p>
              <div className="mt-2 flex justify-around">
                {[68, 74, 41].map((pct) => (
                  <svg key={pct} viewBox="0 0 36 36" className="h-9 w-9" aria-hidden="true">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#2c2f44" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#ff6b4a"
                      strokeWidth="4"
                      strokeLinecap="round"
                      pathLength="100"
                      strokeDasharray={`${pct} 100`}
                      transform="rotate(-90 18 18)"
                    />
                    <text x="18" y="21" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">
                      {pct}%
                    </text>
                  </svg>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-night-card p-2.5">
              <p className="text-[0.5rem] uppercase tracking-wider text-ink-400">Deployment frequency</p>
              <div className="mt-2 flex h-12 items-end gap-[3px]" aria-hidden="true">
                {BARS.map((height, index) => (
                  <span
                    key={index}
                    data-bar
                    className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-brand-400"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </GrowBars>

        <div className="mt-4 grid grid-cols-2 gap-4 pb-1">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink-400">{card.dataFlowLabel}</p>
            <p className="mt-1 text-lg font-bold text-ink-900">{card.dataFlowValue}</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink-400">{card.integrationsLabel}</p>
            <p className="mt-1 text-lg font-bold text-ink-900">{card.integrationsValue}</p>
          </div>
        </div>
      </div>

      <Float amount={8} duration={5} className="absolute -bottom-10 right-0 w-[78%] sm:-right-6 sm:w-[62%]">
        <div className="rounded-2xl border border-white/70 bg-white/60 p-4 text-xs leading-relaxed text-ink-700 shadow-xl shadow-ink-900/10 backdrop-blur-xl">
          <p className="font-bold uppercase tracking-wide text-ink-900">{card.chip.title}</p>
          <p className="mt-1.5">{card.chip.lines[0]}</p>
          <p>{card.chip.lines[1]}</p>
          <p>{card.chip.lines[2]}</p>
        </div>
      </Float>
    </div>
  );
}

/** Glass hero: headline rises line by line, the dashboard resolves out of a blur. */
export function WaHero() {
  const hero = webApplications.hero;

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-200/60">
      <GlassBackdrop />
      <Intro className="container-x grid items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="relative z-10">
          <p data-intro className="eyebrow inline-flex rounded-full bg-brand-50 px-4 py-1.5">
            {hero.eyebrow}
          </p>
          <h1
            data-intro="lines"
            className="mt-7 max-w-xl text-[2.6rem] font-bold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-[4rem]"
          >
            {hero.headline}
          </h1>
          <p data-intro className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600">
            {hero.subhead}
          </p>
          <div data-intro className="mt-9 flex flex-wrap gap-4">
            <Button href={hero.primaryCta.href} variant="coral">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="light">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div data-intro="media" className="relative mb-10 lg:mb-0">
          <DashboardCard />
        </div>
      </Intro>
    </section>
  );
}
