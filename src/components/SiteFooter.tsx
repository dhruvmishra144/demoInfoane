import Link from "next/link";
import { Logo } from "./Logo";
import { ScrollReveal } from "./motion/ScrollReveal";
import { officeLine } from "@/content/redesign";
import type { CollectionData } from "@/server/content/schemas";

type ServiceLink = { slug: string; title: string };
type NavMenu = CollectionData["navMenu"];

/**
 * Footer (2026 redesign): brand and blurb on the left, Company links and
 * Contact on the right, then the copyright and legal bar — on the same navy
 * as the site's dark sections.
 *
 * Links still come from the `footer-pages` and `legal` nav menus in D1, and the
 * email from site settings, so editors can change them without a deploy. The
 * full street addresses stay in the Organization JSON-LD (siteSchema); the
 * footer shows the one-line city list the design calls for.
 */
export function SiteFooter({
  settings,
  pagesMenu,
  legalMenu,
}: {
  settings: CollectionData["settings"];
  services: ServiceLink[];
  pagesMenu: NavMenu;
  legalMenu: NavMenu;
}) {
  const year = new Date().getFullYear();
  const chrome = settings.footer;

  return (
    <footer className="bg-night text-ink-400">
      <ScrollReveal variant="up" stagger={0.08} className="container-x pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto_auto] lg:gap-20">
          <div data-reveal-item>
            <Logo theme="dark" name={settings.name} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">{chrome.blurb}</p>
          </div>

          <nav data-reveal-item aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-500"
            >
              {chrome.pagesHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {pagesMenu.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-400 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal-item>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">
              {chrome.officesHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="text-ink-300 transition-colors duration-300 hover:text-white"
                >
                  {settings.contact.email}
                </a>
              </li>
              <li className="max-w-xs leading-relaxed">{officeLine}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.name}. {chrome.copyrightSuffix}
          </p>
          <ul className="flex flex-wrap gap-7">
            {legalMenu.items.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link href={item.href} className="transition-colors duration-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </footer>
  );
}
