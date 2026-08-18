# Admin panel — architecture and plan

Custom-built admin panel on Cloudflare Workers + D1, with draft/approval workflow
for non-technical editors. This document is the plan; **Phase 1 is done**, the rest
is not built yet.

## How it protects the SEO work

The site's ranking characteristics come from every page being prerendered HTML.
Moving content into a database usually breaks that — this design does not:

1. Public pages read content through `src/server/content/read.ts`, which wraps
   every query in `unstable_cache` with a cache tag.
2. Pages are rendered once and served from the R2 incremental cache as complete
   HTML. In the steady state a visitor's request never touches D1.
3. Publishing calls `revalidateTag()`, so only the affected pages regenerate. No
   redeploy, and no client-side fetching.

The one rule to hold: **never read content in a client component.** If content
must reach the browser, pass it down from a server component.

## Data model

Content is stored as JSON in D1 and validated by Zod on the way in *and* out
(`src/server/content/schemas.ts`), so a malformed row fails loudly in one place
instead of rendering `undefined` on a page.

Draft/approval works through an immutable revision model:

```
content_items       identity: collection + slug, sort order,
                    pointer to the published revision + the working draft
content_revisions   append-only versions; status draft → in_review → published
```

Editing appends a revision rather than overwriting. That gives the approver
something concrete to approve, an audit trail of who changed what, and a one-row
rollback. Publishing swaps `published_revision_id` and revalidates.

## Roles

| Role | Can |
| --- | --- |
| `editor` | Create and edit drafts, submit for review |
| `approver` | Everything above, plus publish and unpublish |
| `admin` | Everything, plus manage users and site settings |

Enforced server-side in every action. Hiding a button is not a permission.

## Security decisions

Building auth ourselves means owning it. What is already decided:

- **PBKDF2-SHA-256 via WebCrypto**, per-user salt and stored iteration count
  (bcrypt/argon2 native modules do not run in Workers). Storing the iteration
  count lets the work factor be raised later without invalidating passwords.
- **Server-side sessions in D1**, cookie holds a random token, the table stores
  only its SHA-256 hash — a database dump then contains no usable sessions.
  Cookies are httpOnly, Secure, SameSite=Lax.
- **Revocable by design**: deactivating a user or signing out everywhere deletes
  rows. This is the main reason for not using stateless JWTs.
- **CSRF tokens** on every mutating form, double-submit against a cookie.
- **Login throttling** per email *and* per IP, so neither one account nor one
  address can be hammered.
- **Parameterised queries everywhere** via Drizzle — no string interpolation, the
  usual route to SQL injection in D1 code.
- **Audit log** for every privileged action.
- No secrets in the repository. `.dev.vars` locally, `wrangler secret put` in
  production.

## Phases

### Phase 1 — foundation ✅ done

- OpenNext Cloudflare adapter, `wrangler.jsonc` bindings (D1 ×2, R2 ×2, service
  self-reference, DO queue), `open-next.config.ts` with R2 incremental cache +
  regional cache + D1 tag cache
- Drizzle schema: users, sessions, login attempts, content items, content
  revisions, media assets, audit log — migration generated and applied to local D1
- Zod schema per collection, doubling as the admin form validators
- Cached, validated read layer with per-collection and per-item cache tags
- Seed generated from the existing `src/content/*` files: 31 items, all validated,
  loaded into local D1 as published revisions
- Verified end-to-end: a Next.js route read all 6 services in order, their nested
  FAQs, 6 industries, 7 FAQs and site settings from D1 in local dev

### Phase 2 — authentication and admin shell ✅ done

- Route groups: public pages moved to `(site)` with their own layout, admin in
  `(admin)`. The root layout is now bare `<html>/<body>`, so no marketing header
  or site-wide JSON-LD is shipped to the admin panel
- `scripts/create-admin.ts` — hidden password prompt (or `ADMIN_PASSWORD` env),
  hash computed locally with the same PBKDF2 parameters as the Worker, only the
  hash sent to D1, temp SQL file deleted afterwards, upsert on email so re-running
  resets a password
- PBKDF2-SHA-256 hashing (300k iterations, stored per user for transparent
  upgrades), constant-time comparison, timing-equalised failure path for unknown
  addresses, length-based password policy with a common-password screen
- Sessions in D1 keyed by the SHA-256 of the cookie token, sliding 30-day expiry
  written at most daily, revoked on deactivation, `destroyAllSessionsForUser` for
  password changes
- Login throttling per email *and* per IP over a 15-minute window, counted in D1
  because Workers isolates are short-lived and per-location
- Login/logout server actions; identical error wording on every failure path to
  avoid account enumeration; `next` parameter validated against a relative-admin
  pattern to close the open-redirect
- Middleware redirect + `X-Robots-Tag: noindex, nofollow`, with the real
  authorisation in `requireUser()`/`requireRole()` on the server
- Admin shell with role-filtered navigation, sign-out as a POST, and a
  must-change-password banner
- Audit log writing on sign-in, failed sign-in and sign-out

**Verified end to end**: anonymous `/admin` → redirect carrying `?next=`; wrong
password → generic error; correct password → dashboard, session cookie not
readable from JavaScript; session survived a dev-server restart (it lives in D1);
dashboard read the real 31 seeded items; sign-out → redirect, session row deleted,
logout audited; `noindex` header present on `/admin` and `/admin/login`;
email-scoped failure counter cleared on successful sign-in.

### Phase 3 — content management and workflow

- Collection list views with status, last edited, and who by
- Editor forms generated per collection from the Zod schemas, with inline
  validation messages and the SEO constraints surfaced (title/description length)
- Draft save, submit for review, approve + publish, reject with a note, unpublish
- `revalidateTag()` on publish; preview of an unpublished revision via Next's
  draft mode (dynamic, noindex)
- Reorder items (drag or sort field), because order is content on this site

### Phase 4 — migrate the public pages onto D1

- Switch each page from importing `src/content/*` to the read layer
- Keep the content files as the seed source and the fallback if settings are
  missing, so a bad deploy cannot blank the header
- Re-verify: same HTML, same word counts, same JSON-LD, still prerendered

### Phase 5 — media and polish

- R2 uploads with type/size validation, alt text required before an image can go
  on a public page
- Cloudflare Images transformations for responsive sizes
- User management for admins, password change, deactivate
- Audit log viewer

## Setup you will need to do

These need your Cloudflare account, so I cannot run them:

```bash
npx wrangler d1 create infotech-content
```

```bash
npx wrangler d1 create infotech-next-cache
```

```bash
npx wrangler r2 bucket create infotech-next-cache
```

```bash
npx wrangler r2 bucket create infotech-media
```

Then paste the two `database_id` values into `wrangler.jsonc` (they replace the
`REPLACE_WITH_*` placeholders) and apply the migration remotely:

```bash
npm run db:migrate:remote
```

## Local development

```bash
npm run db:migrate && npm run db:seed && npm run admin:create && npm run dev
```

`admin:create` prompts for an email, name and password (hidden) and creates an
admin in the local D1. Add `-- --remote` to target production once the database
ids are filled in. Sign in at `/admin/login`.

Regenerate the seed after editing `src/content/*` with `npm run db:seed:build`.
Regenerate binding types after editing `wrangler.jsonc` with `npm run cf-typegen`
— `cloudflare-env.d.ts` is committed because typecheck depends on it.
