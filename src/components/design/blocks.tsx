import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Float, Parallax } from "@/components/motion/effects";
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
 * The lavender wash with floating glass spheres and the ribbon render, used
 * behind the hero of every redesigned inner page. Purely decorative.
 */
export function GlassBackdrop({ ribbon = true }: { ribbon?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="wash absolute inset-0" />
      {ribbon && (
        <Parallax speed={0.35} rotate={6} className="absolute -right-24 -top-10 w-[34rem] opacity-90 sm:w-[42rem] lg:w-[48rem]">
          <Image
            src="/images/glass-ribbon.webp"
            alt=""
            width={1008}
            height={957}
            priority
            className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_65%,transparent)]"
          />
        </Parallax>
      )}
      <Float className="absolute left-[46%] top-[14%]" amount={16}>
        <div className="orb h-10 w-10 opacity-90" />
      </Float>
      <Float className="absolute bottom-[12%] left-[30%]" amount={20} duration={7}>
        <div className="orb-peach h-16 w-16" />
      </Float>
      <Parallax speed={-0.4} className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem]">
        <div className="h-full w-full rounded-full border-[10px] border-white/50 bg-gradient-to-br from-[#c9c4ff]/60 via-[#e7e4ff]/30 to-[#ffd1c4]/50 shadow-[inset_0_0_60px_rgba(255,255,255,0.8)] blur-[1px]" />
      </Parallax>
    </div>
  );
}

/* ---------------------------------------------------------------- Locations */

export function Locations({ lead }: { lead: string }) {
  return (
    <section id="locations" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow="Locations" title="Where we build." lead={lead} />
        </ScrollReveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
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
