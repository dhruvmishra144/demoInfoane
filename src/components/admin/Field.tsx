/**
 * Label + error wrapper for a single form field.
 *
 * Errors are per-field here rather than the single top-level alert the login
 * form uses — that works for a 2-field form, not for an 11-field service editor.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-700">
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
