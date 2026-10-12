import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Float, Parallax } from "@/components/motion/effects";
import { DesignIcon } from "@/components/design/DesignIcon";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/** Expertise: headline and three rows over the glass-orb render. */
export function AboutExpertise() {
  const e = aboutPage.expertise;
  return (
    <section id="expertise" className="relative isolate overflow-hidden py-20 lg:py-28">
      <div className="wash absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <Float className="absolute left-[8%] top-[10%] -z-10" amount={14}>
        <div className="orb h-8 w-8 opacity-80" />
      </Float>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.2fr]">
        <ScrollReveal stagger={0.12} className="relative z-10">
          <div data-reveal-item>
            <Eyebrow dot>{e.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-5 max-w-md text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
            {e.title}
          </h2>
          <ul className="mt-10 max-w-md space-y-3">
            {e.items.map((item) => (
              <li
                key={item.title}
                data-reveal-item
                className="flex items-start gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-inset ring-white backdrop-blur transition-transform duration-500 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                  <DesignIcon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <Parallax speed={0.18} className="relative lg:-mr-16">
          <Image
            src={e.image}
            alt="A glass orb ringed by floating Flutter, ColdFusion and Selenium tiles"
            width={1800}
            height={1193}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_80%,transparent)]"
          />
        </Parallax>
      </div>
    </section>
  );
}
