import type { IconName } from "@/content/redesign";
import { DesignIcon } from "./DesignIcon";

/**
 * Duotone icons for the homepage service cards, in the StepIcon style: a coral
 * outline layer over soft peach fills, with one moving part each.
 *
 * Animation hooks (driven by IconDrawIn, see components/motion/effects.tsx):
 *  - `data-draw` strokes draw on when the card first scrolls in,
 *  - `data-fill` shapes then bloom in behind them,
 *  - `icon-*` groups run an idle loop from globals.css once the card is live
 *    (code types out, the notification pops, the lens scans, the drive lights
 *    blink, the deploy arrow rises, the bars grow, the brackets breathe, the
 *    shield beats).
 * Decorative only — every icon sits beside the service's heading.
 */
const FILL = "fill-brand-200";
const FILL_SOFT = "fill-brand-100";

const icons: Partial<Record<IconName, React.ReactNode>> = {
  monitor: (
    <>
      <rect data-fill x="3" y="4" width="24" height="16" rx="2.5" className={FILL_SOFT} stroke="none" />
      <rect data-draw x="3" y="4" width="24" height="16" rx="2.5" />
      <path data-draw d="M11 26h8M15 20v6" />
      <g className="icon-type stroke-brand-400" strokeWidth="1.8">
        <path d="M7.5 9h7" />
        <path d="M7.5 12.5h11" />
        <path d="M7.5 16h5" />
      </g>
      <rect className="icon-blink fill-brand-500" x="14" y="14.6" width="1.6" height="2.8" rx="0.4" stroke="none" />
    </>
  ),
  phone: (
    <>
      <rect data-fill x="8" y="2.5" width="14" height="25" rx="3.5" className={FILL_SOFT} stroke="none" />
      <rect data-fill x="10.5" y="6" width="9" height="15" rx="1.2" className={FILL} stroke="none" />
      <rect data-draw x="8" y="2.5" width="14" height="25" rx="3.5" />
      <path data-draw d="M13.5 24.2h3" />
      <circle className="icon-pop fill-brand-500" cx="22" cy="6" r="3.2" stroke="none" />
    </>
  ),
  check: (
    <>
      <rect data-fill x="4.5" y="4" width="16" height="21" rx="2.5" className={FILL_SOFT} stroke="none" />
      <rect data-draw x="4.5" y="4" width="16" height="21" rx="2.5" />
      <path data-draw d="m8.5 11 2 2 3.5-3.5M8.5 18l2 2 3.5-3.5" />
      <g className="icon-scan">
        <circle data-fill cx="21.5" cy="20" r="4.6" className={FILL} stroke="none" />
        <circle data-draw cx="21.5" cy="20" r="4.6" />
        <path data-draw d="m24.9 23.4 3 3" strokeWidth="2.4" />
      </g>
    </>
  ),
  database: (
    <>
      <path data-fill d="M6 7v16c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V7Z" className={FILL_SOFT} stroke="none" />
      <ellipse data-fill cx="15" cy="7" rx="9" ry="3.5" className={FILL} stroke="none" />
      <ellipse data-draw cx="15" cy="7" rx="9" ry="3.5" />
      <path data-draw d="M6 7v16c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V7M6 15c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5" />
      <g className="icon-pulse fill-brand-500" stroke="none">
        <circle cx="19.5" cy="13" r="1.1" />
        <circle cx="19.5" cy="21" r="1.1" />
      </g>
    </>
  ),
  cloud: (
    <>
      <path
        data-fill
        d="M8.75 22.5a5.6 5.6 0 0 1-.75-11.2A7.5 7.5 0 0 1 22.5 11.9a5.3 5.3 0 0 1-.6 10.6H8.75Z"
        className={FILL_SOFT}
        stroke="none"
      />
      <path data-draw d="M8.75 22.5a5.6 5.6 0 0 1-.75-11.2A7.5 7.5 0 0 1 22.5 11.9a5.3 5.3 0 0 1-.6 10.6H8.75Z" />
      <g className="icon-rise stroke-brand-500" strokeWidth="2.2">
        <path d="M15 21v-7.5" />
        <path d="m12 16.3 3-3 3 3" />
      </g>
    </>
  ),
  chart: (
    <>
      <rect data-fill x="3" y="3" width="24" height="24" rx="3" className={FILL_SOFT} stroke="none" />
      <rect data-draw x="3" y="3" width="24" height="24" rx="3" />
      <path data-draw d="M7.5 23h15" />
      <g className="icon-bars" stroke="none">
        <rect x="8.5" y="15" width="3.2" height="8" rx="1" className="fill-brand-400" />
        <rect x="13.4" y="9.5" width="3.2" height="13.5" rx="1" className="fill-brand-500" />
        <rect x="18.3" y="12.5" width="3.2" height="10.5" rx="1" className="fill-brand-300" />
      </g>
    </>
  ),
  code: (
    <>
      <rect data-fill x="3" y="5" width="24" height="20" rx="3" className={FILL_SOFT} stroke="none" />
      <rect data-draw x="3" y="5" width="24" height="20" rx="3" />
      <path data-draw d="M3 10h24" />
      <path d="m16.6 13.5-3.2 7.5" className="stroke-brand-400" />
      <path className="icon-nudge-l" d="m10.5 14-3 3.2 3 3.2" />
      <path className="icon-nudge-r" d="m19.5 14 3 3.2-3 3.2" />
    </>
  ),
  shield: (
    <g className="icon-beat">
      <path
        data-fill
        d="M15 3 6 6.8v6.7c0 5.4 3.8 10.1 9 11.8 5.2-1.7 9-6.4 9-11.8V6.8L15 3Z"
        className={FILL}
        stroke="none"
      />
      <path data-draw d="M15 3 6 6.8v6.7c0 5.4 3.8 10.1 9 11.8 5.2-1.7 9-6.4 9-11.8V6.8L15 3Z" />
      <path data-draw d="m10.8 14.6 3 3 5.4-6.1" strokeWidth="2.4" />
    </g>
  ),
};

export function ServiceIcon({ name }: { name: IconName }) {
  const icon = icons[name];
  if (!icon) return <DesignIcon name={name} className="h-6 w-6 text-brand-600" />;
  return (
    <svg
      viewBox="0 0 30 30"
      className="h-8 w-8 overflow-visible stroke-brand-600"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icon}
    </svg>
  );
}
