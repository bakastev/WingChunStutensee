import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans uppercase tracking-[0.14em]",
    "transition-[background-color,color,border-color] duration-base ease-out-soft",
    // Colour deliberately omitted from base so variants own the surface contrast.
    "focus-visible:outline-2 focus-visible:outline-offset-3",
    "disabled:pointer-events-none disabled:opacity-40",
    "whitespace-nowrap select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-accent-hover",
        outline:
          "border border-foreground text-foreground hover:bg-foreground hover:text-foreground-inverse",
        inverse:
          "border border-border-inverse text-foreground-inverse hover:bg-foreground-inverse hover:text-foreground",
        "on-accent":
          "border border-accent-foreground/75 text-accent-foreground hover:bg-accent-foreground hover:text-accent",
        ghost: "text-foreground hover:text-accent",
        arrow: "group text-accent hover:text-accent-hover gap-2",
      },
      size: {
        sm: "px-4 py-2.5 text-[0.6875rem]",
        md: "px-6 py-3 text-[0.75rem]",
        lg: "px-8 py-3.5 text-[0.8125rem]",
        bare: "px-0 py-0 text-[0.75rem]",
      },
    },
    compoundVariants: [
      { variant: "ghost", size: "md", class: "px-0 py-0" },
      { variant: "arrow", size: "md", class: "px-0 py-0" },
      { variant: "ghost", size: "sm", class: "px-0 py-0" },
      { variant: "arrow", size: "sm", class: "px-0 py-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {variant === "arrow" ? <ArrowGlyph /> : null}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonVariants;

export function ButtonLink({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {variant === "arrow" ? <ArrowGlyph /> : null}
    </Link>
  );
}

function ArrowGlyph() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-base ease-out-soft group-hover:translate-x-1"
    >
      →
    </span>
  );
}

export { buttonVariants };
