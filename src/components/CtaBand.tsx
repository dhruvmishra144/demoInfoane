import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { site } from "@/config/site";
import { routes } from "@/lib/routes";

/**
 * Closing conversion band for inner pages, contained rather than full-bleed.
 * Every page ends with one, because a page with no next step is a dead end no
 * matter how well it ranks.
 */
export function CtaBand({
  heading = "Tell us what is slowing your systems down",
  body,
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-ink-50 py-16 lg:py-20">
      <div className="container-x">
        <Reveal scale>
          <div className="relative isolate overflow-hidden rounded-5xl bg-brand-950 px-6 py-14 sm:px-10 lg:px-14">
            <div className="mesh absolute inset-0 -z-10 opacity-55" aria-hidden="true" />
            <div
              className="grid-lines absolute inset-0 -z-10 opacity-40"
              aria-hidden="true"
              style={{
                maskImage: "radial-gradient(70% 70% at 30% 0%, black, transparent)",
                WebkitMaskImage: "radial-gradient(70% 70% at 30% 0%, black, transparent)",
              }}
            />

            <div className="max-w-2xl">
              <h2
                id="cta-band-heading"
                className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl"
              >
                {heading}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-300 lg:text-lg">
                {body ??
                  `Book a free ${site.promises.consultationLength} consultation. You will talk to an engineer, not an account manager, and you will leave with a concrete opinion on your options — whether or not you hire us.`}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={routes.contact} variant="light">
                  Contact us
                </Button>
                <Button
                  href={`tel:${site.contact.phone}`}
                  variant="onDark"
                  withChip={false}
                >
                  Call {site.contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
