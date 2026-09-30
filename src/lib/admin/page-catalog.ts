export type ContentFieldRole =
  | "eyebrow"
  | "title"
  | "lead"
  | "image"
  | "imageAlt"
  | "headline"
  | "body"
  | "cta"
  | "meta"
  | "other";

export type PageCatalogEntry = {
  id: string;
  label: string;
  description: string;
  sitePath: string | null;
  order: number;
};

/** Friendly CMS catalog — never expose raw keys as primary UI. */
export const PAGE_CATALOG: PageCatalogEntry[] = [
  {
    id: "home",
    label: "Startseite",
    description: "Hero, Slogan und Einstiegstexte",
    sitePath: "/",
    order: 0,
  },
  {
    id: "wingChun",
    label: "Wing Chun",
    description: "Seitenkopf der System-Seite",
    sitePath: "/wing-chun",
    order: 1,
  },
  {
    id: "erwachsene",
    label: "Erwachsene",
    description: "Seitenkopf Erwachsenentraining",
    sitePath: "/erwachsene",
    order: 2,
  },
  {
    id: "kinder",
    label: "Kinder",
    description: "Übersicht Kinder-Angebote",
    sitePath: "/kinder",
    order: 3,
  },
  {
    id: "kinderWingChun",
    label: "Black Dragon",
    description: "Kinder Wing Chun",
    sitePath: "/kinder/wing-chun",
    order: 4,
  },
  {
    id: "kinderWorkout",
    label: "Kinder-Workout",
    description: "Workout-Seite",
    sitePath: "/kinder/workout",
    order: 5,
  },
  {
    id: "graduierung",
    label: "Graduierung",
    description: "Graduierungssystem",
    sitePath: "/graduierung",
    order: 6,
  },
  {
    id: "akademien",
    label: "Partner-Akademien",
    description: "Netzwerk-Seite",
    sitePath: "/akademien",
    order: 7,
  },
  {
    id: "trainingszeiten",
    label: "Trainingszeiten",
    description: "Zeiten-Seite",
    sitePath: "/trainingszeiten",
    order: 8,
  },
  {
    id: "galerie",
    label: "Galerie",
    description: "Galerie-Seitenkopf",
    sitePath: "/galerie",
    order: 9,
  },
  {
    id: "aktuelles",
    label: "Aktuelles",
    description: "News-Überschrift",
    sitePath: "/aktuelles",
    order: 10,
  },
  {
    id: "kontakt",
    label: "Kontakt",
    description: "Kontakt & Probetraining",
    sitePath: "/kontakt",
    order: 11,
  },
];

const FIELD_LABELS: Record<string, string> = {
  eyebrow: "Eyebrow / Überzeile",
  title: "Titel",
  lead: "Einleitung",
  slogan: "Slogan",
  description: "Kurzbeschreibung",
  tagline: "Tagline",
  "hero.eyebrow": "Hero · Überzeile",
  "hero.headline": "Hero · Überschrift (eine Zeile pro Zeile)",
  "hero.accentLineIndex": "Hero · Gelbe Zeile (0 = erste)",
  "hero.body": "Hero · Fließtext",
  "hero.image": "Hero · Bild",
  "hero.imageAlt": "Hero · Bildbeschreibung",
  "hero.primaryCtaLabel": "Hero · Primär-Button Text",
  "hero.primaryCtaHref": "Hero · Primär-Button Link",
  "hero.secondaryCtaLabel": "Hero · Sekundär-Button Text",
  "hero.secondaryCtaHref": "Hero · Sekundär-Button Link",
};

export function catalogForGroup(group: string): PageCatalogEntry {
  return (
    PAGE_CATALOG.find((p) => p.id === group) ?? {
      id: group,
      label: group,
      description: "Weitere Inhalte",
      sitePath: null,
      order: 100,
    }
  );
}

export function humanFieldLabel(key: string, fallback: string): string {
  const withoutGroup = key.includes(".")
    ? key.slice(key.indexOf(".") + 1)
    : key;
  return FIELD_LABELS[withoutGroup] ?? FIELD_LABELS[key] ?? fallback;
}

export function fieldRole(key: string): ContentFieldRole {
  if (key.includes(".image") && !key.includes("imageAlt")) return "image";
  if (key.includes("imageAlt")) return "imageAlt";
  if (key.endsWith(".eyebrow") || key.includes("hero.eyebrow")) return "eyebrow";
  if (key.endsWith(".title")) return "title";
  if (key.endsWith(".lead")) return "lead";
  if (key.includes("headline")) return "headline";
  if (key.includes(".body") || key.endsWith(".description")) return "body";
  if (key.includes("Cta")) return "cta";
  if (
    key.includes("slogan") ||
    key.includes("tagline") ||
    key.includes("accentLineIndex")
  )
    return "meta";
  return "other";
}

export function fieldHint(key: string): string | null {
  if (key.endsWith(".eyebrow") || key.endsWith("hero.eyebrow"))
    return "Kleine Zeile über dem Titel — kurz halten.";
  if (key.endsWith(".title")) return "Hauptüberschrift der Seite.";
  if (key.endsWith(".lead"))
    return "Kurzer Einstiegstext unter dem Titel (1–2 Sätze).";
  if (key.includes("hero.headline"))
    return "Jede Zeile wird als eigene Headline-Zeile dargestellt.";
  if (key.endsWith("hero.image") || key.endsWith(".image"))
    return "Vollflächiges Bild. Empfohlen: quer, hohe Auflösung.";
  if (key.includes("imageAlt"))
    return "Kurzbeschreibung für Screenreader und SEO.";
  if (key.includes("accentLineIndex"))
    return "Welche Headline-Zeile gelb hervorgehoben wird (beginnend bei 0).";
  return null;
}
