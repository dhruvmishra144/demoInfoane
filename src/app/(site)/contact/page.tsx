import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactBand } from "@/components/contact/ContactBand";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { getItemOrFallback, getSettingsOrFallback } from "@/server/content/with-fallback";
import { pageFallback, settingsFallback } from "@/server/content/static-fallback";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getItemOrFallback("page", "contact", pageFallback["contact"]);
  return {
    title: contactPage.metaTitle,
    description: contactPage.metaDescription,
    alternates: { canonical: routes.contact },
  };
}

/**
 * The form has no backend by design: it composes a prefilled email in the
 * visitor's own mail client, so no personal data passes through us. See
 * CONTENT-TODO.md for wiring it to a CRM.
 */
export default async function ContactPage() {
  const contactPage = await getItemOrFallback("page", "contact", pageFallback["contact"]);
  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.contact,
          name: contactPage.heading,
          description: contactPage.metaDescription,
          type: "ContactPage",
          breadcrumbs: [{ name: "Contact Us", path: routes.contact }],
        })}
      />
      <ContactHero email={settings.contact.email} />
      <ContactBand />
    </>
  );
}
