import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { icons } from "@/components/ui/Icons";
import { routes, serviceHref } from "@/lib/routes";
import { getCollectionOrFallback } from "@/server/content/with-fallback";
import { serviceFallback } from "@/server/content/static-fallback";

/**
 * Custom 404.
 *
 * Next serves this with a real 404 status, which is what search engines need to
 * see. It is noindexed and it offers routes onward, so a broken inbound link
 * becomes a navigable page instead of a dead end.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const servicePages = await getCollectionOrFallback("service", serviceFallback);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950">
        <div className="mesh absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="container-x py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
              Error 404
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              We cannot find that page
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">
              The link may be out of date, or the page may have moved. Here is the
              way back.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={routes.home}>
                Back to home
              </Button>
              <Button href={routes.contact} variant="onDark">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="404-services" className="bg-white">
        <div className="container-x py-16 lg:py-20">
          <h2 id="404-services" className="text-2xl font-bold">
            Looking for one of these?
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service.slug)}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
                >
                  <span>
                    <span className="block text-base font-semibold text-ink-900">
                      {service.title}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink-500">
                      {service.navDescription}
                    </span>
                  </span>
                  <icons.arrow className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
