import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {optional ? (
          <span className="ml-2 normal-case tracking-normal text-foreground-subtle">
            optional
          </span>
        ) : null}
      </Label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-body-sm text-foreground-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="flex items-start gap-2 text-body-sm text-accent"
          role="alert"
        >
          <span aria-hidden className="mt-px font-medium">
            !
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "font-sans text-eyebrow uppercase tracking-[0.16em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}
