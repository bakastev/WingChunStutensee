import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "@/components/ui/input";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(controlClass, "appearance-none pr-11", className)}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.625rem] text-foreground-subtle"
      >
        ▼
      </span>
    </div>
  );
}
