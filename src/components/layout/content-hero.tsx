import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { cn } from "@/lib/cn";

type ContentHeroProps = {
  backHref: string;
  backLabel: string;
  eyebrow?: string;
  eyebrowNode?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  lead?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

/** Elevated dark header for detail pages (Aktuelles etc.). */
export function ContentHero({
  backHref,
  backLabel,
  eyebrow,
  eyebrowNode,
  title,
  subtitle,
  lead,
  meta,
  actions,
  className,
}: ContentHeroProps) {
  return (
    <header
      className={cn(
        "border-b border-border bg-surface-muted text-foreground",
        className,
      )}
    >
      <Container className="py-9 sm:py-14 lg:py-20">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.16em] text-foreground-subtle transition-colors duration-fast hover:text-accent"
        >
          <span aria-hidden>←</span> {backLabel}
        </Link>

        {meta ? <div className="mt-5 sm:mt-7">{meta}</div> : null}

        {eyebrowNode ? (
          <div className={cn(meta ? "mt-4" : "mt-5 sm:mt-7")}>{eyebrowNode}</div>
        ) : eyebrow ? (
          <Eyebrow
            tone="accent-strong"
            className={cn("tracking-[0.28em]", meta ? "mt-4" : "mt-5 sm:mt-7")}
          >
            {eyebrow}
          </Eyebrow>
        ) : null}

        <h1 className="mt-3 max-w-3xl font-display text-[1.625rem] leading-[1.18] text-balance text-foreground sm:mt-4 sm:text-[1.875rem] sm:leading-[1.15] md:text-h1 md:leading-[1.08]">
          {title}
        </h1>

        {subtitle ? <div className="mt-3">{subtitle}</div> : null}

        <Rule tone="accent" length="md" className="mt-5 sm:mt-6" />

        {lead ? (
          <p className="mt-5 max-w-2xl text-pretty text-[0.9375rem] leading-[1.75] text-foreground-muted sm:mt-6 sm:text-lead">
            {lead}
          </p>
        ) : null}

        {actions ? <div className="mt-7 sm:mt-8">{actions}</div> : null}
      </Container>
    </header>
  );
}
