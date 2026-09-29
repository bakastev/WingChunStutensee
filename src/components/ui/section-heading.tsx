import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "default" | "inverse";
  align?: "start" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "default",
  align = "start",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone === "inverse" ? "inverse" : "muted"}
          className="mb-3 tracking-[0.22em]"
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "font-display text-h2",
          tone === "inverse" ? "text-foreground-inverse" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <Rule
        tone="accent"
        length="sm"
        className={cn("mt-5", align === "center" && "self-center")}
      />
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-body-sm leading-[1.7] sm:text-body",
            tone === "inverse"
              ? "text-foreground-inverse/75"
              : "text-foreground-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
