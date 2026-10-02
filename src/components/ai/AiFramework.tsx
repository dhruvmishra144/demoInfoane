import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax, ZoomImage } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { aiPage } from "@/content/redesign";

/** Image that opens up on scroll beside three numbered principles. */
export function AiFramework() {
  const framework = aiPage.framework;
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ZoomImage className="relative aspect-square overflow-hidden rounded-3xl bg-ink-900 shadow-2xl shadow-ink-900/20">
          <Parallax speed={0.12} className="absolute inset-0">
            <Image
              data-zoom-media
              src={framework.image}
              alt={framework.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </ZoomImage>

        <div>
          <ScrollReveal>
            <SectionIntro eyebrow={framework.eyebrow} title={framework.title} titleClassName="max-w-lg" />
          </ScrollReveal>
          <ScrollReveal as="ol" variant="up" stagger={0.15} className="mt-10 space-y-7">
            {framework.items.map((item, index) => (
              <li key={item.title} data-reveal-item className="flex gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white shadow-md shadow-brand-500/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
