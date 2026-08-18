import { Reveal } from "../ui/Reveal";
import { EnquiryForm } from "../EnquiryForm";
import { icons } from "../ui/Icons";
import { site } from "@/config/site";

/**
 * "Start your journey" — the closing conversion panel, contained rather than
 * full-bleed so it lines up with every other section.
 *
 * Contact details on the left work today with no backend; the form on the right
 * composes a prefilled email (see EnquiryForm).
 */
export function FinalCta() {
  return (
    <section
      id="contact"
      aria-labelledby="final-cta-heading"
      className="scroll-mt-28 bg-white py-8 pb-16 lg:pb-24"
    >
      <div className="container-x">
        <Reveal scale>
          <div className="relative isolate overflow-hidden rounded-5xl bg-brand-950 px-6 py-14 sm:px-10 lg:px-14 lg:py-18">
            <div className="mesh absolute inset-0 -z-10 opacity-55" aria-hidden="true" />
            <div
              className="grid-lines absolute inset-0 -z-10 opacity-40"
              aria-hidden="true"
              style={{
                maskImage: "radial-gradient(70% 70% at 30% 0%, black, transparent)",
                WebkitMaskImage: "radial-gradient(70% 70% at 30% 0%, black, transparent)",
              }}
            />

            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 ring-1 ring-inset ring-white/15">
                    Start your journey
                  </p>
                  <h2
                    id="final-cta-heading"
                    className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
                  >
                    Let&apos;s start building something great together
                  </h2>
                  <p className="mt-5 max-w-md leading-relaxed text-ink-300">
                    Book a free {site.promises.consultationLength} consultation.
                    You will talk to an engineer, not an account manager, and you
                    will leave with a concrete opinion on your options — whether or
                    not you hire us.
                  </p>
                </div>

                <div className="mt-10 space-y-4">
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-brand-200"
                  >
                    <icons.phone className="h-5 w-5 shrink-0 text-brand-400" />
                    {site.contact.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-brand-200"
                  >
                    <icons.mail className="h-5 w-5 shrink-0 text-brand-400" />
                    {site.contact.email}
                  </a>

                  <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-ink-400">
                    <li className="inline-flex items-center gap-2">
                      <icons.check className="h-4 w-4 text-brand-400" />
                      Replies within {site.promises.responseTime}
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <icons.check className="h-4 w-4 text-brand-400" />
                      NDA on request
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-4xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm lg:p-8">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
