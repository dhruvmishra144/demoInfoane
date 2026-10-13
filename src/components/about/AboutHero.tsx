import Image from "next/image";
import { Intro } from "@/components/motion/Intro";
import { Parallax } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/** Fine film grain, so the soft gradients never band and feel printed, not flat. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The hero's light: an aurora of brand colour that runs right up behind the
 * floating header (the header is a glass pill, so it frosts whatever sits
 * behind it), the glass render fading in from the right, a pale veil on the
 * left for the copy, grain, and a soft fade into the page below.
 */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f7f5fc]" aria-hidden="true">
      <div
        className="aurora-blob absolute -left-[8%] -top-[28%] h-[95%] w-[48%] rounded-full bg-[#9aa8fb]/45 blur-[90px]"
        style={{ "--t": "24s" } as React.CSSProperties}
      />
      <div
        className="aurora-blob absolute -right-[6%] -top-[22%] h-[85%] w-[42%] rounded-full bg-[#ffb08c]/40 blur-[100px]"
        style={{ "--t": "28s", "--d": "-9s" } as React.CSSProperties}
      />
      <div
        className="aurora-blob absolute -bottom-[38%] left-[28%] h-[85%] w-[46%] rounded-full bg-[#c4a6fa]/40 blur-[100px]"
        style={{ "--t": "31s", "--d": "-17s" } as React.CSSProperties}
      />

      <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[6%]">
        <Image
          src="/images/glass-backdrop.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [mask-image:linear-gradient(90deg,transparent_22%,#000_62%)] [-webkit-mask-image:linear-gradient(90deg,transparent_22%,#000_62%)]"
          style={{ objectPosition: "85% 70%" }}
        />
      </Parallax>

      {/* Pale veil: the copy sits on near-white, the colour builds to the right. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,250,254,0.94)_0%,rgba(251,250,254,0.78)_34%,rgba(251,250,254,0.25)_60%,transparent_80%)]" />
      <div
        className="absolute inset-0 opacity-[0.28] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />
      {/* Melts into the page rather than ending on a hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

/**
 * About hero. It starts at the very top of the page (pulled up under the
 * 84px header) so its background shows behind the header; the copy is padded
 * back down by the same amount. Headline rises line by line, the paragraph
 * sits at the foot of the hero, and the "Vision & mission" marker follows in
 * its own strip before the dark Mission panel.
 */
export function AboutHero() {
  const hero = aboutPage.hero;

  return (
    <>
      <section className="relative isolate -mt-[84px] overflow-hidden">
        <HeroBackdrop />
        <Intro className="container-x flex min-h-[562px] flex-col pb-7 pt-[132px] lg:pt-[178px]">
          <div data-intro>
            <Eyebrow dot>{hero.eyebrow}</Eyebrow>
          </div>
          <h1
            data-intro="lines"
            className="mt-6 max-w-[34rem] text-[2.25rem] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[2.5rem]"
          >
            {hero.title}
          </h1>
          <p data-intro className="mt-10 max-w-[30rem] text-[15px] leading-6 text-ink-600 lg:mt-auto">
            {hero.body}
          </p>
        </Intro>
      </section>

      <div className="container-x pb-1.5 pt-8">
        <Eyebrow dot>{aboutPage.visionMission}</Eyebrow>
      </div>
    </>
  );
}
