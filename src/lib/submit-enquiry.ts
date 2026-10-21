/**
 * Client helper for the enquiry forms: posts the form data to /api/enquiry.
 *
 * Results:
 *  - "sent"   the server emailed the enquiry to the team.
 *  - "mail"   the server has no email settings yet (503 not_configured). The
 *             caller falls back to a prefilled email in the visitor's own mail
 *             app, which is how the forms worked before Brevo was added.
 *  - "error"  validation failed, or sending did; `message` is safe to show.
 */
export type SubmitResult = { status: "sent" } | { status: "mail" } | { status: "error"; message: string };

const GENERIC_ERROR = "Something went wrong sending your message. Please try again, or email us directly.";

export async function submitEnquiry(data: FormData): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/enquiry", { method: "POST", body: data });
    if (response.ok) return { status: "sent" };

    const body = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
    if (response.status === 503 && body.error === "not_configured") return { status: "mail" };
    return { status: "error", message: body.message || GENERIC_ERROR };
  } catch {
    return { status: "error", message: "We couldn't reach the server. Please check your connection and try again." };
  }
}

/** The CV size limit (Brevo caps the attachments on one email at about 4 MB). */
export const MAX_CV_BYTES = 4 * 1024 * 1024;
