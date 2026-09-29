import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const toneClass = {
  accent: "text-accent group-hover:text-accent-hover hover:text-accent-hover",
  inverse:
    "text-foreground-inverse group-hover:text-accent-strong hover:text-accent-strong",
  muted: "text-foreground-muted group-hover:text-accent hover:text-accent",
} as const;

type Tone = keyof typeof toneClass;

const base =
  "group/arrow inline-flex items-center gap-2 font-sans text-nav uppercase tracking-[0.14em] transition-colors duration-base ease-out-soft";

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-base ease-out-soft group-hover/arrow:translate-x-1 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );
}

type LinkProps = ComponentProps<typeof Link> & { tone?: Tone; as?: "link" };
type SpanProps = ComponentProps<"span"> & { tone?: Tone; as: "span" };

/**
 * `as="span"` renders a non-interactive twin for use inside a wrapping <Link>,
 * where a nested anchor would be invalid.
 */
export function ArrowLink(props: LinkProps | SpanProps) {
  if (props.as === "span") {
    const { className, tone = "accent", children, ...rest } = props;
    delete (rest as { as?: unknown }).as;
    return (
      <span className={cn(base, toneClass[tone], className)} {...rest}>
        <Inner>{children}</Inner>
      </span>
    );
  }

  const { className, tone = "accent", children, ...rest } = props;
  delete (rest as { as?: unknown }).as;
  return (
    <Link className={cn(base, toneClass[tone], className)} {...rest}>
      <Inner>{children}</Inner>
    </Link>
  );
}
