"use client";

import { useFormStatus } from "react-dom";

/** Same pending-state idiom `LoginForm` already uses, generalized for reuse. */
export function SubmitButton({
  children,
  pendingLabel,
  variant = "primary",
  ...rest
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "secondary";
  name?: string;
  value?: string;
}) {
  const { pending } = useFormStatus();

  const styles =
    variant === "primary"
      ? "bg-brand-950 text-white hover:bg-brand-900"
      : "border border-ink-200 text-ink-700 hover:bg-ink-50";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles}`}
      {...rest}
    >
      {pending ? (pendingLabel ?? "Saving…") : children}
    </button>
  );
}
