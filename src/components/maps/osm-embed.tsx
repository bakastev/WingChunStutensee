"use client";

import { useCookieConsent } from "@/components/legal/cookie-consent-provider";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type OsmEmbedProps = {
  lat: number;
  lon: number;
  label: string;
  /** Degrees of padding around the marker for the embed bbox. */
  pad?: number;
  className?: string;
};

function osmEmbedSrc(lat: number, lon: number, pad: number): string {
  const left = lon - pad;
  const right = lon + pad;
  const bottom = lat - pad;
  const top = lat + pad;
  const params = new URLSearchParams({
    bbox: `${left},${bottom},${right},${top}`,
    layer: "mapnik",
    marker: `${lat},${lon}`,
  });
  return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
}

function osmOpenHref(lat: number, lon: number): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
}

export function OsmEmbed({
  lat,
  lon,
  label,
  pad = 0.008,
  className,
}: OsmEmbedProps) {
  const { ready, hasFunctional, openPreferences } = useCookieConsent();

  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface-muted">
        {ready && hasFunctional ? (
          <iframe
            title={`Karte: ${label}`}
            src={osmEmbedSrc(lat, lon, pad)}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 bg-ink-950/90 p-5 sm:p-7">
            <div className="max-w-md">
              <p className="font-sans text-[0.625rem] uppercase tracking-[0.22em] text-accent">
                Karte
              </p>
              <p className="mt-2 font-display text-[1.125rem] leading-snug text-pretty text-foreground sm:text-[1.25rem]">
                OpenStreetMap wird erst nach Ihrer Einwilligung geladen.
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-foreground-muted">
                Die Einbettung überträgt technische Daten (u.&nbsp;a. IP-Adresse) an
                OpenStreetMap. Alternativ öffnen Sie die Karte extern oder aktivieren
                funktionale Cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex items-center justify-center bg-accent px-4 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-accent-foreground transition-colors hover:bg-yellow-400"
              >
                Cookies anpassen
              </button>
              <a
                href={site.map.osmDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-border px-4 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Extern öffnen
              </a>
            </div>
          </div>
        )}
      </div>
      <figcaption
        className={cn(
          "mt-2 font-sans text-[0.625rem] uppercase tracking-[0.14em] text-foreground-subtle",
        )}
      >
        <a
          href={osmOpenHref(lat, lon)}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          Größere Karte öffnen (OpenStreetMap)
        </a>
      </figcaption>
    </figure>
  );
}
