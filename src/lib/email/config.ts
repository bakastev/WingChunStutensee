import { site } from "@/content/site";

/** Öffentliche Antwort-/Kontaktadresse. */
export const SITE_EMAIL = site.email;

/** Resend-Absender — per Env überschreibbar. */
export const MAIL_FROM_EMAIL = "info@wingchun-stutensee.de";
export const MAIL_FROM_NAME = "Wing Chun Stutensee";

export const MAIL_FROM_DEFAULT = `${MAIL_FROM_NAME} <${MAIL_FROM_EMAIL}>`;

export const SITE_NAME = site.name;
export const SITE_URL = site.url;
export const SITE_TAGLINE = site.tagline;
export const SITE_SLOGAN = site.slogan;
