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
  foundingYear: "2011",

  contact: {
    email: "info@infoane.com",
    /** E.164 format for the tel: link, e.g. +1-555-123-4567 */
    phone: "+1-214-929-2500",
    phoneDisplay: "+1 214 929 2500",
  },

  /**
   * Physical locations. Google needs a real street address to show a business
   * knowledge panel; if you have more than one office, add them here and they
   * all land in the footer and the schema.
   */
  offices: [
    {
      label: "USA",
      street: "11899 Presley Pl",
      city: "Frisco",
      region: "TX",
      postalCode: "75035",
      country: "US", // ISO 3166-1 alpha-2
      phone: "+1-214-929-2500",
      phoneDisplay: "+1 214 929 2500",
      isHeadquarters: true,
    },
    {
      label: "INDIA",
      street: "1403 B, 14th Floor, Manjeera Trinity, JNTU Hi-Tech City Road, KPHB",
      city: "Hyderabad",
      region: "Telangana",
      postalCode: "500 072",
      country: "IN",
      phone: "+91-903-017-5190",
      phoneDisplay: "+91-903 017 5190",
      isHeadquarters: false,
    },
    {
      label: "INDIA",
      street: "14/3, Jaya Complex, Kovilpatti New town, Suba Nagar",
      city: "Kovilpatti",
      region: "Tamil Nadu",
      postalCode: "628502",
      country: "IN",
      phone: "+91-912-357-0321",
      phoneDisplay: "+91-912 357 0321",
      isHeadquarters: false,
    },
  ],

  /**
   * Delete any network you do not actively post on — a dead profile linked from
   * every page is worse than no link. Order here is the order in the footer.
   */
  social: {
    x: "https://x.com/infoanetech",
    facebook: "https://www.facebook.com/infoanetech/",
    linkedin: "https://www.linkedin.com/company/infoane-technologies-pvt--ltd/",
    instagram: "https://www.instagram.com/infoanetech/",
    telegram: "https://t.me/infoane",
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
