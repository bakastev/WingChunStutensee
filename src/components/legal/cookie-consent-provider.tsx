"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  acceptAllConsent,
  defaultConsent,
  necessaryOnlyConsent,
  persistConsent,
  readConsentFromDocument,
  type ConsentCategories,
  type ConsentState,
} from "@/lib/consent";

type ConsentContextValue = {
  ready: boolean;
  consent: ConsentState | null;
  bannerOpen: boolean;
  prefsOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (categories: Omit<ConsentCategories, "necessary">) => void;
  hasFunctional: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    const existing = readConsentFromDocument();
    setConsent(existing);
    setBannerOpen(!existing);
    setReady(true);
  }, []);

  const apply = useCallback((next: ConsentState) => {
    persistConsent(next);
    setConsent(next);
    setBannerOpen(false);
    setPrefsOpen(false);
  }, []);

  const acceptAll = useCallback(() => apply(acceptAllConsent()), [apply]);
  const rejectOptional = useCallback(() => apply(necessaryOnlyConsent()), [apply]);

  const savePreferences = useCallback(
    (categories: Omit<ConsentCategories, "necessary">) => {
      apply({
        version: defaultConsent().version,
        updatedAt: new Date().toISOString(),
        categories: {
          necessary: true,
          functional: categories.functional,
          analytics: categories.analytics,
          marketing: categories.marketing,
        },
      });
    },
    [apply],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      ready,
      consent,
      bannerOpen,
      prefsOpen,
      openPreferences: () => {
        setPrefsOpen(true);
        setBannerOpen(true);
      },
      closePreferences: () => setPrefsOpen(false),
      acceptAll,
      rejectOptional,
      savePreferences,
      hasFunctional: Boolean(consent?.categories.functional),
    }),
    [
      ready,
      consent,
      bannerOpen,
      prefsOpen,
      acceptAll,
      rejectOptional,
      savePreferences,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent muss innerhalb von CookieConsentProvider genutzt werden");
  }
  return ctx;
}
