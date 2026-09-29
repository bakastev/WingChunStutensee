"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/marks/wordmark";
import { gutter } from "@/components/ui/container";
import { navigation } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  const flatNav = navigation.flatMap((item) =>
    item.children?.length
      ? [item, ...item.children.map((c) => ({ ...c, label: `${item.label}: ${c.label}` }))]
      : [item],
  );

  return (
    <header className="relative z-50 border-b border-border/80 bg-surface-muted">
      <div
        className={cn(
          "mx-auto flex w-full max-w-shell items-center gap-4 py-4 sm:gap-8 lg:py-[1.125rem]",
          gutter,
        )}
      >
        <Wordmark className="min-w-0 shrink" />

        <nav
          aria-label="Hauptnavigation"
          className="ml-auto hidden items-center gap-5 xl:gap-7 2xl:gap-8 lg:flex"
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-foreground/85 transition-colors duration-base hover:text-accent",
                  active && "text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-base ease-out-soft",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3 max-lg:ml-auto lg:ml-2">
          <ButtonLink
            href="/kontakt#probetraining"
            variant="primary"
            size="sm"
            className="hidden tracking-[0.16em] sm:inline-flex"
          >
            Probetraining
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className={cn(
            "absolute inset-x-0 top-full z-50 min-h-[calc(100dvh-5.25rem)] border-t border-border bg-surface lg:hidden",
            gutter,
            "pb-8 pt-1",
          )}
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col">
            {flatNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "border-b border-border py-4 font-sans text-[0.8125rem] uppercase tracking-[0.16em]",
                    active ? "text-accent" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink
              href="/kontakt#probetraining"
              variant="primary"
              className="mt-6 w-full"
              onClick={closeMenu}
            >
              Probetraining
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
