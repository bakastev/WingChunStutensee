import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Single source of truth for the page gutter. The header, every section and
 * the footer import this so their left edges can never drift apart.
 */
export const gutter = "px-5 sm:px-8 lg:px-12 xl:px-14";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: "shell" | "content" | "narrow" | "full";
};

const widthClass = {
  /** Page shell — edge-aligned up to very wide screens. */
  shell: "max-w-shell",
  content: "max-w-content",
  narrow: "max-w-narrow",
  full: "max-w-none",
} as const;

export function Container({
  className,
  width = "shell",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full", gutter, widthClass[width], className)}
      {...props}
    >
      {children}
    </div>
  );
}
