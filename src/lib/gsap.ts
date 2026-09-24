import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Registers GSAP plugins exactly once. Only ever import this from client
 * components — pulling it into a server component would ship GSAP into the
 * server bundle for no reason and, worse, risks `window` being touched during
 * SSR (React 19 tree-shakes unused client imports out of server chunks, but
 * this file should stay a clear boundary rather than rely on that).
 */
let registered = false;

export function ensureGsapRegistered() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, ScrollToPlugin);
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, ScrollSmoother, ScrollToPlugin };
