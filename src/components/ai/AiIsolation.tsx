import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax, ZoomImage } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { DesignIcon } from "@/components/design/DesignIcon";
import { aiPage } from "@/content/redesign";

const tones = {
  light: {
    card: "border border-ink-200/70 bg-white",
    icon: "bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100",
    body: "text-ink-600",
  },
  coral: { card: "bg-brand-500 shadow-brand-500/25", icon: "bg-white/20 text-white", body: "text-white/80" },
  dark: { card: "bg-ink-900", icon: "bg-brand-500/15 text-brand-400", body: "text-ink-400" },
} as const;

type Card = (typeof aiPage.isolation.cards)[number];

function BentoCard({ item, place }: { item: Card; place: string }) {
  const tone = tones[item.tone as keyof typeof tones];
  const onColor = item.tone !== "light";
  return (
    <article data-reveal-item className={`rounded-2xl p-6 shadow-xl shadow-ink-900/5 ${tone.card} ${place}`}>
      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
        <DesignIcon name={item.icon} className="h-5 w-5" />
      </span>
      <h3 className={`mt-5 text-base font-bold ${onColor ? "text-white" : "text-ink-900"}`}>{item.title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${tone.body}`}>{item.body}</p>
    </article>
  );
}

/** Bento of four tone-coded cards around the padlock render. */
export function AiIsolation() {
  const iso = aiPage.isolation;
  const [a, b, c, d] = iso.cards;

  return (
    <section className="border-t border-ink-200/70 py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro center eyebrow={iso.eyebrow} title={iso.title} lead={iso.lead} titleClassName="max-w-3xl" />
        </ScrollReveal>

        <ScrollReveal
          variant="tilt"
          stagger={0.1}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
        >
          <BentoCard item={a} place="lg:col-start-1 lg:row-start-1" />
          <div
            data-reveal-item
            className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <ZoomImage className="relative h-full min-h-[22rem] overflow-hidden rounded-2xl bg-ink-900">
              <Parallax speed={0.1} className="absolute inset-0">
                <Image
                  data-zoom-media
                  src={iso.image}
                  alt={iso.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </ZoomImage>
          </div>
          <BentoCard item={b} place="lg:col-start-3 lg:row-start-1" />
          <BentoCard item={c} place="lg:col-start-1 lg:row-start-2" />
          <BentoCard item={d} place="lg:col-start-3 lg:row-start-2" />
        </ScrollReveal>
      </div>
    </section>
  );
}
