import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Float, Parallax } from "@/components/motion/effects";
import { DesignIcon } from "@/components/design/DesignIcon";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/**
 * Expertise: headline and three cards on the left, the glass orb ringed by
 * Flutter / ColdFusion / Selenium tiles bleeding in from the right. On desktop
 * the orb sits behind the copy (the headline runs over the Flutter tile, as in
 * the design), so the copy column is lifted above it.
 */
export function AboutExpertise() {
  const e = aboutPage.expertise;
  return (
    <section id="expertise" className="relative isolate overflow-hidden py-20 lg:py-0">
      <div className="wash absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <Float className="absolute left-[8%] top-[10%] -z-10" amount={14}>
        <div className="orb h-8 w-8 opacity-80" />
      </Float>

      <div className="container-x relative lg:flex lg:min-h-[723px] lg:items-center">
        <ScrollReveal stagger={0.12} className="relative z-10 w-full lg:max-w-[578px]">
          <div data-reveal-item>
            <Eyebrow dot>{e.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-7 max-w-[40rem] text-3xl font-bold leading-[1.2] sm:text-4xl lg:text-[40px] lg:leading-[48px]">
            {e.title}
          </h2>
          <ul className="mt-9 space-y-[15px]">
            {e.items.map((item) => (
              <li
                key={item.title}
                data-reveal-item
                className="flex items-center gap-4 rounded-[14px] bg-[#f4f2f1]/80 px-6 py-5 ring-1 ring-inset ring-white/70 backdrop-blur transition-transform duration-500 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                  <DesignIcon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold leading-5">{item.title}</h3>
                  <p className="mt-1 text-[12.5px] leading-[18px] text-ink-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <div className="mt-10 lg:pointer-events-none lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[66%] lg:-translate-y-1/2">
          <Parallax speed={0.12} className="relative">
            <Image
              src={e.image}
              alt="A glass orb ringed by floating Flutter, ColdFusion and Selenium tiles"
              width={1800}
              height={1193}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_80%,transparent)]"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
