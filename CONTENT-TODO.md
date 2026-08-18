# What I need from you

The site is built and working — 15 pages, all prerendered, in the blue-and-white
theme from your logo with the reference design's layout and animation. What it does
not have is facts about your company; I have not invented any. Every gap is marked
`[LIKE_THIS]`, and `npm run check:placeholders` lists them all (128 right now).

```bash
npm run check:placeholders
```

They live in four files:

| File | Placeholders | What it holds |
| --- | --- | --- |
| `src/config/site.ts` | 40 | Company facts: contact, offices, stats, credentials |
| `src/content/pages.ts` | 45 | About, industries, technology, careers, contact copy |
| `src/content/home.ts` | 36 | Case studies, testimonials, FAQs, engagement rates |
| `src/content/services.ts` | 6 | Timeframes and price bands in service FAQs |

---

## 1. Blockers — the site should not go live without these

| # | What | Where it ends up | Why it blocks |
| --- | --- | --- | --- |
| 1 | **Live domain** (www or non-www — pick one) | `NEXT_PUBLIC_SITE_URL` | Canonical tags, sitemap, Open Graph and JSON-LD all derive from it. Wrong value = duplicate content and broken social previews. |
| 2 | **Legal entity name** | Footer, JSON-LD | Copyright line and structured data. |
| 3 | **Contact email + one phone number per office** (E.164, e.g. `+1-555-123-4567`) | Header CTA, contact page, footer | Live `mailto:`/`tel:` links and the only conversion path today. |
| 4 | **Full address for each office** | Footer, `/contact`, `/about`, JSON-LD | Required for a Google business knowledge panel and local search. The footer ships with three office slots (USA + two India) mirroring the layout you asked for — **delete the ones you do not have**. Keep the details byte-identical everywhere they appear online. |
| 5 | **Year founded** | `/about` timeline, JSON-LD `foundingDate` | |
| 6 | **Which certifications you actually hold** | Hero badge, footer, FAQ | Currently claims ISO 27001, SOC 2 Type II, Microsoft and AWS partner status. **Delete any you do not hold** — false certification claims are a legal problem, not just an SEO one. |
| 7 | **Privacy policy and terms text** | `/privacy-policy`, `/terms` | Both pages exist as section-by-section skeletons and are **noindexed** until filled. Both are legally required in most markets before you run ads or collect form data, and they need a qualified reviewer — I have listed what each section must cover but I am not able to draft the legal text for you. |

## 2. Numbers I refused to guess

The four stats used on the homepage and `/about` (`site.stats`): enterprise
clients served, projects delivered, engineers on staff, client retention rate.

Give me defensible numbers, or tell me to cut the bar. Rounded and honest ("40+
projects") beats precise and inflated. Same for `site.promises` — the
consultation length, discovery duration and response time the site commits to —
and the bracketed timeframes and price band inside the service FAQs
(`src/content/services.ts`).

## 3. Proof — the weakest part of the site until you fill it

- **Three case studies** (`caseStudies` in `src/content/home.ts`), shown on `/` and
  `/case-studies`: client name or anonymous descriptor, industry, the problem,
  what you delivered, one measurable result. **Get written permission before
  naming a client** — "a national insurance provider" is fine when they say no.
  Once approved, each should become its own page; a detail page ranks for the
  problem a prospect searches for, which a summary card cannot.
- **Two client testimonials** with real name, title and company. Verbatim.
- **Client logos**, if you have permission to display them.
- **Leadership bios** for `/about`: real names, titles, two-line backgrounds,
  LinkedIn URLs. Named people with verifiable experience are the strongest trust
  signal an agency has, and the section is placeholder until you send them.
- **Company milestones** for the `/about` timeline.

## 4. Careers page

- **Real openings**, or tell me to remove the section — a stale careers page costs
  credibility. Once the roles are real I will add `JobPosting` structured data so
  they can appear in Google Jobs; I left it out deliberately because placeholder
  roles with no salary or valid post date would be invalid markup.
- **Benefits**: working model, learning budget, health cover, leave policy.
- **Hiring process timings** — the response times currently in brackets.

## 5. New gaps from the redesign

- **Engagement model rates** (`engagementModels` in `src/content/home.ts`). The
  reference design has a SaaS pricing table; a consultancy sells engagement shapes,
  so I replaced it with Discovery / Fixed scope / Dedicated team — but the three
  figures are placeholders. Give me numbers you will honour, or tell me to show
  ranges or nothing.
- **A client logo wall.** The strip under the hero currently shows the *platforms*
  we build on, because we have no permission to display client marks. Real client
  logos are a much stronger trust signal — send them and I will swap it.
- **Real imagery.** The case study cards use gradient panels, testimonial avatars
  are gradient circles, and the big dashboard mock under the hero is built from
  CSS. All three are placeholders for photography, headshots and a real product
  screenshot.

## 6. Brand assets

The logo is still a placeholder mark — a rising trend line in a cyan-to-navy
gradient square, echoing the treatment in the logo you attached — drawn as inline
SVG in three places (`Logo.tsx`, `src/app/icon.svg`, `public/logo.svg`). Send
whatever you have:

- **The real logo in SVG**, light and dark versions. I matched its colours but I
  should be using the actual artwork, including the "DEVELOP · SUPPORT · 24×7"
  strip, which is currently retyped rather than the real asset.
- **Confirm the palette.** I sampled the logo to `#1e97e5` (bright blue) →
  `#0a2540` (navy). If you have exact brand hex values, they replace one block in
  `src/app/globals.css` and the whole site follows.
- Brand typeface, if any (I used a system font stack for speed — no
  render-blocking font request, no layout shift)
- Team and office photography — the site currently uses zero photographs, which is
  fast but generic

## 7. Decisions I need from you

1. **How should leads reach you?** There are now working forms on the homepage and
   `/contact`, plus newsletter signup in the footer. None posts to a server: they
   compose a prefilled email in the visitor's own mail client, so no lead is ever
   silently dropped and no personal data passes through us before a privacy policy
   exists. That is a stopgap — pick one: embed Calendly/HubSpot, or give me an
   email/CRM provider and API key and I will point `EnquiryForm` at a real
   endpoint.
2. **A blog / insights section?** It is the main SEO surface still missing. Service
   pages capture people ready to buy; articles capture the much larger group
   researching the problem, and they are what earns links.
3. **Target geography.** "Enterprises" is currently unqualified. If you sell into
   specific countries or cities, that changes the copy and unlocks local SEO —
   including per-location pages if you want them.
4. **Real target keywords.** I wrote for the obvious commercial terms (IT
   consulting, custom software development company, cloud migration services,
   application modernization, dedicated development team). If you have Search
   Console or Ahrefs data, or terms your sales team hears, send them and I will
   retarget.
5. **AI crawlers.** `robots.txt` currently allows GPTBot, ClaudeBot and friends.
   Confirm, or I will block them.
6. **Cookie consent.** None is installed, which is correct while the site sets no
   non-essential cookies. The moment you add analytics or ad pixels you need a
   consent banner that blocks them until accepted.

## 8. Accounts and access I will need

| For | What to send | Why |
| --- | --- | --- |
| Google Search Console | Verification token, or add me as a user | Submit the sitemap, monitor indexing. Fill `site.verification.google` |
| Bing Webmaster Tools | Verification token | Same, for Bing and Copilot |
| Analytics | Which tool (GA4, Plausible, Fathom) + the ID | None is installed yet |
| Google Business Profile | Admin access | Local pack and knowledge panel |
| DNS | Access, or a person who has it | Domain, redirects, email records |
| Hosting | Where this should deploy (Vercel? your own infra?) | Build and deploy config |
| Social accounts | Real profile URLs | Footer links and JSON-LD `sameAs` — delete any network you do not post on |

## 9. What I will do once the above lands

1. Fill in the placeholders and re-run `npm run check:placeholders` until clean.
2. Validate every page type in Google's Rich Results Test.
3. Run Lighthouse and an axe accessibility pass on each template, and fix what
   they surface.
4. Submit the sitemap to Search Console and Bing.
5. Add `JobPosting` markup for real openings, and per-case-study detail pages.
6. Set up analytics and, if you want it, the blog.

---

## Already done

**15 pages**, all statically prerendered, ~106 kB first load:

- Homepage (10 sections), `/about`, `/services` + **six service pages**,
  `/industries`, `/technology`, `/case-studies`, `/careers`, `/contact`,
  `/privacy-policy`, `/terms`, and a custom 404
- Header and footer following the Infoane pattern you asked for: **Home · About Us
  · Services ▾ · Industries · Technology · Careers · Contact Us** with an "Enquire
  Now" CTA; footer with Quick Links / Services / per-office contact columns,
  social icons and a copyright bar
- Services dropdown on desktop (keyboard accessible, Escape closes, focus
  returns) and a mobile drawer with an expandable Services submenu

SEO and technical:

- Distinct keyword-led title and meta description on every route; canonical URLs
  throughout
- JSON-LD: Organization/ProfessionalService + WebSite site-wide; per-page WebPage
  / AboutPage / ContactPage / CollectionPage, BreadcrumbList on every inner page,
  Service + FAQPage on each service page, and a service catalogue with
  per-office ContactPoints
- Visible breadcrumbs on inner pages
- `sitemap.xml` and `robots.txt`, generated from the route map, listing only
  indexable URLs that return 200
- Generated 1200×630 social share image, favicon
- Semantic heading hierarchy, skip link, ARIA landmarks, `aria-current` on the
  active nav item, JS-free FAQ accordions, reduced-motion support
- Security headers (HSTS, nosniff, referrer policy, frame options)
- Placeholder checker (`npm run check:placeholders`) to wire into CI

**Verified:** production build and typecheck pass; all 16 routes return the correct
status including a real 404; 16/16 unique titles and exactly one `h1` per page;
zero broken internal links across 17 unique targets; no horizontal overflow at
375px on any page; clean console with no hydration warnings; mega menu and mobile
drawer ARIA states correct; reveal animations fire for content in the initial
viewport.

**Not verified:** Lighthouse scores, an automated accessibility audit, and
scroll-triggered reveals further down each page — IntersectionObserver is
throttled in the preview environment I built this in (a control observer failed to
fire too), so please scroll through the pages in your own browser and confirm the
animations feel right.
