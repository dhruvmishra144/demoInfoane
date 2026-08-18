import Link from "next/link";
import { Reveal } from "./ui/Reveal";
import type { Crumb } from "@/lib/schema";

/**
 * Inner-page hero: a contained panel with a visible breadcrumb trail.
 *
 * Visible breadcrumbs matter beyond navigation — Google prefers them alongside
 * BreadcrumbList markup, and they make the URL hierarchy legible in results.
 */
export function PageHero({
  eyebrow,
  heading,
  intro,
  breadcrumbs = [],
  children,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string[];
  /** Trail excluding Home and the current page. */
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ink-50 pt-6 lg:pt-8">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-5xl bg-brand-950 px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <div className="mesh absolute inset-0 -z-10 opacity-55" aria-hidden="true" />
          <div
            className="grid-lines absolute inset-0 -z-10 opacity-40"
            aria-hidden="true"
            style={{
              maskImage: "radial-gradient(75% 70% at 25% 0%, black, transparent)",
              WebkitMaskImage: "radial-gradient(75% 70% at 25% 0%, black, transparent)",
            }}
          />

          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    <Link href={crumb.path} className="transition-colors hover:text-white">
                      {crumb.name}
                    </Link>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {/* Current page is text, not a link — a self-link adds nothing. */}
                  <span aria-current="page" className="text-brand-200">
                    {heading}
                  </span>
                </li>
              </ol>
            </nav>
          </Reveal>

          <div className="mt-8 max-w-3xl">
            {eyebrow && (
              <Reveal delay={60}>
                <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 ring-1 ring-inset ring-white/15">
                  {eyebrow}
                </p>
              </Reveal>
            )}
            <Reveal delay={120}>
              <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                {heading}
              </h1>
            </Reveal>
            {intro?.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={180 + index * 60}>
                <p className="mt-5 leading-relaxed text-ink-300 lg:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            {children && (
              <Reveal delay={280}>
                <div className="mt-9">{children}</div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
