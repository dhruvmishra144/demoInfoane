import Image from "next/image";
import { Parallax } from "@/components/motion/effects";

/** Fine film grain, so the soft gradients never band and feel printed, not flat. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The hero's light. A colour wash runs right up behind the floating header
 * (the header is a glass pill, so it frosts whatever sits behind it); the
 * glass sphere-and-orbit render is scaled up and framed on the right; a faint
 * dot grid, grain, and a pale pool behind the copy finish it, and the bottom
 * melts into the page. Pass `art={false}` to drop the glass render when the
 * hero carries its own visual on the right.
 */
export function HeroBackdrop({ art = true }: { art?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#eeeafb]" aria-hidden="true">
      <div
        className="aurora-blob absolute -left-[10%] -top-[40%] h-[110%] w-[55%] rounded-full bg-[#8d9dfa]/75 blur-[80px]"
        style={{ "--t": "24s" } as React.CSSProperties}
      />
      <div
        className="aurora-blob absolute -top-[45%] left-[32%] h-[90%] w-[38%] rounded-full bg-[#c3a2fb]/65 blur-[90px]"
        style={{ "--t": "31s", "--d": "-17s" } as React.CSSProperties}
      />
      <div
        className="aurora-blob absolute -right-[8%] -top-[30%] h-[100%] w-[46%] rounded-full bg-[#ff9f78]/60 blur-[90px]"
        style={{ "--t": "28s", "--d": "-9s" } as React.CSSProperties}
      />

      {art && (
        <>
          {/* The render's upper-right cluster (sphere, orbit, disc), scaled up and
              anchored to the right edge. */}
          <Parallax speed={0.08} className="absolute inset-y-0 right-0 w-[78%]">
            <div className="absolute inset-0 origin-top-right scale-[1.35]">
              <Image
                src="/images/glass-backdrop.webp"
                alt=""
                fill
                priority
                sizes="80vw"
                className="object-cover [mask-image:linear-gradient(90deg,transparent_6%,#000_46%)] [-webkit-mask-image:linear-gradient(90deg,transparent_6%,#000_46%)]"
                style={{ objectPosition: "100% 12%" }}
              />
            </div>
          </Parallax>
        </>
      )}

      {/* A faint dot grid, strongest at the upper right and gone toward the copy. */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(90,80,200,0.22)_1px,transparent_1.2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_55%_75%_at_88%_20%,#000,transparent)] [-webkit-mask-image:radial-gradient(ellipse_55%_75%_at_88%_20%,#000,transparent)]" />

      {/* A pale pool behind the copy so it stays crisp. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_62%_at_17%_58%,rgba(250,249,254,0.92),rgba(250,249,254,0.55)_60%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-[0.28] mix-blend-soft-light" style={{ backgroundImage: GRAIN }} />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
