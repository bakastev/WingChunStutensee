export type ConsentCategories = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentState = {
  version: number;
  updatedAt: string;
  categories: ConsentCategories;
};

export const CONSENT_COOKIE_NAME = "wcs_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "wcs_consent_v1";

export const defaultConsent = (): ConsentState => ({
  version: CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
  categories: {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  },
});

export function acceptAllConsent(): ConsentState {
  return {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    categories: {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    },
  };
}

export function necessaryOnlyConsent(): ConsentState {
  return defaultConsent();
}

export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.version !== CONSENT_VERSION ||
      !parsed.categories ||
      parsed.categories.necessary !== true
    ) {
      return null;
    }
    return {
      version: CONSENT_VERSION,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      categories: {
        necessary: true,
        functional: Boolean(parsed.categories.functional),
        analytics: Boolean(parsed.categories.analytics),
        marketing: Boolean(parsed.categories.marketing),
      },
    };
  } catch {
    return null;
  }
}

export function readConsentFromDocument(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (match) {
    const value = decodeURIComponent(match.slice(CONSENT_COOKIE_NAME.length + 1));
    const fromCookie = parseConsent(value);
    if (fromCookie) return fromCookie;
  }
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function persistConsent(state: ConsentState) {
  const payload = JSON.stringify(state);
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(payload)}; path=/; max-age=${maxAge}; samesite=lax`;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, payload);
  } catch {
    /* ignore quota / private mode */
  }
}
