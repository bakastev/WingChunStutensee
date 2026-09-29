import { Container } from "@/components/ui/container";
import { quotes, valueTiles } from "@/content/site";
import { cn } from "@/lib/cn";

/** Typografischer Akademie-Streifen — kein Icon-Grid, kein Baka-Rail. */
export function ValuesBand() {
  return (
    <section
      id="werte"
      className="scroll-mt-3 border-b border-border bg-surface-muted"
      aria-labelledby="values-heading"
    >
      <div className="border-b border-yellow-500/40 bg-yellow-500 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <Container>
          <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-balance text-ink-950">
            „{quotes.academy.text}“
          </p>
          <p className="mt-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink-950/70">
            {quotes.academy.attribution}
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-14 lg:py-16">
        <h2 id="values-heading" className="sr-only">
          Was Du bei uns trainierst
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {valueTiles.map((tile, index) => (
            <li
              key={tile.title}
              className={cn(
                "lg:px-8",
                index === 0 ? "lg:pl-0" : "lg:border-l lg:border-border",
                index === valueTiles.length - 1 && "lg:pr-0",
              )}
            >
              <span className="font-sans text-[0.6875rem] font-medium tabular-nums tracking-[0.2em] text-yellow-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[1.25rem] leading-tight text-foreground">
                {tile.title}
              </h3>
              <p className="mt-3 max-w-[18rem] text-[0.9375rem] leading-[1.65] text-pretty text-foreground-muted">
                {tile.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
