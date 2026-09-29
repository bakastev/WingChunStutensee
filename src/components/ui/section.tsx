import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: "default" | "muted" | "band" | "inverse" | "accent";
  pad?: "md" | "lg" | "xl";
};

const toneClass = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  band: "bg-surface-band text-foreground",
  /** Light contrast panel on dark site */
  inverse: "bg-surface-inverse text-foreground-inverse",
  /** Yellow band — dark text on accent */
  accent: "bg-surface-accent text-accent-foreground",
} as const;

const padClass = {
  md: "py-8 sm:py-12 md:py-16",
  lg: "py-9 sm:py-14 md:py-20",
  xl: "py-10 sm:py-16 md:py-24 lg:py-28",
} as const;

export function Section({
  className,
  tone = "default",
  pad = "lg",
  children,
  ...props
}: SectionProps) {
  const isLight = tone === "inverse" || tone === "accent";

  return (
    <section
      data-surface={isLight ? "light" : undefined}
      className={cn(toneClass[tone], padClass[pad], className)}
      {...props}
    >
      {children}
    </section>
  );
}
