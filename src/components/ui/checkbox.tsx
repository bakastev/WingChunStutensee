import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

/** Square by design — the system has no rounded corners anywhere. */
export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-start gap-3 text-body-sm text-foreground-muted has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-55"
    >
      <span className="relative mt-0.5 flex size-[18px] shrink-0 items-center justify-center border border-border-strong bg-surface transition-colors duration-fast group-hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent">
        <input
          id={id}
          type="checkbox"
          className={cn("peer absolute inset-0 cursor-pointer opacity-0", className)}
          {...props}
        />
        <svg
          aria-hidden
          viewBox="0 0 14 14"
          className="size-3 text-accent-foreground opacity-0 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        >
          <path d="M2 7.4 5.4 11 12 3.4" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
}
