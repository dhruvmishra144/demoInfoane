import { Reveal } from "../ui/Reveal";

/**
 * Large product mock.
 *
 * Built from markup and CSS rather than a screenshot, so it costs no image
 * bandwidth, stays sharp on any display, and never needs re-exporting when the
 * palette changes. The whole thing is decorative and hidden from assistive
 * technology — nothing here is information a screen-reader user needs.
 *
 * Replace it with a real product or dashboard screenshot when you have one.
 */
export function Showcase() {
  return (
    <section aria-hidden="true" className="bg-white pb-4">
      <div className="container-x">
        <Reveal scale>
          <div className="overflow-hidden rounded-4xl border border-ink-200 bg-ink-50 p-2 shadow-2xl shadow-brand-950/10 lg:p-3">
            <div className="overflow-hidden rounded-3xl bg-white">
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-ink-100 bg-ink-50/80 px-4 py-3">
                <div className="flex gap-1.5">
                  {["bg-ink-300", "bg-ink-300", "bg-ink-300"].map((tone, index) => (
                    <span key={index} className={`h-2.5 w-2.5 rounded-full ${tone}`} />
                  ))}
                </div>
                <div className="mx-auto flex w-full max-w-xs items-center justify-center rounded-full bg-white px-3 py-1 text-[11px] text-ink-400 ring-1 ring-ink-200">
                  delivery.infotech.internal
                </div>
              </div>

              <div className="grid lg:grid-cols-[13rem_1fr]">
                {/* Sidebar */}
                <div className="hidden border-r border-ink-100 p-4 lg:block">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700" />
                    <span className="text-sm font-semibold text-ink-900">Delivery</span>
                  </div>
                  <ul className="mt-6 space-y-1">
                    {["Overview", "Sprints", "Environments", "Incidents", "Reports"].map(
                      (item, index) => (
                        <li
                          key={item}
                          className={`rounded-lg px-3 py-2 text-xs font-medium ${
                            index === 1
                              ? "bg-brand-50 text-brand-700"
                              : "text-ink-500"
                          }`}
                        >
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                  <div className="mt-8 rounded-xl bg-ink-50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                      Uptime
                    </p>
                    <p className="mt-1 text-lg font-bold text-ink-900">99.9%</p>
                  </div>
                </div>

                {/* Main panel */}
                <div className="p-5 lg:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-ink-900">
                        Sprint 14 — Payments modernisation
                      </p>
                      <p className="mt-1 text-xs text-ink-400">
                        6 of 9 stories accepted · demo Friday
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                      On track
                    </span>
                  </div>

                  {/* Stat tiles */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Deploys this week", value: "18" },
                      { label: "Test coverage", value: "87%" },
                      { label: "Lead time", value: "2.4d" },
                    ].map((tile) => (
                      <div
                        key={tile.label}
                        className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                          {tile.label}
                        </p>
                        <p className="mt-1.5 text-2xl font-bold text-ink-900">
                          {tile.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart + list */}
                  <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-2xl border border-ink-100 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-ink-700">
                          Throughput
                        </p>
                        <p className="text-[10px] text-ink-400">last 8 sprints</p>
                      </div>
                      <div className="mt-4 flex h-28 items-end gap-2">
                        {[42, 51, 47, 63, 58, 74, 69, 86].map((height, index) => (
                          <span
                            key={index}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-brand-100 to-brand-500"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-ink-100 p-4">
                      <p className="text-xs font-semibold text-ink-700">
                        This sprint
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {[
                          { name: "Ledger reconciliation", state: "Accepted" },
                          { name: "Payout webhooks", state: "In review" },
                          { name: "Audit log export", state: "In progress" },
                        ].map((row) => (
                          <li
                            key={row.name}
                            className="flex items-center justify-between gap-3 text-[11px]"
                          >
                            <span className="truncate text-ink-600">{row.name}</span>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 font-semibold ${
                                row.state === "Accepted"
                                  ? "bg-brand-50 text-brand-700"
                                  : "bg-ink-100 text-ink-500"
                              }`}
                            >
                              {row.state}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
