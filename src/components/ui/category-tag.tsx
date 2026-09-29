import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CategoryTagProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "accent" | "inverse";
};

export function CategoryTag({
  className,
  tone = "accent",
  children,
  ...props
}: CategoryTagProps) {
  return (
    <span
      className={cn(
        "font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em]",
        tone === "accent" ? "text-accent" : "text-accent-strong",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
