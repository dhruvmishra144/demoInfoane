import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Email settings, read from the Worker's environment:
 *
 *  - BREVO_API_KEY       secret   `npx wrangler secret put BREVO_API_KEY`
 *  - ENQUIRY_FROM_EMAIL  secret   a sender address verified in Brevo
 *                                 `npx wrangler secret put ENQUIRY_FROM_EMAIL`
 *  - ENQUIRY_TO_EMAIL    var      the inbox that receives enquiries
 *  - ENQUIRY_FROM_NAME   var      optional display name for the sender
 *
 * In `next dev` the same names can be set in `.dev.vars`. Values still holding
 * the `REPLACE_WITH_...` placeholder from wrangler.jsonc count as unset, so a
 * site deployed before Brevo is set up reports "not configured" (and the forms
 * fall back to the visitor's email app) instead of failing.
 */

export type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
  fromName: string;
};

function read(name: string): string | undefined {
  let value: unknown;
  try {
    // Skipped in dev:static, where the Workers runtime is not running and
    // asking for it would try to start wrangler.
    if (process.env.CF_SKIP_BINDINGS !== "1") {
      value = (getCloudflareContext().env as unknown as Record<string, unknown>)[name];
    }
  } catch {
    // No Cloudflare context: fall through to process.env.
  }
  value ??= process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed && !trimmed.startsWith("REPLACE_WITH") ? trimmed : undefined;
}

export function getEmailConfig(): EmailConfig | null {
  const apiKey = read("BREVO_API_KEY");
  const to = read("ENQUIRY_TO_EMAIL");
  const from = read("ENQUIRY_FROM_EMAIL");
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from, fromName: read("ENQUIRY_FROM_NAME") ?? "Infoane Website" };
}
