"use client";

import { useState } from "react";

/**
 * The redesign's "Tell us what you need built" form.
 *
 * Same contract as EnquiryForm: there is no backend yet, so submitting composes
 * a prefilled email in the visitor's own mail client. Nothing is transmitted
 * by this component, and no personal data passes through us. Swap
 * `handleSubmit` for a POST to your CRM when you have one — see
 * CONTENT-TODO.md.
 */
export function ContactForm({
  contactEmail,
  submitLabel = "Book a consultation",
  helpPlaceholder = "Describe your challenge...",
  fullWidthButton = false,
}: {
  contactEmail: string;
  submitLabel?: string;
  helpPlaceholder?: string;
  fullWidthButton?: boolean;
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Enquiry from ${name}${company ? `, ${company}` : ""}`;
    const body = `${message}\n\n—\n${name}\n${email}${company ? `\n${company}` : ""}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "peer mt-2 block w-full border-0 border-b border-ink-200 bg-transparent px-0 pb-3 pt-1 text-base text-ink-900 placeholder:text-ink-300 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-0";
  const label = "block text-xs font-semibold uppercase tracking-[0.14em] text-ink-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label htmlFor="cf-name" className={label}>
          First name
        </label>
        <input id="cf-name" name="name" required autoComplete="given-name" placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          Work email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-company" className={label}>
          Company
        </label>
        <input id="cf-company" name="company" autoComplete="organization" placeholder="Company name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>
          What do you need help with?
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={2}
          placeholder={helpPlaceholder}
          className={`${field} resize-none`}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className={`rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-px hover:bg-brand-600 ${
            fullWidthButton ? "w-full" : ""
          }`}
        >
          {submitLabel}
        </button>
        <p className="mt-4 text-xs text-ink-500" role={sent ? "status" : undefined}>
          {sent
            ? "Your email client should have opened with the message ready to send."
            : "Opens your email client with the details filled in."}
        </p>
      </div>
    </form>
  );
}
