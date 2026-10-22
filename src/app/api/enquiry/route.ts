import { NextResponse } from "next/server";
import { getEmailConfig } from "@/server/email/config";
import { sendBrevoEmail, type BrevoAttachment } from "@/server/email/brevo";

/**
 * POST /api/enquiry: every enquiry form on the site (contact, general and
 * per-job applications) posts multipart form data here, and this sends it to
 * the team's inbox through Brevo.
 *
 * Responses (JSON):
 *   200 { ok: true }                         sent (or silently dropped: honeypot)
 *   400 { error: "invalid", message }        a field failed validation
 *   403 { error: "forbidden" }               cross-origin request
 *   502 { error: "send_failed", message }    Brevo refused or was unreachable
 *   503 { error: "not_configured" }          no Brevo settings yet; the forms
 *                                            then fall back to the email app
 *
 * Nothing the visitor typed is logged: failures log only Brevo's status and
 * error code.
 */

const MAX_CV_BYTES = 4 * 1024 * 1024; // Brevo caps the attachments on one email at about 4 MB.
const CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

const LIMITS = { name: 100, email: 200, company: 150, phone: 40, area: 150, jobTitle: 200, message: 5000 };

type Kind = "contact" | "application-job" | "application-general";

class Invalid extends Error {}

/** A trimmed single-line value: control characters (incl. line breaks) become spaces. */
function line(form: FormData, key: keyof typeof LIMITS, { required = false } = {}): string {
  const raw = form.get(key);
  const value = (typeof raw === "string" ? raw : "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
  if (required && !value) throw new Invalid(`Please fill in the ${key === "jobTitle" ? "position" : key} field.`);
  if (value.length > LIMITS[key]) throw new Invalid(`The ${key} field is too long.`);
  return value;
}

/** A trimmed multi-line value; line breaks are kept. */
function block(form: FormData, key: string, max: number, { required = false } = {}): string {
  const raw = form.get(key);
  const value = (typeof raw === "string" ? raw : "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
  if (required && !value) throw new Invalid("Please fill in all the required fields.");
  if (value.length > max) throw new Invalid("Your message is too long.");
  return value;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toHtml(rows: [string, string][], body: string, bodyLabel: string): string {
  const table = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6e7180;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#12131a"><table cellspacing="0" cellpadding="0">${table}</table><p style="margin:20px 0 4px;color:#6e7180">${escapeHtml(bodyLabel)}</p><div style="white-space:pre-wrap">${escapeHtml(body)}</div></div>`;
}

function toText(rows: [string, string][], body: string, bodyLabel: string): string {
  const head = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  return `${head}\n\n${bodyLabel}:\n${body}`;
}

export async function POST(request: Request) {
  // Same-origin only: the forms live on this site, nothing else should post here.
  const origin = request.headers.get("origin");
  if (origin) {
    let sameOrigin = false;
    try {
      sameOrigin = new URL(origin).host === new URL(request.url).host;
    } catch {
      // Malformed Origin header: treated as cross-origin.
    }
    if (!sameOrigin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid", message: "That submission could not be read." }, { status: 400 });
  }

  // Honeypot: a field real visitors never see. Bots fill it; they get a success
  // response and nothing is sent.
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true });

  let subject: string;
  let text: string;
  let html: string;
  let replyTo: { email: string; name: string };
  const attachments: BrevoAttachment[] = [];

  try {
    const kind = String(form.get("kind") ?? "") as Kind;
    if (kind !== "contact" && kind !== "application-job" && kind !== "application-general") {
      throw new Invalid("Unknown form.");
    }

    const name = line(form, "name", { required: true });
    const email = line(form, "email", { required: true });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Invalid("Please enter a valid email address.");
    replyTo = { email, name };

    if (kind === "contact") {
      const company = line(form, "company");
      const message = block(form, "message", LIMITS.message, { required: true });
      subject = `Enquiry from ${name}${company ? `, ${company}` : ""}`;
      const rows: [string, string][] = [
        ["Name", name],
        ["Email", email],
        ["Company", company],
      ];
      text = toText(rows, message, "Message");
      html = toHtml(rows, message, "Message");
    } else {
      const phone = line(form, "phone");
      const bio = block(form, "bio", LIMITS.message, { required: true });
      const jobTitle = kind === "application-job" ? line(form, "jobTitle", { required: true }) : "";
      const area = kind === "application-general" ? line(form, "area", { required: true }) : "";
      subject =
        kind === "application-job" ? `Application: ${jobTitle} | ${name}` : `General application: ${area} | ${name}`;
      const rows: [string, string][] = [
        ["Type", kind === "application-job" ? "Application for a position" : "General application"],
        ["Position", jobTitle],
        ["Area of expertise / interest", area],
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
      ];
      const bodyLabel = kind === "application-job" ? "Short bio" : "Short bio & experience";
      text = toText(rows, bio, bodyLabel);
      html = toHtml(rows, bio, bodyLabel);

      const cv = form.get("cv");
      if (!(cv instanceof File) || cv.size === 0) throw new Invalid("Please attach your CV or resume.");
      const lower = cv.name.toLowerCase();
      if (!CV_EXTENSIONS.some((ext) => lower.endsWith(ext))) throw new Invalid("Your CV must be a .pdf, .doc or .docx file.");
      if (cv.size > MAX_CV_BYTES) throw new Invalid("Your CV must be 4MB or smaller.");
      const bytes = new Uint8Array(await cv.arrayBuffer());
      let binary = "";
      for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      attachments.push({ name: cv.name.replace(/[^\w.\- ()]+/g, "_").slice(0, 120), content: btoa(binary) });
    }
  } catch (error) {
    if (error instanceof Invalid) {
      return NextResponse.json({ error: "invalid", message: error.message }, { status: 400 });
    }
    throw error;
  }

  const config = getEmailConfig();
  if (!config) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const result = await sendBrevoEmail({
      apiKey: config.apiKey,
      sender: { email: config.from, name: config.fromName },
      to: { email: config.to },
      replyTo,
      subject,
      text,
      html,
      attachments,
    });
    if (!result.ok) {
      console.error(`[enquiry] Brevo rejected the email: status ${result.status}, code ${result.code}`);
      return NextResponse.json(
        { error: "send_failed", message: "We couldn't send your message just now. Please try again, or email us directly." },
        { status: 502 },
      );
    }
  } catch {
    console.error("[enquiry] Brevo could not be reached");
    return NextResponse.json(
      { error: "send_failed", message: "We couldn't send your message just now. Please try again, or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
