/**
 * Single source of truth for every company fact used across the site.
 *
 * Anything wrapped in square brackets — [LIKE_THIS] — is a placeholder I could
 * not verify. Replace all of them before launch: they appear in visible copy,
 * in <meta> tags and in the JSON-LD structured data Google reads, so a wrong
 * value here becomes a wrong value in search results.
 *
 * Grep for "[" in this file to find everything still outstanding.
 */

export const site = {
  /** Brand name as it should read in titles and headings. */
  name: "Infoane",

  /** Registered legal entity — used in the JSON-LD Organization node only. */
  legalName: "[LEGAL_ENTITY_NAME, e.g. Infoane Solutions Pvt. Ltd.]",

  /**
   * Canonical origin, no trailing slash. Everything (canonical tags, sitemap,
   * Open Graph URLs) is derived from this, so it must be the exact hostname you
   * serve on — https + www or non-www, pick one and be consistent.
   *
   * The fallback below is a deliberately obvious placeholder: it parses as a
   * URL (so the build succeeds) but is unmistakable if it ever ships. Set
   * NEXT_PUBLIC_SITE_URL in your environment instead of editing it here.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://REPLACE-ME.example.com",

  /** One-line positioning statement. Also the OG site description fallback. */
  tagline: "IT consulting and custom software development",

  /**
   * Meta description for the homepage. 150–160 characters is the sweet spot —
   * this one is 154.
   */
  description:
    "Infoane is an IT consulting and custom software development company helping enterprises modernize legacy systems, move to the cloud, and ship software faster.",

  /** Year founded — feeds the Organization schema and the footer. */
  foundingYear: "[YYYY]",

  contact: {
    email: "[hello@your-domain.com]",
    /** E.164 format for the tel: link, e.g. +1-555-123-4567 */
    phone: "[+1-000-000-0000]",
    phoneDisplay: "[+1 (000) 000-0000]",
  },

  /**
   * Physical locations. Google needs a real street address to show a business
   * knowledge panel; if you have more than one office, add them here and they
   * all land in the footer and the schema.
   */
  offices: [
    {
      label: "[USA office city]",
      street: "[Street address]",
      city: "[City]",
      region: "[State]",
      postalCode: "[ZIP]",
      country: "[US]", // ISO 3166-1 alpha-2
      phone: "[+1-000-000-0000]",
      phoneDisplay: "[+1 (000) 000-0000]",
      isHeadquarters: true,
    },
    {
      label: "[India office city]",
      street: "[Street address]",
      city: "[City]",
      region: "[State]",
      postalCode: "[PIN]",
      country: "[IN]",
      phone: "[+91-00000-00000]",
      phoneDisplay: "[+91 00000 00000]",
      isHeadquarters: false,
    },
    {
      // Delete this entry if you only have two locations.
      label: "[Second India office city]",
      street: "[Street address]",
      city: "[City]",
      region: "[State]",
      postalCode: "[PIN]",
      country: "[IN]",
      phone: "[+91-00000-00000]",
      phoneDisplay: "[+91 00000 00000]",
      isHeadquarters: false,
    },
  ],

  /**
   * Delete any network you do not actively post on — a dead profile linked from
   * every page is worse than no link. Order here is the order in the footer.
   */
  social: {
    linkedin: "https://www.linkedin.com/company/[handle]",
    x: "https://x.com/[handle]",
    facebook: "https://www.facebook.com/[handle]",
    instagram: "https://www.instagram.com/[handle]",
  },

  /**
   * Proof points shown in the hero trust bar. Numbers must be defensible —
   * inflated claims are the fastest way to lose an enterprise buyer, and in
   * some markets they are actionable advertising claims.
   */
  stats: [
    { value: "[XX]+", label: "Enterprise clients served" },
    { value: "[XXX]+", label: "Projects delivered" },
    { value: "[XX]", label: "Engineers on staff" },
    { value: "[XX]%", label: "Client retention rate" },
  ],

  /**
   * Commitments made in the hero and the closing CTA. Kept here rather than
   * inline in the components so every promise the site makes is visible in one
   * place — and so nobody has to hunt through JSX to correct one.
   */
  promises: {
    consultationLength: "[30] minutes",
    discoveryLength: "[2] weeks",
    responseTime: "[one business day]",
  },

  /** Certifications and partner badges — strong trust and E-E-A-T signals. */
  credentials: [
    "[ISO 27001 certified]",
    "[SOC 2 Type II]",
    "[Microsoft Solutions Partner]",
    "[AWS Advanced Tier Partner]",
  ],

  /** Verification tokens. Leave empty strings until you have them. */
  verification: {
    google: "", // Search Console HTML tag content value
    bing: "",
  },
} as const;

export type Site = typeof site;
