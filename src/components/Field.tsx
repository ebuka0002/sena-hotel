import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface Shared { id: string; label: string; error?: string }

function Wrap({ id, label, error, children }: Shared & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-[#a4352a]">{error}</p>
      )}
    </div>
  );
}

const a11y = (id: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function TextField({ id, label, error, ...rest }: Shared & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap id={id} label={label} error={error}>
      <input id={id} className="field-input" {...a11y(id, error)} {...rest} />
    </Wrap>
  );
}

export function SelectField({ id, label, error, children, ...rest }: Shared & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap id={id} label={label} error={error}>
      <select id={id} className="field-input" {...a11y(id, error)} {...rest}>{children}</select>
    </Wrap>
  );
}

export function TextAreaField({ id, label, error, ...rest }: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap id={id} label={label} error={error}>
      <textarea id={id} className="field-input min-h-28 resize-y" {...a11y(id, error)} {...rest} />
    </Wrap>
  );
}
