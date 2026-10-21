"use client";

import { useState } from "react";
import { icons } from "./ui/Icons";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { EnquiryError, EnquiryThanks } from "./design/EnquiryThanks";

/**
 * Enquiry form.
 *
 * Posts to /api/enquiry, which emails the team through Brevo. Until the server
 * has its email settings (it answers 503 "not_configured"), it falls back to
 * composing a prefilled email and handing it to the visitor's own mail client,
 * so a lead is never silently lost.
 */
type Phase = "idle" | "sending" | "sent" | "mail" | "error";

export function EnquiryForm({
  tone = "dark",
  contactEmail,
}: {
  tone?: "dark" | "light";
  contactEmail: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const dark = tone === "dark";

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
      const name = String(data.get("name") ?? "");
      const email = String(data.get("email") ?? "");
      const message = String(data.get("message") ?? "");
      const subject = `Enquiry from ${name}`;
      const body = `${message}\n\n--\n${name}\n${email}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setPhase("mail");
      return;
    }
    setErrorMessage(result.message);
    setPhase("error");
  }

  const fieldClass = dark
    ? "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
    : "w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  const labelClass = dark
    ? "block text-xs font-semibold text-ink-300"
    : "block text-xs font-semibold text-ink-600";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
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
        <label htmlFor="enquiry-name" className={labelClass}>
          Name
        </label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={`mt-1.5 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="enquiry-email" className={labelClass}>
          Email
        </label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={`mt-1.5 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="enquiry-message" className={labelClass}>
          What are you trying to fix?
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={4}
          placeholder="The system or process causing the problem, the outcome you need, and any date driving it."
          className={`mt-1.5 resize-y ${fieldClass}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={phase === "sending"}
          className={`group inline-flex items-center gap-2.5 rounded-full py-2 pl-5 pr-2 text-sm font-semibold transition-colors duration-300 disabled:cursor-wait disabled:opacity-70 ${
            dark
              ? "bg-white text-brand-950 hover:bg-brand-50"
              : "bg-brand-950 text-white hover:bg-brand-900"
          }`}
        >
          {phase === "sending" ? "Sending..." : "Submit"}
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
              dark ? "bg-brand-600 text-white" : "bg-white/15 text-white"
            }`}
            aria-hidden="true"
          >
            <icons.arrow className="h-3.5 w-3.5" />
          </span>
        </button>

      </div>

      {/* A live region, so the result is announced when it appears. */}
      <div role="status" aria-live="polite">
        {(phase === "sent" || phase === "mail") && <EnquiryThanks tone={tone} mode={phase} />}
        {phase === "error" && <EnquiryError message={errorMessage} contactEmail={contactEmail} tone={tone} />}
      </div>
    </form>
  );
}
