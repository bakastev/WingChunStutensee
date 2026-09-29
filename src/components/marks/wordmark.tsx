import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type WordmarkProps = {
  href?: string;
  tone?: "default" | "inverse";
  showTagline?: boolean;
  compact?: boolean;
  className?: string;
};

export function Wordmark({
  href = "/",
  tone = "default",
  showTagline = false,
  compact = false,
  className,
}: WordmarkProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/images/logo/logo-gold.png"
        alt={site.name}
        width={compact ? 140 : 180}
        height={compact ? 40 : 52}
        className={cn(
          "h-auto w-auto object-contain",
          compact ? "max-h-8" : "max-h-10 sm:max-h-11",
        )}
        priority
      />
      {showTagline ? (
        <span
          className={cn(
            "hidden font-sans uppercase leading-snug min-[720px]:inline",
            compact
              ? "text-[0.5rem] tracking-[0.14em]"
              : "text-[0.625rem] tracking-[0.18em]",
            tone === "inverse"
              ? "text-foreground-inverse/55"
              : "text-foreground-subtle",
          )}
        >
          {site.tagline}
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-block focus-visible:outline-offset-4">
      {content}
    </Link>
  );
}
