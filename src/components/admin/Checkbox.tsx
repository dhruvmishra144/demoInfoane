import type { InputHTMLAttributes } from "react";

/** Boolean fields like `clientNameApproved` / `popular` — a labelled checkbox row. */
export function Checkbox({
  label,
  id,
  className = "",
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2.5 text-sm text-ink-700 ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-2 focus:ring-brand-500/30"
        {...props}
      />
      {label}
    </label>
  );
}
