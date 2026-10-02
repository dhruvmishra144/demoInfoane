"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { routes } from "@/lib/routes";

/**
 * Application form for both careers flows: the general (speculative)
 * application and the per-job "Apply for this position" form.
 *
 * Same contract as ContactForm and EnquiryForm: there is no backend yet, so
 * submitting composes a prefilled email in the visitor's own mail client.
 * Nothing is transmitted by this component. A browser cannot attach a file to
 * a mailto: link, so the CV is validated here (type and size) but must be
 * attached by the applicant in the email that opens — the helper text says so.
 * Swap `handleSubmit` for a POST (with the file) when a real endpoint exists.
 */

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

type Props = {
  contactEmail: string;
  title: string;
  lead?: string;
} & (
  | { variant: "general"; expertise: string[]; jobTitle?: undefined }
  | { variant: "job"; jobTitle: string; expertise?: undefined }
);

function cvError(file: File | undefined): string {
  if (!file) return "Please choose your CV or resume.";
  const lower = file.name.toLowerCase();
  if (!ALLOWED_EXT.some((ext) => lower.endsWith(ext))) {
    return "Your CV must be a .pdf, .doc or .docx file.";
  }
  if (file.size > MAX_BYTES) return "Your CV must be 10MB or smaller.";
  return "";
}

export function ApplicationForm(props: Props) {
  const { contactEmail, title, lead, variant } = props;
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [fileError, setFileError] = useState("");
  const [consentError, setConsentError] = useState("");

  const id = (name: string) => `${uid}-${name}`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const file = (data.get("cv") as File | null) ?? undefined;
    const fileProblem = cvError(file && file.size > 0 ? file : undefined);
    const consent = data.get("consent") === "on";
    setFileError(fileProblem);
    setConsentError(consent ? "" : "Please accept the Terms & Conditions and Privacy Policy.");
    if (fileProblem || !consent) return;

    const get = (key: string) => String(data.get(key) ?? "").trim();
    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const bio = get("bio");
    const cvName = file?.name ?? "";

    let subject: string;
    let body: string;
    if (variant === "job") {
      subject = `Application: ${props.jobTitle} — ${name}`;
      body = [
        `Position: ${props.jobTitle}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Short bio:",
        bio,
        "",
        `CV: ${cvName} (please attach this file before sending)`,
      ].join("\n");
    } else {
      const area = get("area");
      subject = `General application: ${area} — ${name}`;
      body = [
        "General application",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Area of expertise / interest: ${area}`,
        "",
        "Short bio & experience:",
        bio,
        "",
        `CV: ${cvName} (please attach this file before sending)`,
      ].join("\n");
    }

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const label = "block text-sm font-semibold text-ink-900";
  const field =
    "mt-2 block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 transition-colors duration-300 hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25 aria-[invalid=true]:border-red-500";
  const req = (
    <span className="text-brand-500" aria-hidden="true">
      {" "}
      *
    </span>
  );

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={id("title")}
      className="rounded-[2rem] border border-ink-200/80 bg-white p-7 shadow-xl shadow-ink-900/5 sm:p-8"
    >
      <h2 id={id("title")} className="text-2xl font-bold">
        {title}
      </h2>
      {lead && <p className="mt-3 text-sm leading-relaxed text-ink-600">{lead}</p>}

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor={id("name")} className={label}>
            Full name{req}
          </label>
          <input
            id={id("name")}
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={id("email")} className={label}>
            Email address{req}
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone number{req}
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="e.g. +1 (555) 000-0000"
            className={field}
          />
        </div>

        {variant === "general" && (
          <div>
            <label htmlFor={id("area")} className={label}>
              Area of expertise / interest{req}
            </label>
            <select
              id={id("area")}
              name="area"
              required
              defaultValue=""
              className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236e7180%22 stroke-width=%222.2%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10 invalid:text-ink-400`}
            >
              <option value="" disabled>
                Select your primary discipline...
              </option>
              {props.expertise.map((item) => (
                <option key={item} value={item} className="text-ink-900">
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor={id("bio")} className={label}>
            {variant === "general" ? "Short bio & experience" : "Short bio"}
            {req}
          </label>
          <textarea
            id={id("bio")}
            name="bio"
            required
            rows={4}
            placeholder={
              variant === "general"
                ? "Tell us about your background, the tech stacks you love, and the projects you're proud of..."
                : "Tell us about yourself and your experience..."
            }
            className={`${field} resize-y`}
          />
        </div>

        <div>
          <label htmlFor={id("cv")} className={label}>
            Upload CV/resume{req}
          </label>
          <div className="mt-2 rounded-xl border border-dashed border-ink-300 bg-ink-50/60 p-3 transition-colors focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/25">
            <input
              id={id("cv")}
              name="cv"
              type="file"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              aria-describedby={`${id("cv-help")}${fileError ? ` ${id("cv-error")}` : ""}`}
              aria-invalid={fileError ? true : undefined}
              onChange={(event) => {
                const file = event.target.files?.[0];
                setFileError(file ? cvError(file) : "");
              }}
              className="block w-full cursor-pointer text-sm text-ink-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border file:border-ink-200 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink-900 hover:file:border-ink-300"
            />
          </div>
          <p id={id("cv-help")} className="mt-2 text-xs text-ink-500">
            Allowed types: .pdf, .doc, .docx (max 10MB). Your browser can&rsquo;t attach files to an
            email for us, so attach your CV in the email that opens.
          </p>
          {fileError && (
            <p id={id("cv-error")} role="alert" className="mt-1 text-xs font-medium text-red-600">
              {fileError}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              required
              aria-describedby={consentError ? id("consent-error") : undefined}
              onChange={() => setConsentError("")}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-ink-300 accent-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            />
            <label htmlFor={id("consent")} className="text-sm text-ink-700">
              I accept the{" "}
              <Link href={routes.terms} className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href={routes.privacy} className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700">
                Privacy Policy
              </Link>
              {req}
            </label>
          </div>
          {consentError && (
            <p id={id("consent-error")} role="alert" className="mt-1 text-xs font-medium text-red-600">
              {consentError}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-px hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        Submit Application
      </button>
      <p className="mt-4 text-xs text-ink-500" role={sent ? "status" : undefined}>
        {sent
          ? "Your email client should have opened with your application ready to send. Remember to attach your CV."
          : "Opens your email client with your details filled in. Nothing is sent until you send the email."}
      </p>
    </form>
  );
}
