import Link from "next/link";
import { Logo } from "./Logo";
import { ScrollReveal } from "./motion/ScrollReveal";
import { icons, socialIcons, type SocialNetwork } from "./ui/Icons";
import { routes } from "@/lib/routes";
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
 * DRAFT wording: have the technical writer, and legal, approve this before
 * launch. It is a general website disclaimer, not a statement about any
 * particular engagement.
 */
const DISCLAIMER =
  "The information on this website is provided for general purposes only and does not constitute an offer, a contract, or a warranty. Services, technologies, and availability vary by engagement and are confirmed in a written agreement. Product, company, and technology names are trademarks of their respective owners and are used for identification only; their use does not imply endorsement or affiliation.";

/** The four links the design's Company column carries. */
const companyLinks = [
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Industries", href: routes.industries },
  { label: "AI", href: routes.ai },
];

/**
 * Footer (2026 redesign): brand and blurb on the left; the Company links and
 * the Contact Info block on the right; copyright and legal links underneath.
 *
 * The legal links come from the `legal` nav menu in D1, and the blurb, offices,
 * phones and email from site settings, so those can change without a deploy.
 * The office blocks are the site's NAP data (name, address, phone), which
 * Google matches against your Business Profile — keep them byte-identical
 * everywhere they appear online.
 */
export function SiteFooter({
  settings,
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
    <footer className="bg-night text-ink-400">
      <ScrollReveal variant="up" stagger={0.08} className="container-x py-16 lg:py-[72px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto_auto] lg:gap-14">
          <div data-reveal-item>
            <Logo theme="dark" name={settings.name} />
            <p className="mt-6 max-w-xs text-base leading-relaxed">{chrome.blurb}</p>
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

          <nav data-reveal-item aria-labelledby="footer-company">
            <h2 id="footer-company" className={heading}>
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-base">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal-item className="lg:max-w-sm">
            <h2 className={heading}>{chrome.officesHeading}</h2>
            <ul className="mt-5 space-y-5 text-sm">
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

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Not a reveal item: it sits at the very bottom of the page, where a
              scroll trigger would never be reached. */}
          <p className="text-ink-500">
            © {year} {settings.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-7 text-ink-500">
            {legalMenu.items.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link href={item.href} className="transition-colors duration-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Draft wording: have the technical writer (and legal) approve before launch. */}
        <p className="mt-6 max-w-4xl text-xs leading-5 text-ink-500">{DISCLAIMER}</p>
      </ScrollReveal>
    </footer>
  );
}
