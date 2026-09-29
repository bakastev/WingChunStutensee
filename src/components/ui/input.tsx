import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const controlClass = [
  "w-full border border-border-strong bg-surface-muted px-4 py-3",
  "font-sans text-body text-foreground placeholder:text-foreground-subtle",
  "transition-colors duration-base ease-out-soft",
  "hover:border-accent/50",
  "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border-strong",
  "aria-[invalid=true]:border-accent aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-accent/40",
].join(" ");

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}
