import { Reveal } from "./Reveal";

/**
 * Section shell.
 *
 * Two things it guarantees, both requested:
 *  1. Everything stays inside `container-x` — including the dark "wide" sections,
 *     which render as a rounded panel within the container rather than bleeding
 *     to the viewport edges.
 *  2. Every section is a landmark with its heading wired up via aria-labelledby,
 *     giving screen-reader users an outline and crawlers a clean hierarchy
 *     (one h1 per page, then h2 per section, h3 inside cards).
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "light",
  align = "center",
  headerAside,
}: {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  tone?: "light" | "muted" | "dark";
  align?: "left" | "center";
  /** Optional right-hand block beside a left-aligned heading (e.g. a button). */
  headerAside?: React.ReactNode;
}) {
  const dark = tone === "dark";
  const headingId = `${id}-heading`;

  const header = (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      {eyebrow && (
        <Reveal>
          <p
            className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
              dark
                ? "bg-white/10 text-brand-200 ring-1 ring-inset ring-white/15"
                : "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100"
            }`}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2
          id={headingId}
          className={`text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12] ${
            dark ? "text-white" : ""
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={120}>
          <p
            className={`mt-4 text-base leading-relaxed lg:text-lg ${
              dark ? "text-ink-300" : "text-ink-500"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );

  const inner = (
    <>
      {headerAside ? (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {header}
          <Reveal delay={160} className="shrink-0">
            {headerAside}
          </Reveal>
        </div>
      ) : (
        header
      )}
      <div className="mt-12 lg:mt-16">{children}</div>
    </>
  );

  // Dark sections are a contained rounded panel, so the page edges stay white.
  if (dark) {
    return (
      <section id={id} aria-labelledby={headingId} className="scroll-mt-28 py-8">
        <div className="container-x">
          <Reveal scale>
            <div className="relative isolate overflow-hidden rounded-5xl bg-brand-950 px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
              <div className="mesh absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
              <div
                className="grid-lines absolute inset-0 -z-10 opacity-40"
                aria-hidden="true"
                style={{
                  maskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent)",
                  WebkitMaskImage:
                    "radial-gradient(70% 60% at 50% 0%, black, transparent)",
                }}
              />
              {inner}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-28 py-16 lg:py-24 ${tone === "muted" ? "bg-ink-50" : "bg-white"}`}
    >
      <div className="container-x">{inner}</div>
    </section>
  );
}
