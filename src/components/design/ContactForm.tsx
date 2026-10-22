"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { EnquiryError, EnquiryThanks } from "./EnquiryThanks";

/**
 * The redesign's "Tell us what you need built" form.
 *
 * Posts to /api/enquiry, which emails the team through Brevo. Until the server
 * has its email settings (it answers 503 "not_configured"), it falls back to
 * composing a prefilled email in the visitor's own mail app, as it did before.
 */
type Phase = "idle" | "sending" | "sent" | "mail" | "error";

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
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("kind", "contact");
    setPhase("sending");
    setErrorMessage("");

    const result = await submitEnquiry(data);
    if (result.status === "sent") {
      form.reset();
      setPhase("sent");
      return;
    }
    if (result.status === "mail") {
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const company = String(data.get("company") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();
      const subject = `Enquiry from ${name}${company ? `, ${company}` : ""}`;
      const body = `${message}\n\n--\n${name}\n${email}${company ? `\n${company}` : ""}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setPhase("mail");
      return;
    }
    setErrorMessage(result.message);
    setPhase("error");
  }

  const field =
    "peer mt-0.5 block w-full border-0 border-b border-ink-200 bg-transparent px-0 pb-[6px] pt-0 text-[15px] leading-6 text-ink-900 placeholder:text-ink-300 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-0";
  const label = "block text-[12px] font-semibold uppercase leading-4 tracking-[0.14em] text-ink-600";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      {/* Honeypot: invisible to people, filled in by bots. Never remove or label it. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
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

      <div className="pt-3">
        <button
          type="submit"
          disabled={phase === "sending"}
          className={`rounded-full bg-brand-500 text-[14px] font-semibold leading-6 text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-px hover:bg-brand-600 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 ${
            fullWidthButton ? "w-full px-8 py-4" : "px-6 py-3"
          }`}
        >
          {phase === "sending" ? "Sending..." : submitLabel}
        </button>
        {/* A live region, so the result is announced when it appears. */}
        <div role="status" aria-live="polite" className={phase === "idle" || phase === "sending" ? undefined : "mt-5"}>
          {(phase === "sent" || phase === "mail") && <EnquiryThanks mode={phase} />}
          {phase === "error" && <EnquiryError message={errorMessage} contactEmail={contactEmail} />}
        </div>
      </div>
    </form>
  );
}
