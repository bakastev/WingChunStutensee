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
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface-muted">
        <iframe
          title={`Karte: ${label}`}
          src={osmEmbedSrc(lat, lon, pad)}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <figcaption className="mt-2 font-sans text-[0.625rem] uppercase tracking-[0.14em] text-foreground-subtle">
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
