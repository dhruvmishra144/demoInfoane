# Infotech — website

Marketing site for Infotech, an IT consulting and custom software development
company. Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind
CSS v4. Fifteen pages, all statically prerendered.

## Design system

Blue-and-white theme derived from the Infoane logo: a bright cyan-blue
(`--color-brand-500: #1e97e5`) running into a deep navy (`--color-brand-950:
#0a2540`), on white and a very light blue-grey. Neutrals are blue-tinted so no
grey reads warm next to the blue. Every token lives in one `@theme` block in
[globals.css](src/app/globals.css).

Layout follows the reference design (grovia.framer.ai): a floating pill header,
generous section rhythm, rounded cards, and pill buttons with a circular icon
chip. Two structural rules:

- **Everything sits inside `container-x`** (max-width 88rem / 1408px). The header
  is a pill *within* that container, and its mega panel spans the container width.
- **No section bleeds to the viewport edge.** The dark "wide" sections — the
  engagement panel, page heroes, CTA bands, footer — are rounded panels inside the
  container, so their left and right edges line up with every other section.

### Motion

| Effect | Implementation |
| --- | --- |
| Scroll reveal (fade + rise, with stagger) | [Reveal.tsx](src/components/ui/Reveal.tsx) — one IntersectionObserver per element flips `data-reveal="in"`; the transition itself is CSS |
| Logo marquee | CSS-only, duplicated track translated -50%, pauses on hover |
| Card hover lift | CSS transitions on transform/border/shadow |
| Tab switchers | Real `tablist` with arrow-key support ([Capabilities](src/components/sections/Capabilities.tsx), [EngagementModels](src/components/sections/EngagementModels.tsx)) |
| FAQ accordion | `<details>` + `grid-template-rows: 0fr → 1fr`, no JS |
| Hero card float | CSS keyframes, decorative only |

The reveal CSS is wrapped in `@media (scripting: enabled)`. Only JavaScript can
flip an element to revealed, so if scripting is unavailable the rules must not
apply — otherwise content would sit at `opacity: 0` forever. Browsers without
that media feature also skip the block, failing in the safe direction. Every
animation is disabled under `prefers-reduced-motion`.

**Before you launch, work through [CONTENT-TODO.md](CONTENT-TODO.md).** The site
ships with clearly-marked placeholders instead of invented facts; publishing them
would be worse than publishing nothing.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

> **Never mix `npm run build` and `npm run dev` against the same `.next`.** They
> share the directory, and either order corrupts it: a build during dev overwrites
> the dev server's chunks, and starting dev on top of a production build leaves it
> serving a manifest whose files do not exist. Symptom is every route 500ing with
> `ENOENT … .next/server/app/(site)/page.js`. Fix:
>
> ```bash
> rm -r .next && npm run dev
> ```

### Environment

Create `.env.local` with the canonical origin of the live site — no trailing
slash, no path:

```bash
echo 'NEXT_PUBLIC_SITE_URL=https://www.your-domain.com' > .env.local
```

Everything SEO-related derives from this value: canonical tags, sitemap URLs,
Open Graph URLs and the JSON-LD `@id`s. Until it is set, the site falls back to
`https://REPLACE-ME.example.com` so a misconfiguration is impossible to miss.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (fails on type errors) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check:placeholders` | Fails while any `[PLACEHOLDER]` remains — wire into CI |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about` | Company, principles, leadership, offices |
| `/services` | Services index |
| `/services/[slug]` | Six service pages, statically generated |
| `/industries` | Six sectors with the constraints each brings |
| `/technology` | Stack by layer, plus selection criteria |
| `/case-studies` | Engagement write-ups and testimonials |
| `/careers` | Openings, benefits, hiring process |
| `/contact` | Contact routes and office details |
| `/privacy-policy`, `/terms` | Legal skeletons — **noindexed** until real text lands |
| `404` | Custom not-found page with routes onward |

### Navigation

Nine destinations are clubbed into three desktop mega menus plus Home, so the
header pill stays compact and nothing is more than one hover away:

| Trigger | Panel contents |
| --- | --- |
| **Services** ▾ | Six service pages in two labelled columns, plus a dark promo card |
| **Industries** ▾ | Six sectors in two columns, deep-linking to their sections |
| **Company** ▾ | About Us, Case Studies, Careers / Technology, All Services, Contact Us |

Plus a **Contact us** CTA pill. On mobile the same structure becomes a drawer with
nested accordions. Triggers are real `<button>`s with `aria-expanded`/
`aria-controls`; hover opens as a convenience but is never the only way in;
Escape closes and returns focus; a short close delay covers the diagonal travel
from trigger to panel.

The footer carries newsletter signup, Pages / Services / per-office contact
columns, an oversized email address, and a copyright bar.

## Where things live

```
src/
├── config/site.ts        Every company fact: name, contact, offices, stats,
│                         credentials, promises. Placeholders live here.
├── content/
│   ├── services.ts       Full copy for the six service pages (also feeds the
│   │                     homepage cards, header dropdown and footer)
│   ├── pages.ts          Copy for about, industries, technology, case studies,
│   │                     careers and contact
│   └── home.ts           Homepage sections: process, case studies, FAQs
├── lib/
│   ├── routes.ts         URL map, nav definitions, link helpers
│   └── schema.ts         JSON-LD: siteSchema() + pageSchema()
├── app/                  One directory per route; layout.tsx holds site-wide
│                         metadata, sitemap.ts and robots.ts are generated
└── components/
    ├── sections/         Homepage sections
    ├── ui/               Section shell, Button, icon set
    ├── SiteHeader.tsx    Server component; builds nav data
    ├── SiteNav.tsx       Client component; dropdown + mobile drawer
    ├── SiteFooter.tsx    Four-column footer
    ├── PageHero.tsx      Inner-page hero with visible breadcrumbs
    └── CtaBand.tsx       Closing CTA used across inner pages
```

Adding a service page means adding one entry to `src/content/services.ts` — the
route, the header dropdown, the footer, the homepage cards, the sitemap and the
JSON-LD service catalogue all pick it up automatically.

## SEO implementation notes

Deliberate choices worth knowing before you change them:

- **One `h1` per page**, and a distinct `<title>` and meta description on every
  route. Near-duplicate metadata across pages is the most common reason a
  multipage site underperforms a single page.
- **Canonical URL on every page**, derived from `metadataBase`, so all generated
  URLs are absolute.
- **JSON-LD in two layers**: `siteSchema()` emits Organization and WebSite once
  from the root layout; each page emits its own WebPage (or AboutPage /
  ContactPage / CollectionPage), BreadcrumbList, and — on service pages — Service
  and FAQPage nodes, referencing the Organization by `@id`.
- **Visible breadcrumbs plus BreadcrumbList markup** on every inner page.
- **FAQ answers are in the HTML** whether or not the accordion is open — that is
  what makes them eligible for rich results and for citation in AI answers. Never
  put a question in the schema that is not visible on the page.
- **No `AggregateRating` markup.** Google prohibits self-serving review markup for
  your own business; using it risks a manual action.
- **No `JobPosting` markup yet** on `/careers`. Placeholder roles with no salary
  and no valid `datePosted` would be invalid markup; add it per role once the
  openings are real.
- **The sitemap lists only indexable URLs that return 200** — the legal pages are
  noindexed, so they are excluded. It is generated from `routes.ts`, so links and
  sitemap entries cannot drift apart.
- **`dynamicParams = false`** on `/services/[slug]`, so an unknown slug 404s
  rather than rendering — the set of live URLs exactly matches the sitemap.
- **AI crawlers are allowed** in `robots.ts`. For a B2B services firm, being
  citable usually beats blocking; add explicit `userAgent` disallow rules there if
  you decide otherwise.
- **Almost zero client JS.** Every page section is a server component; the only
  client component is the navigation. FAQ accordions are `<details>`, so they need
  no JavaScript at all.
- **No web font.** A system font stack avoids a render-blocking request and a
  layout shift. If brand requires a specific typeface, add it with `next/font`
  (which self-hosts it and reserves metrics) rather than a `<link>` to Google
  Fonts.

## Accessibility

Skip link, `lang="en"`, landmark `<section>`s wired to their headings with
`aria-labelledby`, visible focus rings, decorative SVGs hidden from assistive
tech, `aria-current="page"` on the active nav item, and a
`prefers-reduced-motion` guard on every animation.

The dropdown is a real `<button>` with `aria-expanded`/`aria-controls`; Escape
closes it and returns focus to the trigger; hover is a convenience, never the
only way in.

**Verified:** production build and typecheck pass; all 16 routes return the right
status (including a real 404); 16/16 unique titles and one `h1` each; zero broken
internal links across 17 unique targets; no horizontal overflow at 375px on any
page; clean console with no hydration warnings; mega menu and mobile drawer ARIA
states correct; reveal elements in the initial viewport animate in and the
`scripting: enabled` gate is active.

**Not verified:** Lighthouse scores, an automated axe pass, and scroll-triggered
reveals firing further down the page — IntersectionObserver is throttled in the
preview environment used to build this (a control observer failed to fire either),
so please confirm the scroll animations in a normal browser.

## Deploying

Any Node host works; every route prerenders to static output.

- **Vercel**: import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy.
- **Anywhere else**: `npm run build && npm start` behind a reverse proxy.

Pick www or non-www, redirect the other with a 301, and serve HTTPS only —
`next.config.ts` already sends HSTS.
