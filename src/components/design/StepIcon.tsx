export type StepIconName = "scan" | "team" | "launch" | "plan" | "build" | "support";

/**
 * Duotone icons for the "three ways we show up" steps: a coral outline layer
 * over a soft peach fill layer.
 *
 * Animation hooks (driven by StepFocus, see components/motion/effects.tsx):
 *  - `data-draw` strokes draw on when the step first arrives,
 *  - `data-fill` shapes then bloom in behind them,
 *  - `icon-*` groups run an idle loop from globals.css once the step is live
 *    (the lens scans, the teammate pops in, the rocket lifts and its flame
 *    flickers).
 * Decorative only — every icon sits beside a real heading.
 */
const FILL = "fill-brand-200";
const FILL_SOFT = "fill-brand-100";
const FILL_DEEP = "fill-brand-300";

const icons: Record<StepIconName, React.ReactNode> = {
  scan: (
    <>
      {/* Page being inspected */}
      <rect data-fill x="3" y="3" width="15" height="19" rx="3" className={FILL_SOFT} stroke="none" />
      <path data-draw d="M7 8h7M7 12h4" className="stroke-brand-300" />
      <g className="icon-scan">
        <circle data-fill cx="17" cy="17" r="6" className={FILL} stroke="none" />
        <circle data-draw cx="17" cy="17" r="6" />
        <path data-draw d="m21.5 21.5 5 5" strokeWidth="2.6" />
        <path data-draw d="M14.3 15.6a3.2 3.2 0 0 1 2.4-1.8" className="stroke-white" strokeWidth="1.6" />
      </g>
    </>
  ),
  team: (
    <>
      {/* Teammate joining (back) */}
      <g className="icon-pop">
        <circle data-fill cx="21.5" cy="10.5" r="3.6" className={FILL_DEEP} stroke="none" />
        <path data-fill d="M15.5 25c.5-4.4 3-7 6-7s5.6 2.6 6 7Z" className={FILL_DEEP} stroke="none" />
      </g>
      {/* Engineer (front) */}
      <circle data-fill cx="12" cy="9.5" r="4.3" className={FILL} stroke="none" />
      <circle data-draw cx="12" cy="9.5" r="4.3" />
      <path data-fill d="M4 26c.6-5.2 3.8-8.5 8-8.5s7.4 3.3 8 8.5Z" className={FILL} stroke="none" />
      <path data-draw d="M4 26c.6-5.2 3.8-8.5 8-8.5s7.4 3.3 8 8.5" />
      <path data-draw d="M24.5 3.5v4M22.5 5.5h4" strokeWidth="2" />
    </>
  ),
  launch: (
    <g className="icon-lift">
      {/* Fins */}
      <path data-fill d="m10.5 17-4 2.4 1.4 4.6 4.6-3.2ZM21.5 17l4 2.4-1.4 4.6-4.6-3.2Z" className={FILL_DEEP} stroke="none" />
      {/* Body */}
      <path data-fill d="M16 3c4.2 3 6.1 7.6 5.6 13.3L19 20h-6l-2.6-3.7C9.9 10.6 11.8 6 16 3Z" className={FILL} stroke="none" />
      <path data-draw d="M16 3c4.2 3 6.1 7.6 5.6 13.3L19 20h-6l-2.6-3.7C9.9 10.6 11.8 6 16 3Z" />
      <path data-draw d="m10.5 17-4 2.4 1.4 4.6 4.6-3.2M21.5 17l4 2.4-1.4 4.6-4.6-3.2" />
      {/* Window */}
      <circle data-fill cx="16" cy="11" r="2.4" className="fill-white" stroke="none" />
      <circle data-draw cx="16" cy="11" r="2.4" />
      {/* Flame */}
      <path d="M14 21.5h4l-2 6Z" className="icon-flame fill-brand-400" stroke="none" />
    </g>
  ),
  plan: (
    <>
      {/* Board with a route and a pulsing waypoint */}
      <rect data-fill x="3" y="4" width="24" height="22" rx="3" className={FILL_SOFT} stroke="none" />
      <rect data-draw x="3" y="4" width="24" height="22" rx="3" />
      <path data-draw d="M8 21c3.5 0 3-8 7-8s3.5 8 7 8" />
      <circle data-fill cx="8" cy="21" r="2.2" className={FILL_DEEP} stroke="none" />
      <circle data-fill cx="22" cy="21" r="2.2" className={FILL_DEEP} stroke="none" />
      <circle className="icon-pop fill-brand-500" cx="15" cy="9.5" r="2.4" stroke="none" />
    </>
  ),
  build: (
    <>
      {/* Code window with brackets that breathe */}
      <rect data-fill x="3" y="5" width="24" height="20" rx="3" className={FILL_SOFT} stroke="none" />
      <rect data-draw x="3" y="5" width="24" height="20" rx="3" />
      <path data-draw d="M3 10.5h24" />
      <path data-draw d="m16.6 14-3.2 7.5" className="stroke-brand-300" />
      <path className="icon-nudge-l" d="m10.5 14.5-3 3.2 3 3.2" />
      <path className="icon-nudge-r" d="m19.5 14.5 3 3.2-3 3.2" />
    </>
  ),
  support: (
    <>
      {/* Two arrows chasing each other round a steady centre */}
      <circle data-fill cx="15" cy="15" r="4.2" className={FILL} stroke="none" />
      <circle className="icon-pop fill-brand-500" cx="15" cy="15" r="1.8" stroke="none" />
      <g className="icon-spin">
        <path data-draw d="M5.5 15a9.5 9.5 0 0 1 16.8-6.1M23.5 4.5v5h-5" />
        <path data-draw d="M24.5 15a9.5 9.5 0 0 1-16.8 6.1M6.5 25.5v-5h5" />
      </g>
    </>
  ),
};

export function StepIcon({ name }: { name: StepIconName }) {
  return (
    <svg
      viewBox="0 0 30 30"
      className="h-9 w-9 overflow-visible stroke-brand-600"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
