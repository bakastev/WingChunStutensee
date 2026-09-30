import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/legal/cookie-settings-button";
import { Wordmark } from "@/components/marks/wordmark";
import { gutter } from "@/components/ui/container";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-surface-muted text-foreground">
      <div
        data-surface="light"
        className="border-b border-accent bg-accent text-accent-foreground"
      >
        <div
          className={cn(
            "mx-auto flex max-w-shell flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7",
            gutter,
          )}
        >
          <div className="max-w-xl">
            <p className="font-sans text-[0.625rem] uppercase tracking-[0.22em] text-accent-foreground/70">
              Probetraining
            </p>
            <p className="mt-2 font-display text-[1.0625rem] leading-snug text-pretty sm:text-[1.25rem]">
              Kostenfrei und unverbindlich — überzeuge Dich von Unterricht und Atmosphäre.
            </p>
          </div>
          <Link
            href="/kontakt#probetraining"
            className="inline-flex items-center justify-center border border-accent-foreground bg-ink-900 px-5 py-3.5 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-ink-800 sm:py-3"
          >
            Termin vereinbaren
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="border-b border-border">
        <div
          className={cn(
            "mx-auto flex max-w-shell flex-col gap-8 py-10 sm:gap-10 sm:py-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:py-14",
            gutter,
          )}
        >
          <div className="max-w-xs">
            <Wordmark showTagline />
            <p className="mt-4 font-display text-[1.0625rem] italic leading-snug text-pretty text-foreground-muted sm:mt-5 sm:text-[1.125rem]">
              {site.slogan}
            </p>
            <p className="mt-4 text-body-sm text-foreground-muted">
              {site.address.street}
              <br />
              {site.address.zipCity}
              <br />
              <a href={`tel:${site.phone.tel}`} className="hover:text-accent">
                {site.phone.display}
              </a>
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-5 lg:max-w-md lg:justify-center"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center py-2.5 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-accent sm:py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-6 sm:justify-start lg:gap-10">
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <SocialLink href={site.social.facebook} label="Facebook" external>
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="E-Mail">
                <MailIcon />
              </SocialLink>
              <SocialLink href={`tel:${site.phone.tel}`} label="Telefon">
                <PhoneIcon />
              </SocialLink>
            </div>

            <div className="hidden items-stretch gap-3 min-[400px]:flex">
              <span aria-hidden className="w-px self-stretch bg-accent" />
              <p className="max-w-[6.5rem] py-0.5 font-sans text-[0.5625rem] uppercase leading-[1.7] tracking-[0.22em] text-foreground-muted [writing-mode:vertical-rl] [text-orientation:mixed]">
                {site.footerClaim}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background text-foreground">
        <div
          className={cn(
            "mx-auto flex max-w-shell flex-col gap-4 py-4 sm:py-5",
            gutter,
          )}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
              <p className="font-sans text-[0.6875rem] tracking-[0.08em] text-foreground-subtle">
                © {new Date().getFullYear()} {site.name}
              </p>
              <nav
                aria-label="Rechtliches"
                className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:border-l sm:border-border sm:pl-5"
              >
                {legalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-sans text-[0.6875rem] tracking-[0.08em] text-foreground-subtle transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
                <CookieSettingsButton />
              </nav>
            </div>
            <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-foreground-subtle">
              {site.slogan}
            </p>
          </div>
          <p className="font-sans text-[0.6875rem] tracking-[0.06em] text-foreground-subtle">
            Entwickelt von:{" "}
            <a
              href={site.developer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted transition-colors hover:text-accent"
            >
              {site.developer.label}
            </a>
            {" — "}
            {site.developer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
  external,
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m4.5 7.5 7.5 5.5 7.5-5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L16 13l4 1.5V18a2 2 0 0 1-2 2A14 14 0 0 1 5 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
