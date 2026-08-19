import Link from "next/link";
import { Logo } from "./Logo";
import { icons, socialIcons, type SocialNetwork } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { footerQuickLinks, routes, serviceHref } from "@/lib/routes";
import type { CollectionData } from "@/server/content/schemas";

type ServiceLink = { slug: string; title: string };

/**
 * Footer: newsletter row, four link/contact columns, an oversized email address,
 * and the copyright bar — the reference design's structure, carrying the same
 * Quick Links / Services / per-office contact grouping as before.
 *
 * The address blocks are the site's NAP data (name, address, phone) — the details
 * Google matches against your Business Profile and directory listings. Keep them
 * byte-identical everywhere they appear online, punctuation included.
 */
export function SiteFooter({
  settings,
  services,
}: {
  settings: CollectionData["settings"];
  services: ServiceLink[];
}) {
  const year = new Date().getFullYear();
  const site = settings;

  return (
    <footer className="bg-ink-50">
      <div className="container-x pb-10">
        <div className="overflow-hidden rounded-5xl border border-ink-200 bg-white">
          {/* Newsletter */}
          <div className="flex flex-col gap-6 border-b border-ink-100 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div>
              <h2 className="text-xl font-semibold">Sign up for our newsletter</h2>
              <p className="mt-2 text-sm text-ink-500">
                Occasional notes on modernisation, cloud cost and delivery — no
                more than once a month.
              </p>
            </div>

            {/* Composes an email rather than posting nowhere. Swap the action for
                your provider's endpoint when you pick one — CONTENT-TODO.md. */}
            <form
              action={`mailto:${site.contact.email}`}
              method="post"
              encType="text/plain"
              className="flex w-full max-w-md gap-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-brand-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Columns */}
          <div className="grid gap-10 p-8 lg:grid-cols-[1.4fr_1fr_1.1fr_1.5fr] lg:p-10">
            <div>
              <Logo withTagline />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-500">
                {site.tagline} for enterprises that need software delivered
                predictably.
              </p>

              <ul className="mt-6 flex gap-2.5">
                {(Object.entries(site.social) as [SocialNetwork, string][]).map(
                  ([network, url]) => {
                    const Icon = socialIcons[network];
                    return (
                      <li key={network}>
                        <a
                          href={url}
                          rel="noopener noreferrer me"
                          target="_blank"
                          aria-label={`${site.name} on ${network}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      </li>
                    );
                  },
                )}
              </ul>

              <ul className="mt-6 space-y-1.5 text-xs text-ink-500">
                {site.credentials.map((credential) => (
                  <li key={credential} className="flex items-center gap-2">
                    <icons.shield className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-labelledby="footer-quick">
              <h2 id="footer-quick" className="text-sm font-semibold text-ink-900">
                Pages
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {footerQuickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink-500 transition-colors hover:text-brand-700"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-services">
              <h2 id="footer-services" className="text-sm font-semibold text-ink-900">
                Services
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={serviceHref(service.slug)}
                      className="text-ink-500 transition-colors hover:text-brand-700"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-semibold text-ink-900">Offices</h2>
              <ul className="mt-5 space-y-5 text-sm">
                {site.offices.map((office) => (
                  <li key={office.label}>
                    <p className="flex items-center gap-2 font-medium text-ink-800">
                      <icons.pin className="h-4 w-4 shrink-0 text-brand-500" />
                      {office.label}
                      {office.isHeadquarters && (
                        <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                          HQ
                        </span>
                      )}
                    </p>
                    <address className="mt-1.5 not-italic leading-relaxed text-ink-500">
                      {office.street}
                      <br />
                      {office.city}, {office.region} {office.postalCode}
                      <br />
                      <a
                        href={`tel:${office.phone}`}
                        className="transition-colors hover:text-brand-700"
                      >
                        {office.phoneDisplay}
                      </a>
                    </address>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Oversized email, as in the reference footer */}
          <Reveal className="border-t border-ink-100 px-8 py-10 lg:px-10">
            <a
              href={`mailto:${site.contact.email}`}
              className="block text-2xl font-semibold tracking-tight text-ink-300 transition-colors duration-300 hover:text-brand-600 sm:text-4xl lg:text-5xl"
            >
              {site.contact.email}
            </a>
          </Reveal>

          {/* Bottom bar */}
          <div className="flex flex-col gap-4 border-t border-ink-100 px-8 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-6">
              <li>
                <Link href={routes.privacy} className="transition-colors hover:text-brand-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={routes.terms} className="transition-colors hover:text-brand-700">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="transition-colors hover:text-brand-700">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
