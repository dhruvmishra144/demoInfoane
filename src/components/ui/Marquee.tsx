/**
 * Infinite horizontal marquee, CSS-only — no JavaScript, so it costs nothing on
 * the main thread.
 *
 * The track renders the children twice and translates by -50%, which loops
 * seamlessly. The duplicate is hidden from assistive technology so a screen
 * reader hears the list once.
 */
export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="marquee relative overflow-hidden"
      // Fade the edges instead of cutting logos off hard.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center">
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
