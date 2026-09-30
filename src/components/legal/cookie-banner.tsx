"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/legal/cookie-consent-provider";
import { cn } from "@/lib/cn";

export function CookieBanner() {
  const {
    ready,
    bannerOpen,
    prefsOpen,
    consent,
    acceptAll,
    rejectOptional,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!consent) {
      setFunctional(false);
      setAnalytics(false);
      setMarketing(false);
      return;
    }
    setFunctional(consent.categories.functional);
    setAnalytics(consent.categories.analytics);
    setMarketing(consent.categories.marketing);
  }, [consent, prefsOpen]);

  if (!ready || !bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-5"
    >
      <div className="mx-auto max-w-shell border border-border bg-ink-950 text-foreground shadow-[0_-12px_40px_rgba(0,0,0,0.45)]">
        <span aria-hidden className="block h-1 w-full bg-accent" />

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 lg:p-8">
          <div>
            <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-accent">
              Datenschutz
            </p>
            <h2
              id="cookie-banner-title"
              className="mt-3 font-display text-[clamp(1.35rem,2.5vw,1.75rem)] leading-tight tracking-[-0.02em] text-balance"
            >
              Cookies & Einwilligung
            </h2>
            <p
              id="cookie-banner-desc"
              className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-pretty text-foreground-muted"
            >
              Wir nutzen notwendige Cookies für den Betrieb der Website. Optionale
              Funktionen (z.&nbsp;B. eingebettete Karte) und künftige Analyse-/Marketing-
              Tools setzen wir nur mit Ihrer Einwilligung. Details in der{" "}
              <Link
                href="/datenschutz"
                className="text-foreground underline decoration-accent/60 underline-offset-4 hover:text-accent"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>

            {prefsOpen ? (
              <div className="mt-6 space-y-3 border border-border bg-ink-900/80 p-4">
                <CategoryRow
                  title="Notwendig"
                  description="Betrieb, Sicherheit, Speicherung Ihrer Cookie-Entscheidung."
                  checked
                  locked
                />
                <CategoryRow
                  title="Funktional"
                  description="Komfortfunktionen wie die eingebettete OpenStreetMap-Karte."
                  checked={functional}
                  onChange={setFunctional}
                />
                <CategoryRow
                  title="Analyse"
                  description="Derzeit nicht aktiv. Wird nur nach Einwilligung eingesetzt."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CategoryRow
                  title="Marketing"
                  description="Derzeit nicht aktiv. Wird nur nach Einwilligung eingesetzt."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-end gap-2.5">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex w-full items-center justify-center bg-accent px-5 py-3.5 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-accent-foreground transition-colors hover:bg-yellow-400"
            >
              Alle akzeptieren
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="inline-flex w-full items-center justify-center border border-border bg-transparent px-5 py-3.5 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Nur notwendige
            </button>
            {prefsOpen ? (
              <button
                type="button"
                onClick={() =>
                  savePreferences({ functional, analytics, marketing })
                }
                className="inline-flex w-full items-center justify-center border border-accent/50 bg-ink-900 px-5 py-3.5 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-accent transition-colors hover:border-accent hover:bg-ink-800"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex w-full items-center justify-center px-5 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-foreground-muted transition-colors hover:text-accent"
              >
                Einstellungen
              </button>
            )}
            {prefsOpen ? (
              <button
                type="button"
                onClick={closePreferences}
                className="inline-flex w-full items-center justify-center px-5 py-2 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-foreground-subtle transition-colors hover:text-foreground-muted"
              >
                Zurück
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  locked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-3 border border-border/80 bg-ink-950/50 p-3",
        locked ? "opacity-90" : "cursor-pointer hover:border-accent/40",
      )}
    >
      <input
        type="checkbox"
        className="mt-1 size-4 accent-[var(--color-accent)]"
        checked={checked}
        disabled={locked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="min-w-0">
        <span className="block font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-foreground">
          {title}
          {locked ? (
            <span className="ml-2 font-normal normal-case tracking-normal text-foreground-subtle">
              (immer aktiv)
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-[0.8125rem] leading-relaxed text-foreground-muted">
          {description}
        </span>
      </span>
    </label>
  );
}
