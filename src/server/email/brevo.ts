/**
 * Minimal Brevo transactional email client (https://developers.brevo.com,
 * POST /v3/smtp/email). Plain fetch, no SDK, so it runs on the Workers runtime.
 *
 * The API key is a secret: it is read from the Worker's environment by
 * `getEmailConfig` and is never logged or sent anywhere except Brevo.
 */

const ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export type BrevoAttachment = {
  name: string;
  /** Base64 file content. */
  content: string;
};

export type BrevoMessage = {
  apiKey: string;
  sender: { email: string; name: string };
  to: { email: string; name?: string };
  replyTo?: { email: string; name?: string };
  subject: string;
  text: string;
  html: string;
  attachments?: BrevoAttachment[];
};

export type BrevoResult = { ok: true } | { ok: false; status: number; code: string };

export async function sendBrevoEmail(message: BrevoMessage): Promise<BrevoResult> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": message.apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: message.sender,
      to: [message.to],
      replyTo: message.replyTo,
      subject: message.subject,
      textContent: message.text,
      htmlContent: message.html,
      attachment: message.attachments?.length ? message.attachments : undefined,
    }),
  });

  if (response.ok) return { ok: true };

  // Brevo answers with { code, message }. Only the code is kept: the message
  // can echo parts of the request, and this result ends up in server logs.
  let code = "unknown";
  try {
    const body = (await response.json()) as { code?: unknown };
    if (typeof body.code === "string") code = body.code;
  } catch {
    // Non-JSON error body: the status alone is enough.
  }
  return { ok: false, status: response.status, code };
}
