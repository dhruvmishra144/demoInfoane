"use client";

import { useState } from "react";
import { icons } from "./ui/Icons";
import { site } from "@/config/site";

/**
 * Enquiry form.
 *
 * There is no backend yet, and a form that silently posts nowhere loses leads —
 * so this one composes a prefilled email and hands it to the visitor's own mail
 * client. Nothing is transmitted anywhere by this component: the values never
 * leave the browser except into the visitor's outbox, which also means no
 * personal data passes through us before a privacy policy exists.
 *
 * Replace `handleSubmit` with a POST to your CRM or email provider when you have
 * one — the markup and validation can stay exactly as they are. See
 * CONTENT-TODO.md.
 */
export function EnquiryForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [sent, setSent] = useState(false);
  const dark = tone === "dark";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Enquiry from ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const fieldClass = dark
    ? "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
    : "w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  const labelClass = dark
    ? "block text-xs font-semibold text-ink-300"
    : "block text-xs font-semibold text-ink-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          className={`group inline-flex items-center gap-2.5 rounded-full py-2 pl-5 pr-2 text-sm font-semibold transition-colors duration-300 ${
            dark
              ? "bg-white text-brand-950 hover:bg-brand-50"
              : "bg-brand-950 text-white hover:bg-brand-900"
          }`}
        >
          Submit
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
              dark ? "bg-brand-600 text-white" : "bg-white/15 text-white"
            }`}
            aria-hidden="true"
          >
            <icons.arrow className="h-3.5 w-3.5" />
          </span>
        </button>

        {/* Told up front, so the mail-client hand-off is never a surprise. */}
        <p
          className={`text-xs ${dark ? "text-ink-400" : "text-ink-500"}`}
          role={sent ? "status" : undefined}
        >
          {sent
            ? "Your email client should have opened with the message ready to send."
            : "Opens your email client with the details filled in."}
        </p>
      </div>
    </form>
  );
}
