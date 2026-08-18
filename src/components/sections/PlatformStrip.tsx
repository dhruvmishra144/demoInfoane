import { Marquee } from "../ui/Marquee";
import { Reveal } from "../ui/Reveal";
import { platformStrip } from "@/content/home";

/**
 * Scrolling platform strip below the hero.
 *
 * These are the platforms we build on. It occupies the slot a client logo wall
 * would — swap it for real client marks once you have permission to display them,
 * since those are a much stronger trust signal.
 */
export function PlatformStrip() {
  return (
    <section aria-labelledby="platforms-heading" className="bg-white py-12 lg:py-16">
      <div className="container-x">
        <Reveal>
          <h2
            id="platforms-heading"
            className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-400"
          >
            Platforms and clouds we build on
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <Marquee>
            <ul className="flex items-center">
              {platformStrip.map((platform) => (
                <li
                  key={platform}
                  className="whitespace-nowrap px-7 text-lg font-semibold text-ink-300 transition-colors duration-300 hover:text-brand-600 lg:px-10 lg:text-xl"
                >
                  {platform}
                </li>
              ))}
            </ul>
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}
