import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/effects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { locations } from "@/content/redesign";

/**
 * Building blocks shared by the redesigned pages. Server components: motion
 * comes from the client wrappers in components/motion, the markup stays static.
 */

/* ------------------------------------------------------------ SectionIntro */

export function Eyebrow({
  children,
  dot = false,
  className = "",
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-2 ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />}
      {children}
    </p>
  );
}

/**
 * Eyebrow, headline and lead. The headline carries `data-split`, so any
 * <ScrollReveal> around it animates it line by line.
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  dark = false,
  dot = false,
  center = false,
  className = "",
  titleClassName = "max-w-3xl",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  dot?: boolean;
  center?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <div data-reveal-item>
        <Eyebrow dot={dot} className={center ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      </div>
      <h2
        data-split
        className={`mt-4 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-ink-900"
        } ${center ? "mx-auto" : ""} ${titleClassName}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal-item
          className={`mt-5 max-w-2xl text-base leading-relaxed ${
            dark ? "text-ink-400" : "text-ink-600"
          } ${center ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ GlassBackdrop */

/**
 * The glass-sphere render the mockups use as the backdrop of every redesigned
 * inner page's hero (spheres, orbit lines and discs on a lavender wash). It
 * drifts slowly against the scroll. `position` is the CSS object-position, for
 * pages whose mockup crops the render differently. Purely decorative.
 */
export function GlassBackdrop({ position = "center" }: { position?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="wash absolute inset-0" />
      <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[6%]">
        <Image
          src="/images/glass-backdrop.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </Parallax>
    </div>
  );
}

/* ---------------------------------------------------------------- Locations */

export function Locations({ lead, globe }: { lead: string; globe?: string }) {
  return (
    <section id="locations" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow="Locations" title="Where we build." lead={lead} />
        </ScrollReveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          {globe ? (
            <Parallax speed={0.15} className="relative mx-auto aspect-square w-full max-w-sm">
              <Image
                src={globe}
                alt="A glowing globe with light trails connecting the Americas to India"
                width={560}
                height={560}
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="h-full w-full object-contain"
              />
            </Parallax>
          ) : (
            <div className="relative aspect-square max-w-lg overflow-hidden rounded-l-full">
              <Parallax speed={0.15} className="absolute inset-0">
                <Image
                  src="/images/globe.webp"
                  alt="A glowing globe with light trails connecting the Americas to India"
                  width={1040}
                  height={1040}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-full w-full scale-110 object-cover"
                />
              </Parallax>
            </div>
          )}

          <ScrollReveal as="ul" variant="up" stagger={0.14} className="space-y-5">
            {locations.map((office) => (
              <li
                key={office.city}
                data-reveal-item
                className="group rounded-3xl border border-ink-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-500 transition-transform duration-500 group-hover:scale-150" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{office.city}</h3>
                    <p className="text-sm font-semibold text-brand-600">{office.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{office.body}</p>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- CenterCta */

export function CenterCta({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-ink-200/70 py-28 lg:py-36">
      <Parallax speed={0.3} className="halo absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2" />
      <ScrollReveal variant="blur" stagger={0.12} className="container-x text-center">
        <p
          data-reveal-item
          className="eyebrow mx-auto inline-flex rounded-full bg-brand-50 px-4 py-1.5"
        >
          {eyebrow}
        </p>
        <h2
          data-reveal-item
          className="mx-auto mt-8 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p data-reveal-item className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-600">
          {body}
        </p>
        <div data-reveal-item className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={primary.href} variant="coral">
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="light">
            {secondary.label}
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
