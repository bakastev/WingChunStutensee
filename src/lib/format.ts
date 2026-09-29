const formatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

/** ISO date → "14. August 2026". Locale is fixed so SSR and client agree. */
export function formatDate(iso: string): string {
  return formatter.format(new Date(`${iso}T00:00:00Z`));
}
