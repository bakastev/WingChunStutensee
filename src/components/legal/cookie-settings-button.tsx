"use client";

import { useCookieConsent } from "@/components/legal/cookie-consent-provider";
import { cn } from "@/lib/cn";

export function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(
        "font-sans text-[0.6875rem] tracking-[0.08em] text-foreground-subtle transition-colors hover:text-accent",
        className,
      )}
    >
      Cookie-Einstellungen
    </button>
  );
}
