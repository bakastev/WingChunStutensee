import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type RuleProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  tone?: "accent" | "ink" | "inverse" | "muted";
  length?: "sm" | "md" | "lg" | "full";
};

const toneClass = {
  accent: "bg-accent",
  ink: "bg-foreground",
  inverse: "bg-foreground-inverse",
  muted: "bg-border-strong",
} as const;

const lengthClass = {
  horizontal: {
    sm: "w-7",
    md: "w-11",
    lg: "w-16",
    full: "w-full",
  },
  vertical: {
    sm: "h-7",
    md: "h-11",
    lg: "h-16",
    full: "h-full",
  },
} as const;

export function Rule({
  className,
  orientation = "horizontal",
  tone = "accent",
  length = "md",
  ...props
}: RuleProps) {
  return (
    <div
      aria-hidden
      className={cn(
        orientation === "horizontal" ? "h-px" : "w-px",
        toneClass[tone],
        lengthClass[orientation][length],
        className,
      )}
      {...props}
    />
  );
}
