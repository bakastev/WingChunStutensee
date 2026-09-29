import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
};

/** Dunkler Unterseiten-Header — Gelb-Akzent, ohne CJK/Rail. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-surface-muted text-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-yellow-500"
      />

      <Container className="py-10 sm:py-14 lg:py-16">
        <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-balance text-foreground">
          {title}
        </h1>
        <span aria-hidden className="mt-5 block h-1 w-12 bg-yellow-500" />
        {lead ? (
          <p className="mt-5 max-w-xl text-pretty text-[0.9875rem] leading-[1.7] text-foreground-muted sm:mt-6 sm:text-lead">
            {lead}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
