import Link from "next/link";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";
import { ScrollReveal } from "./motion/ScrollReveal";
import { FooterWordmark } from "./motion/FooterWordmark";
import { icons, socialIcons, type SocialNetwork } from "./ui/Icons";
import { footerServices } from "@/content/redesign";
import type { CollectionData } from "@/server/content/schemas";

type ServiceLink = { slug: string; title: string };
type NavMenu = CollectionData["navMenu"];

const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  x: "X (Twitter)",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  telegram: "Telegram",
};

/**
 * Footer: brand, copyright and social links; Quick Links; Services; and the
 * per-office Contact Info — on the navy of the site's dark sections, closing
 * with the oversized animated wordmark.
 *
 * Quick Links and the legal bar come from the `footer-pages` / `legal` nav
 * menus in D1, and the offices, phones and email from site settings, so all
 * of it can change without a deploy. The office blocks are the site's NAP
 * data (name, address, phone), which Google matches against your Business
 * Profile — keep them byte-identical everywhere they appear online.
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
  const social = (Object.entries(settings.social) as [SocialNetwork, string][]).filter(
    ([network]) => network in socialIcons,
  );
  const heading = "text-sm font-semibold uppercase tracking-[0.18em] text-brand-500";
  const link = "text-ink-400 transition-colors duration-300 hover:text-white";

  return (
    <footer className="relative overflow-hidden bg-night text-ink-400">
      <ScrollReveal variant="up" stagger={0.08} className="container-x pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.5fr] lg:gap-14">
          <div data-reveal-item>
            <Logo theme="dark" name={settings.name} />
            <p className="mt-6 text-sm leading-relaxed">
              © {year} {settings.name}.
              <br />
              {chrome.copyrightSuffix}
            </p>
            {social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {social.map(([network, url]) => {
                  const Icon = socialIcons[network];
                  return (
                    <li key={network}>
                      <a
                        href={url}
                        rel="noopener noreferrer me"
                        target="_blank"
                        aria-label={`${settings.name} on ${SOCIAL_LABELS[network]}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-300 ring-1 ring-inset ring-white/10 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-brand-500 hover:text-white hover:ring-brand-500"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <nav data-reveal-item aria-labelledby="footer-quick">
            <h2 id="footer-quick" className={heading}>
              {chrome.pagesHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {pagesMenu.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav data-reveal-item aria-labelledby="footer-services">
            <h2 id="footer-services" className={heading}>
              {chrome.servicesHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footerServices.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className={link}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal-item>
            <h2 className={heading}>{chrome.officesHeading}</h2>
            <ul className="mt-5 space-y-6 text-sm">
              {settings.offices.map((office, index) => (
                <li key={`${office.label}-${index}`}>
                  <address className="not-italic leading-relaxed">
                    <span className="font-semibold text-white">{office.label}:</span>{" "}
                    {office.street}, {office.city}, {office.region}
                    {/* Local convention: "TX 75035" in the US, "Telangana - 500 072" in India. */}
                    {office.country === "IN" ? " - " : " "}
                    {office.postalCode}.
                  </address>
                  <a
                    href={`tel:${office.phone}`}
                    className={`mt-1.5 inline-flex items-center gap-2 ${link}`}
                  >
                    <icons.phone className="h-4 w-4 shrink-0 text-brand-500" />
                    {office.phoneDisplay}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className={`inline-flex items-center gap-2 ${link}`}
                >
                  <icons.mail className="h-4 w-4 shrink-0 text-brand-500" />
                  {settings.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-7">
            {legalMenu.items.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link href={item.href} className="transition-colors duration-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <BackToTop />
        </div>
      </ScrollReveal>

      <FooterWordmark text={settings.name} />
    </footer>
  );
}
