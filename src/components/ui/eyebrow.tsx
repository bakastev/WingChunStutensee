import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: "default" | "accent" | "accent-strong" | "inverse" | "muted";
};

const toneClass = {
  default: "text-foreground",
  accent: "text-accent",
  /** For yellow accent on dark surfaces. */
  "accent-strong": "text-accent-strong",
  /** Dark text on light / yellow panels */
  inverse: "text-foreground-inverse/75",
  muted: "text-foreground-subtle",
} as const;

export function Eyebrow({
  className,
  tone = "default",
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-sans text-eyebrow font-medium uppercase tracking-[0.22em]",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
