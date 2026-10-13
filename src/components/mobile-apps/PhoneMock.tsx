import { Float } from "@/components/motion/effects";

/**
 * Two phones drawn in HTML/CSS for the Mobile App hero: a light app screen in
 * front, a dark one tilted behind it, with the platform chips floating around
 * them. The screens are skeleton UI (bars, cards, a tab bar) rather than
 * invented figures, so nothing here reads as a claim. Decorative, hidden from
 * assistive technology.
 */

function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-2 rounded-full ${className}`} />;
}

function Frame({ children, dark = false, className = "" }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`relative w-[220px] rounded-[2.6rem] bg-ink-900 p-[7px] shadow-[0_40px_80px_-24px_rgba(40,30,120,0.45)] ring-1 ring-white/25 ${className}`}>
      <div className={`relative aspect-[9/19] overflow-hidden rounded-[2.1rem] ${dark ? "bg-[#14152b]" : "bg-white"}`}>
        {/* Notch */}
        <span className="absolute left-1/2 top-2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-ink-900" />
        {children}
      </div>
    </div>
  );
}

function FrontScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-3 pt-9">
      <div className="flex items-center justify-between">
        <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#8d9dfa] to-[#c3a2fb]" />
        <Bar className="w-16 bg-ink-200" />
        <span className="h-7 w-7 rounded-full bg-ink-100" />
      </div>
      <div className="mt-5 space-y-1.5">
        <Bar className="w-24 bg-ink-900/80" />
        <Bar className="w-32 bg-ink-200" />
      </div>
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#8d9dfa] via-[#c3a2fb] to-[#ff9f78] p-4">
        <Bar className="w-14 bg-white/70" />
        <span className="mt-3 block h-6 w-24 rounded-md bg-white/85" />
        <div className="mt-4 flex gap-1.5">
          <span className="h-9 flex-1 rounded-lg bg-white/30" />
          <span className="h-9 flex-1 rounded-lg bg-white/30" />
          <span className="h-9 flex-1 rounded-lg bg-white/30" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-9 w-9 shrink-0 rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100" />
            <div className="flex-1 space-y-1.5">
              <Bar className="w-3/4 bg-ink-200" />
              <Bar className="w-1/2 bg-ink-100" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-around rounded-2xl bg-ink-50 px-3 py-2.5">
        <span className="h-4 w-4 rounded-md bg-brand-500" />
        <span className="h-4 w-4 rounded-md bg-ink-200" />
        <span className="h-4 w-4 rounded-md bg-ink-200" />
        <span className="h-4 w-4 rounded-md bg-ink-200" />
      </div>
    </div>
  );
}

function BackScreen() {
  const bars = [38, 56, 44, 70, 52, 82, 64];
  return (
    <div className="flex h-full flex-col px-4 pb-3 pt-9">
      <Bar className="w-20 bg-white/70" />
      <Bar className="mt-2 w-28 bg-white/20" />
      <div className="mt-5 flex h-28 items-end gap-2 rounded-2xl bg-white/[0.06] p-3">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-md bg-gradient-to-t from-brand-500 to-[#ffb08c]"
            style={{ height: `${h}%`, opacity: 0.55 + i * 0.06 }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-2.5">
            <span className="h-7 w-7 shrink-0 rounded-lg bg-white/15" />
            <div className="flex-1 space-y-1.5">
              <Bar className="w-2/3 bg-white/30" />
              <Bar className="w-1/3 bg-white/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhoneMock({ chips }: { chips: readonly string[] }) {
  const positions = [
    "left-0 top-[14%]",
    "right-0 top-[6%]",
    "left-[2%] bottom-[16%]",
    "right-[2%] bottom-[8%]",
  ];

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[460px] lg:ml-auto lg:mr-0" aria-hidden="true">
      <div className="absolute inset-x-[10%] top-[8%] h-[70%] rounded-full bg-gradient-to-br from-[#8d9dfa]/50 via-[#c3a2fb]/40 to-[#ff9f78]/45 blur-[70px]" />

      <Float className="absolute left-[2%] top-[6%] rotate-[-8deg]" amount={6} duration={7}>
        <Frame dark className="scale-[0.92]">
          <BackScreen />
        </Frame>
      </Float>
      <Float className="absolute right-[2%] top-[10%] rotate-[5deg]" amount={8} duration={6}>
        <Frame>
          <FrontScreen />
        </Frame>
      </Float>

      {chips.slice(0, positions.length).map((chip, i) => (
        <Float key={chip} className={`absolute ${positions[i]} z-10`} amount={10} duration={5 + i}>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/85 px-4 py-2 text-[13px] font-semibold text-ink-900 shadow-lg shadow-ink-900/10 ring-1 ring-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {chip}
          </span>
        </Float>
      ))}
    </div>
  );
}
