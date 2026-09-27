export type StepIconName = "scan" | "team" | "launch";

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
