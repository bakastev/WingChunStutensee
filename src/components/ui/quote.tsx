import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Rule } from "@/components/ui/rule";

type QuoteProps = HTMLAttributes<HTMLQuoteElement> & {
  attribution?: string;
  tone?: "default" | "inverse" | "on-muted";
  showRule?: boolean;
};

const toneClass = {
  default: "text-foreground",
  inverse: "text-foreground-inverse",
  "on-muted": "text-foreground",
} as const;

export function Quote({
  className,
  attribution,
  tone = "default",
  showRule = true,
  children,
  ...props
}: QuoteProps) {
  return (
    <figure className={cn("flex flex-col gap-3.5", className)}>
      {showRule ? <Rule tone="accent" length="sm" /> : null}
      <blockquote
        className={cn(
          "font-quote text-[1.125rem] italic leading-[1.4] sm:text-quote sm:leading-[1.35]",
          toneClass[tone],
        )}
        {...props}
      >
        {children}
      </blockquote>
      {attribution ? (
        <figcaption
          className={cn(
            "font-sans text-[0.625rem] uppercase tracking-[0.2em]",
            tone === "inverse"
              ? "text-foreground-inverse/65"
              : "text-foreground-subtle",
          )}
        >
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
