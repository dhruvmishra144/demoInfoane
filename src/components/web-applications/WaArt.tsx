/**
 * Illustrations for the "what we build" cards, drawn in SVG so no photography
 * has to be invented. Decorative: the card text carries the meaning.
 */

/* Enterprise portal: a light, desk-lit admin screen. */
export function PortalArt() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wa-portal-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eceff4" />
          <stop offset="1" stopColor="#d9dee8" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#wa-portal-bg)" />
      <rect x="52" y="14" width="216" height="124" rx="6" fill="#1b1d2b" />
      <rect x="56" y="18" width="208" height="116" rx="4" fill="#fff" />
      <rect x="56" y="18" width="30" height="116" rx="4" fill="#14151f" />
      {[32, 44, 56, 68].map((y) => (
        <rect key={y} x="63" y={y} width="16" height="4" rx="2" fill="#4b4e63" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={94 + i * 42} y="26" width="36" height="16" rx="3" fill={i === 1 ? "#ffe6dd" : "#eef0f5"} />
      ))}
      <rect x="94" y="50" width="62" height="40" rx="3" fill="#e4eaf3" />
      <path d="M98 82c10-14 20-4 30-12s16-8 24-14" stroke="#ff6b4a" strokeWidth="1.6" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="164" y={52 + i * 12} width="94" height="7" rx="1.5" fill="#f3f4f8" />
          <rect x="168" y={54.5 + i * 12} width="30" height="2" rx="1" fill="#b6bac8" />
          <rect x="236" y={54 + i * 12} width="18" height="3" rx="1.5" fill={i % 3 === 0 ? "#ffa487" : "#a8e0bd"} />
        </g>
      ))}
      <rect x="94" y="98" width="62" height="28" rx="3" fill="#f3f4f8" />
      <rect x="140" y="138" width="40" height="6" rx="2" fill="#c3c8d4" />
      <ellipse cx="160" cy="150" rx="70" ry="6" fill="#000" opacity="0.06" />
    </svg>
  );
}

/* E-commerce: parcels riding a conveyor under warm light. */
export function CommerceArt() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wa-com-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1c2c" />
          <stop offset="1" stopColor="#0d0e15" />
        </linearGradient>
        <radialGradient id="wa-com-glow" cx="0.7" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#ff6b4a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff6b4a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="160" fill="url(#wa-com-bg)" />
      <rect width="320" height="160" fill="url(#wa-com-glow)" />
      {/* holographic network */}
      <g stroke="#ff8664" strokeOpacity="0.55" strokeWidth="0.8" fill="none">
        <path d="M120 18 160 40 205 22 240 48 205 22 160 40 120 18 90 44 160 40" />
        <path d="M90 44 130 62 160 40M205 22 235 14M240 48 270 36" />
      </g>
      {[[120, 18], [160, 40], [205, 22], [240, 48], [90, 44], [235, 14]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#ffc9b6" />
      ))}
      {/* robot arm */}
      <g fill="#cfd3de">
        <rect x="196" y="56" width="26" height="40" rx="6" />
        <rect x="186" y="92" width="46" height="14" rx="5" fill="#ff6b4a" />
      </g>
      <rect x="212" y="30" width="8" height="30" fill="#8a90a3" />
      {/* conveyor */}
      <path d="M0 126 320 104V160H0Z" fill="#22243a" />
      <path d="M0 126 320 104" stroke="#ff6b4a" strokeWidth="2" strokeOpacity="0.8" />
      {[
        [24, 108, 34],
        [76, 102, 30],
        [128, 100, 38],
        [250, 80, 30],
      ].map(([x, y, s]) => (
        <g key={x}>
          <rect x={x} y={y} width={s} height={s * 0.78} rx="2" fill="#b98a5e" />
          <rect x={x} y={y} width={s} height={s * 0.18} fill="#d7a874" />
          <rect x={x + s / 2 - 2} y={y} width="4" height={s * 0.78} fill="#f1d9b5" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/* API-driven: glowing circuit traces joining node blocks. */
export function ApiArt() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="wa-api-bg" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#3a1d17" />
          <stop offset="1" stopColor="#0d0e15" />
        </radialGradient>
      </defs>
      <rect width="320" height="160" fill="url(#wa-api-bg)" />
      <g stroke="#ff6b4a" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 40h60l20 20h50l20 20" />
        <path d="M320 36h-70l-24 24h-30" strokeOpacity="0.8" />
        <path d="M0 120h70l24-24h40" strokeOpacity="0.8" />
        <path d="M320 124h-60l-26-26h-36" />
        <path d="M160 0v50M160 160v-50" strokeOpacity="0.7" />
        <path d="M30 80h60M230 80h60" strokeOpacity="0.5" />
      </g>
      <g>
        <rect x="132" y="58" width="56" height="44" rx="5" fill="#2a1a18" stroke="#ff8664" strokeWidth="1.4" />
        <rect x="142" y="68" width="14" height="24" rx="2" fill="#ff6b4a" />
        <rect x="160" y="74" width="14" height="18" rx="2" fill="#ffa487" />
        <rect x="177" y="68" width="6" height="24" rx="2" fill="#ff6b4a" opacity="0.7" />
      </g>
      {[[60, 40], [130, 80], [250, 60], [94, 96], [234, 98], [160, 50]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fill="#ffc9b6" />
      ))}
      <path d="M0 80h20M300 80h20" stroke="#ffa487" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}
