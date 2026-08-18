/**
 * Inline SVG icon set. Inline rather than an icon library so there is no extra
 * network request and no client JavaScript — both count towards Core Web Vitals.
 *
 * All icons are decorative: they sit next to a real text label, so they are
 * hidden from assistive technology.
 */

type IconProps = { className?: string };

const base = "h-6 w-6";

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className ?? base}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const icons = {
  code: (p: IconProps) => (
    <Svg {...p}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </Svg>
  ),
  cloud: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7 18a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.4 9.5A3.75 3.75 0 0 1 17 18H7Z" />
    </Svg>
  ),
  refresh: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" />
    </Svg>
  ),
  data: (p: IconProps) => (
    <Svg {...p}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </Svg>
  ),
  spark: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
      <path d="M18 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </Svg>
  ),
  team: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.9M17.5 20a5.5 5.5 0 0 0-2-4.3" />
    </Svg>
  ),
  arrow: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  ),
  check: (p: IconProps) => (
    <Svg {...p}>
      <path d="m5 13 4 4L19 7" />
    </Svg>
  ),
  shield: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 3l7 3v5.5c0 4.4-2.9 8.3-7 9.5-4.1-1.2-7-5.1-7-9.5V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  chevron: (p: IconProps) => (
    <Svg {...p}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  ),
  mail: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
  ),
  phone: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2A2 2 0 0 1 5 3Z" />
    </Svg>
  ),
  pin: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  ),
} as const;

export type IconName = keyof typeof icons;

/**
 * Social glyphs are filled rather than stroked, so they are kept separate from
 * the stroked UI icon set above.
 */
function BrandSvg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className ?? "h-4 w-4"}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const socialIcons = {
  linkedin: (p: IconProps) => (
    <BrandSvg {...p}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.2 8.4h3.5V21H3.2V8.4Zm5.7 0h3.36v1.72h.05c.47-.86 1.6-1.77 3.3-1.77 3.53 0 4.18 2.2 4.18 5.05V21h-3.5v-6.06c0-1.44-.26-2.9-2-2.9-1.7 0-1.9 1.25-1.9 2.81V21H8.9V8.4Z" />
    </BrandSvg>
  ),
  x: (p: IconProps) => (
    <BrandSvg {...p}>
      <path d="M17.5 3h3.1l-6.8 7.8L21.5 21h-5.6l-4.4-5.7L6.2 21H3.1l7.1-8.1L2.9 3h5.7l4.1 5.4L17.5 3Zm-1.1 16h1.7L7.6 4.7H5.8L16.4 19Z" />
    </BrandSvg>
  ),
  facebook: (p: IconProps) => (
    <BrandSvg {...p}>
      <path d="M14 9h2.5V6H14c-2.2 0-3.6 1.5-3.6 3.8V11H8.5v3h1.9v7h3v-7h2.3l.4-3h-2.7V9.9c0-.6.3-.9.6-.9Z" />
    </BrandSvg>
  ),
  instagram: (p: IconProps) => (
    <BrandSvg {...p}>
      <path d="M12 2.2c-2.7 0-3 0-4 .06-1.1.05-1.8.22-2.4.46a4 4 0 0 0-1.5.98 4 4 0 0 0-.98 1.5c-.24.6-.4 1.3-.46 2.4C2.6 8.6 2.6 8.9 2.6 12s0 3.4.06 4.4c.05 1.1.22 1.8.46 2.4a4 4 0 0 0 .98 1.5 4 4 0 0 0 1.5.98c.6.24 1.3.4 2.4.46 1 .05 1.3.06 4 .06s3 0 4-.06c1.1-.05 1.8-.22 2.4-.46a4.3 4.3 0 0 0 2.48-2.48c.24-.6.4-1.3.46-2.4.05-1 .06-1.3.06-4.4s0-3.4-.06-4.4c-.05-1.1-.22-1.8-.46-2.4a4 4 0 0 0-.98-1.5 4 4 0 0 0-1.5-.98c-.6-.24-1.3-.4-2.4-.46-1-.05-1.3-.06-4-.06Zm0 1.98c2.67 0 2.98 0 4 .06.92.04 1.4.2 1.74.32.44.17.75.37 1.08.7.33.33.53.64.7 1.08.13.33.28.82.32 1.74.05 1 .06 1.3.06 3.92s0 2.92-.06 3.92c-.04.92-.2 1.4-.32 1.74-.17.44-.37.75-.7 1.08-.33.33-.64.53-1.08.7-.33.13-.82.28-1.74.32-1 .05-1.3.06-4 .06s-2.98 0-4-.06c-.92-.04-1.4-.2-1.74-.32a2.9 2.9 0 0 1-1.08-.7 2.9 2.9 0 0 1-.7-1.08c-.13-.33-.28-.82-.32-1.74-.05-1-.06-1.3-.06-3.92s0-2.92.06-3.92c.04-.92.2-1.4.32-1.74.17-.44.37-.75.7-1.08.33-.33.64-.53 1.08-.7.33-.13.82-.28 1.74-.32 1-.05 1.33-.06 4-.06Zm0 3.36a4.46 4.46 0 1 0 0 8.92 4.46 4.46 0 0 0 0-8.92Zm0 7.36a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm5.68-7.55a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0Z" />
    </BrandSvg>
  ),
} as const;

export type SocialNetwork = keyof typeof socialIcons;
