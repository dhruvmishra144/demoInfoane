/**
 * The confirmation shown after an enquiry form is submitted.
 *
 * Two modes, because the forms have two paths:
 *  - "sent": the server emailed the enquiry to the team (Brevo).
 *  - "mail": no email settings on the server yet, so the form opened a
 *            prefilled email in the visitor's own mail app instead, and the
 *            enquiry is only received once they press Send there.
 */
export const enquiryThanks = {
  title: "Thank you for reaching out to Infoane!",
  sent: "We've received your enquiry. Our team will get back to you within one business day.",
  mail: "Your email app will open with your enquiry ready to send. Please click Send to complete your submission. Once we receive your email, our team will get back to you within one business day.",
} as const;

export function EnquiryThanks({
  tone = "light",
  mode = "sent",
  body,
}: {
  tone?: "light" | "dark";
  mode?: "sent" | "mail";
  /** Replaces the default body copy, for forms that are not plain enquiries. */
  body?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`flex items-start gap-3.5 rounded-2xl p-4 ring-1 ring-inset ${
        dark ? "bg-white/[0.06] ring-white/15" : "bg-brand-50/70 ring-brand-100"
      }`}
    >
      <span
        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 12.5 4 4 8-9" />
        </svg>
      </span>
      <div>
        <p className={`text-[15px] font-bold leading-6 ${dark ? "text-white" : "text-ink-900"}`}>{enquiryThanks.title}</p>
        <p className={`mt-1 text-[13px] leading-5 ${dark ? "text-ink-300" : "text-ink-600"}`}>{body ?? enquiryThanks[mode]}</p>
      </div>
    </div>
  );
}

/** A failed send: shown instead of the confirmation, with the way to reach the team directly. */
export function EnquiryError({
  message,
  contactEmail,
  tone = "light",
}: {
  message: string;
  contactEmail: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <p className={`rounded-2xl p-4 text-[13px] leading-5 ring-1 ring-inset ${dark ? "bg-red-500/10 text-red-200 ring-red-400/30" : "bg-red-50 text-red-700 ring-red-200"}`}>
      {message}{" "}
      <a href={`mailto:${contactEmail}`} className="font-semibold underline underline-offset-2">
        {contactEmail}
      </a>
    </p>
  );
}
