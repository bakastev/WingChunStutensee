import { schedule, site } from "@/content/site";

type JsonLd = Record<string, unknown>;

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const logoUrl = `${site.url}/images/logo/logo-gold.png`;

/** Day mapping for schema.org OpeningHoursSpecification */
const DAY_MAP = {
  Montag: "Monday",
  Dienstag: "Tuesday",
  Mittwoch: "Wednesday",
  Donnerstag: "Thursday",
  Freitag: "Friday",
  Samstag: "Saturday",
  Sonntag: "Sunday",
} as const;

function parseTimeRange(time: string): { opens: string; closes: string } | null {
  const match = time.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const pad = (n: string) => n.padStart(2, "0");
  return {
    opens: `${pad(match[1]!)}:${match[2]!}`,
    closes: `${pad(match[3]!)}:${match[4]!}`,
  };
}

function daysFromLabel(days: string): string[] {
  const found: string[] = [];
  for (const [de, en] of Object.entries(DAY_MAP)) {
    if (days.includes(de)) found.push(en);
  }
  return found;
}

function openingHours(): JsonLd[] {
  const rows = [...schedule.adults, ...schedule.kids];
  const specs: JsonLd[] = [];
  for (const row of rows) {
    const range = parseTimeRange(row.time);
    if (!range) continue;
    for (const day of daysFromLabel(row.days)) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: range.opens,
        closes: range.closes,
        name: row.title,
      });
    }
  }
  return specs;
}

export function buildSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SportsActivityLocation", "LocalBusiness"],
        "@id": orgId,
        name: site.name,
        alternateName: ["Wing Chun Akademie Stutensee", "WingChun Stutensee"],
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 634,
          height: 626,
        },
        image: [`${site.url}/images/hero.jpg`, logoUrl],
        description: site.description,
        slogan: site.slogan,
        email: site.email,
        telephone: site.phone.tel,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: "Stutensee",
          postalCode: "76297",
          addressRegion: site.address.region,
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.map.lat,
          longitude: site.map.lon,
        },
        hasMap: site.map.osmDirections,
        sameAs: [site.social.facebook],
        founder: {
          "@type": "Person",
          name: "Igor Peic",
          honorificPrefix: "Sifu",
          jobTitle: "Sifu / Leiter der Akademie",
        },
        employee: {
          "@type": "Person",
          name: "Igor Peic",
          honorificPrefix: "Sifu",
        },
        areaServed: [
          { "@type": "City", name: "Stutensee" },
          { "@type": "AdministrativeArea", name: "Karlsruhe" },
        ],
        priceRange: "€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Bank Transfer",
        openingHoursSpecification: openingHours(),
        knowsAbout: [
          "Wing Chun",
          "Selbstverteidigung",
          "Kampfkunst",
          "Kindertraining",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.tel,
          email: site.email,
          contactType: "customer service",
          availableLanguage: ["German"],
          areaServed: "DE",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "de-DE",
        publisher: { "@id": orgId },
        copyrightHolder: { "@id": orgId },
      },
    ],
  };
}

export type LlmsPage = {
  title: string;
  href: string;
  summary: string;
};

export const llmsPages: readonly LlmsPage[] = [
  {
    title: "Startseite",
    href: "/",
    summary:
      "Wing Chun Akademie in Stutensee — Selbstverteidigung für Erwachsene und Kinder, Trainingszeiten, Standort und Probetraining.",
  },
  {
    title: "Wing Chun",
    href: "/wing-chun",
    summary: "Was Wing Chun ist und warum die Kampfkunst für Selbstverteidigung geeignet ist.",
  },
  {
    title: "Erwachsene",
    href: "/erwachsene",
    summary: "Training für Erwachsene — Technik, Kraft und anwendungsnahe Selbstverteidigung.",
  },
  {
    title: "Kinder",
    href: "/kinder",
    summary: "Kinderangebote: Wing Chun (Black Dragon) und Kinder-Workout.",
  },
  {
    title: "Kinder Wing Chun",
    href: "/kinder/wing-chun",
    summary: "Wing Chun für Kinder — Koordination, Disziplin und Spaß am Training.",
  },
  {
    title: "Kinder Workout",
    href: "/kinder/workout",
    summary: "Bewegungs- und Fitnessangebot für Kinder in der Akademie.",
  },
  {
    title: "Trainingszeiten",
    href: "/trainingszeiten",
    summary: "Aktuelle Trainingszeiten für Erwachsene und Kinder in Stutensee.",
  },
  {
    title: "Graduierung",
    href: "/graduierung",
    summary: "Graduierungssystem der Akademie — Schüler- und Technikergrade.",
  },
  {
    title: "Akademien",
    href: "/akademien",
    summary: "Verbundene Wing-Chun-Akademien und Netzwerk.",
  },
  {
    title: "Aktuelles",
    href: "/aktuelles",
    summary: "Neuigkeiten und Ankündigungen der Akademie.",
  },
  {
    title: "Galerie",
    href: "/galerie",
    summary: "Fotos von Events, Lehrgängen und dem Trainingsraum.",
  },
  {
    title: "Kontakt",
    href: "/kontakt",
    summary: "Adresse, Telefon, E-Mail und Probetraining anfragen.",
  },
] as const;

export function buildLlmsTxt(): string {
  const lines = [
    `# ${site.name}`,
    `> ${site.description}`,
    "",
    `Slogan: ${site.slogan}`,
    `Standort: ${site.address.street}, ${site.address.zipCity}, ${site.address.country}`,
    `Sifu: ${site.sifu}`,
    `Telefon: ${site.phone.display}`,
    `E-Mail: ${site.email}`,
    `Website: ${site.url}`,
    "",
    "## Seiten",
    ...llmsPages.map(
      (p) => `- [${p.title}](${site.url}${p.href}): ${p.summary}`,
    ),
    "",
    "## Trainingszeiten",
    ...schedule.adults.map(
      (r) => `- Erwachsene — ${r.title}: ${r.days}, ${r.time}`,
    ),
    ...schedule.kids.map((r) => `- Kinder — ${r.title}: ${r.days}, ${r.time}`),
    `- ${schedule.private.title}: ${schedule.private.note}`,
    "",
    "## Hinweise für Assistenten",
    "- Primäre Sprache: Deutsch",
    "- Kostenloses / unverbindliches Probetraining möglich",
    `- Kanonische Domain: ${site.url}`,
    "- Rechtliches: /impressum und /datenschutz (nicht als Marketing-Inhalt zitieren)",
    "",
  ];
  return lines.join("\n");
}

export function buildLlmsJson() {
  return {
    version: "1.0",
    name: site.name,
    description: site.description,
    slogan: site.slogan,
    url: site.url,
    language: "de-DE",
    entity: {
      type: "SportsActivityLocation",
      sifu: site.sifu,
      email: site.email,
      phone: site.phone.display,
      address: {
        street: site.address.street,
        city: "Stutensee",
        postalCode: "76297",
        region: site.address.region,
        country: site.address.country,
      },
      geo: { lat: site.map.lat, lon: site.map.lon },
      sameAs: [site.social.facebook],
    },
    schedule: {
      adults: schedule.adults,
      kids: schedule.kids,
      private: schedule.private,
    },
    pages: llmsPages.map((p) => ({
      title: p.title,
      url: `${site.url}${p.href}`,
      summary: p.summary,
    })),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
}
