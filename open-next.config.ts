import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

/**
 * Cloudflare adapter configuration.
 *
 * This is what keeps the site SEO-fast once content lives in D1. Public pages are
 * rendered once and served from the incremental cache as complete HTML — a crawler
 * gets the same full document it does today. When an approver publishes, the admin
 * panel calls revalidateTag() and only the affected pages regenerate. Nothing is
 * fetched client-side.
 *
 * Why ISR rather than pure build-time SSG: with SSG the content would be frozen at
 * deploy time, so every copy change would need a redeploy. Worse, the adapter uses
 * *local* binding values during the build unless remote bindings are enabled, so a
 * build could silently prerender development data.
 *
 * - KV for the incremental cache: no Cloudflare product to enable, unlike R2. The
 *   trade-off is that KV is eventually consistent, so a just-published change can
 *   briefly appear for some visitors and not others. Fine for now; swap back to
 *   `r2-incremental-cache` once R2 is enabled on the production account.
 * - Regional cache in front of KV to cut latency on repeat reads.
 * - D1 tag cache is the right scale for this site. If the page count ever grows
 *   into the thousands, switch to the sharded Durable Object implementation.
 */
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, {
    mode: "long-lived",
  }),
  tagCache: d1NextTagCache,
  queue: doQueue,
});
