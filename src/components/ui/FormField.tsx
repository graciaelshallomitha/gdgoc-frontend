import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Figma form field: 14px Medium label, 10px gap, 54px input. */
export function FormField({ id, label, required = false, error, children, className = "" }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2.5 block text-sm font-medium leading-[18px]">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function inputStyles(invalid: boolean, size = "h-[54px]") {
  return `block w-full rounded-lg border bg-white px-4 text-[15px] placeholder:text-muted ${size} ${
    invalid ? "border-red-600" : "border-line"
  }`;
}