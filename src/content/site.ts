export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const site = {
  name: "Wing Chun Stutensee",
  wordmark: {
    primary: "WING CHUN",
    accent: "STUTENSEE",
  },
  tagline: "Kampfkunst · Selbstverteidigung · Stutensee",
  slogan: "Lerne Dich zu verteidigen!",
  description:
    "Wing Chun Akademie in Stutensee — Selbstverteidigung für Erwachsene und Kinder. Kostenloses Probetraining.",
  url: "https://wingchun-stutensee.de",
  email: "info@wingchun-stutensee.de",
  phone: {
    display: "0176 23543638",
    tel: "+4917623543638",
  },
  phoneAlt: {
    display: "0173 3071139",
    tel: "+491733071139",
  },
  address: {
    street: "Gottlieb-Daimler-Straße 8",
    zipCity: "76297 Stutensee",
    region: "Baden-Württemberg",
    country: "Deutschland",
  },
  map: {
    lat: 49.12362,
    lon: 8.50849,
    osmDirections: "https://www.openstreetmap.org/directions?to=49.12362,8.50849",
  },
  sifu: "Sifu Igor Peic",
  legal: {
    name: "Igor Peic",
    org: "Wing Chun Stutensee",
    street: "Gottlieb-Daimler-Straße 8",
    zipCity: "76297 Spöck",
    country: "Deutschland",
  },
  social: {
    facebook:
      "https://www.facebook.com/Wing-Chun-Akademie-Stutensee-Sp%C3%B6ck-384000235093271",
  },
  footerClaim: "Lerne Dich zu verteidigen",
} as const;

export const navigation: NavItem[] = [
  {
    label: "Wing Chun",
    href: "/wing-chun",
    children: [
      { label: "Graduierung", href: "/graduierung" },
      { label: "Akademien", href: "/akademien" },
    ],
  },
  { label: "Erwachsene", href: "/erwachsene" },
  {
    label: "Kinder",
    href: "/kinder",
    children: [
      { label: "Wing Chun", href: "/kinder/wing-chun" },
      { label: "Workout", href: "/kinder/workout" },
    ],
  },
  { label: "Aktuelles", href: "/aktuelles" },
  { label: "Trainingszeiten", href: "/trainingszeiten" },
  { label: "Galerie", href: "/galerie" },
  { label: "Kontakt", href: "/kontakt" },
];

export const heroValues = [
  "Selbstverteidigung",
  "Kraft",
  "Fitness",
  "Koordination",
  "Selbstbewusstsein",
] as const;

export const valueTiles = [
  {
    title: "Selbstverteidigung",
    description:
      "Alle Techniken sind direkt für die Selbstverteidigung anwendbar. Du brauchst kein jahrelanges Training, um Erfolge zu sehen.",
    icon: "collision" as const,
  },
  {
    title: "Kraft",
    description:
      "Kräftige den gesamten Körper — Arme, Knochen, Bänder und Sehnen. Die gewonnene Kraft hat eine Funktion.",
    icon: "structure" as const,
  },
  {
    title: "Fitness",
    description:
      "Partnerübungen verbessern Fitness und Wohlbefinden — ausgeglichener und gelassener im Alltag.",
    icon: "intensity" as const,
  },
  {
    title: "Selbstbewusstsein",
    description:
      "Eine echte Fähigkeit stärkt Sicherheit und Selbstwert — du weißt, dass du dich wehren kannst.",
    icon: "effect" as const,
  },
] as const;

export const quotes = {
  academy: {
    text: "Lerne Dich zu verteidigen!",
    attribution: "Wing Chun Stutensee",
  },
} as const;

export const hero = {
  eyebrow: "Akademie Stutensee",
  headline: ["Kampfkunst und", "Selbstverteidigung", "für Erwachsene und Kinder"],
  accentLineIndex: 1,
  body: [
    "Du möchtest lernen, wie Du Dich effektiv und erfolgreich verteidigen kannst? Dann bist Du bei uns hier genau richtig!",
  ],
  primaryCta: { label: "Probetraining", href: "/kontakt#probetraining" },
  secondaryCta: { label: "Trainingszeiten", href: "/trainingszeiten" },
  image: "/images/hero.jpg",
  imageAlt: "Wing Chun Training in der Akademie Stutensee",
} as const;

export const schedule = {
  adults: [
    {
      title: "Wing Chun",
      days: "Dienstag & Donnerstag",
      time: "19:00 – 20:30 Uhr",
    },
  ],
  kids: [
    {
      title: "Wing Chun (Black Dragon)",
      days: "Dienstag",
      time: "18:00 – 19:00 Uhr",
    },
    {
      title: "Kinder-Workout",
      days: "Donnerstag",
      time: "18:00 – 19:00 Uhr",
    },
  ],
  private: {
    title: "Privat-Stunden",
    note: "Nach Vereinbarung — ausführliche Info in der Akademie.",
  },
} as const;

export const benefits = [
  {
    title: "Selbstverteidigung",
    body: "Lerne Dich zu verteidigen ist das Motto unseres gesamten Trainings. Alle Techniken sind direkt anwendbar — ohne jahrelanges Warten auf Erfolge.",
  },
  {
    title: "Kraft",
    body: "Kräftige Deinen gesamten Körper. Du trainierst nicht nur fürs Aussehen — die gewonnene Kraft hat eine Funktion und stärkt Arme, Knochen, Bänder und Sehnen.",
  },
  {
    title: "Fitness",
    body: "Wing Chun wirkt sich auf Fitness und Wohlbefinden aus. Partnerübungen fordern Dich körperlich und machen Dich ausgeglichener und gelassener.",
  },
  {
    title: "Spaß",
    body: "Respektvoller, freundschaftlicher Umgang. Abwechslungsreiches Training in lockerer Atmosphäre macht das Lernen leichter — und jede Menge Spaß.",
  },
  {
    title: "Perfekte Koordination",
    body: "Die aufeinander abgestimmte Koordination von Armen und Beinen zum Angriff und zur Verteidigung ist eine der größten Stärken des Wing Chun.",
  },
  {
    title: "Selbstbewusstsein",
    body: "Eine echte Fähigkeit stärkt Sicherheit und Selbstwertgefühl. Du weißt, dass Du Dich bei einer Bedrohung wehren kannst — und dazu in der Lage bist.",
  },
] as const;

export const partnerAcademies = [
  {
    slug: "heidelberg",
    name: "Akademie für WingChun Heidelberg",
    leaders: "Sije Maria Escobar & Sifu Andrej Johann",
    href: "https://www.wingchun-heidelberg.de/",
    image: "/images/akademien/heidelberg.jpg",
    social: {
      instagram: "https://www.instagram.com/wingchun_heidelberg/",
      facebook: "https://www.facebook.com/wingchunheidelberg",
      youtube: "https://www.youtube.com/channel/UCwWLBNP2LTZ31tjs_aVUiqg",
    },
  },
  {
    slug: "landau",
    name: "Akademie für WingChun Landau",
    leaders: "Sihing Alexander Hammer",
    href: "https://wingchun-landau.com/",
    image: "/images/akademien/landau.jpeg",
    social: {
      instagram: "https://www.instagram.com/wingchun_landau",
      facebook: "https://www.facebook.com/landauwingchun/",
    },
  },
  {
    slug: "bretten",
    name: "Akademie Bretten · Bruchsal · Karlsruhe",
    leaders: "Sihing Alexandre Liard",
    href: "https://www.alexandreliard.de/",
    image: "/images/akademien/bretten.jpg",
    social: {
      facebook: "https://www.facebook.com/Zollhallenstr/",
    },
  },
  {
    slug: "esslingen",
    name: "Akademie Esslingen am Neckar",
    leaders: "Sihing Nino Luzia",
    href: "#",
    image: "/images/akademien/esslingen.jpg",
    social: {},
  },
] as const;

/** Bildergalerie — Reihenfolge & Titel wie auf der Live-Site (neueste Events zuerst). */
export const galleryEvents = [
  {
    slug: "sommer-event-2025",
    title: "Sommer Event 2025 mit Prüfungslehrgang",
    location: "Stutensee",
    year: 2025,
    images: [
      {
        src: "/images/galerie/Sommereent-Gruppenbild-089ab300-924f645a.jpeg",
        alt: "Event 2025 — Gruppenbild",
      },
      { src: "/images/galerie/IMG_3286-4104f81b-924f645a.jpeg", alt: "Event 2025 — 2" },
      { src: "/images/galerie/IMG_3281-229ba3da-924f645a.jpeg", alt: "Event 2025 — 3" },
      { src: "/images/galerie/IMG_3287-8103baa3-924f645a.jpeg", alt: "Event 2025 — 4" },
      { src: "/images/galerie/IMG_3282-7342a4ed-924f645a.jpeg", alt: "Event 2025 — 5" },
      { src: "/images/galerie/IMG_3284-7bb7baac-924f645a.jpeg", alt: "Event 2025 — 6" },
      { src: "/images/galerie/IMG_3283-98d7926e-924f645a.jpeg", alt: "Event 2025 — 7" },
    ],
  },
  {
    slug: "sommerausflug-2025-salzbergwerk",
    title: "Sommerausflug 2025 Wing Chun Kids — Salzbergwerk",
    location: "Salzbergwerk",
    year: 2025,
    images: [
      {
        src: "/images/galerie/bca13130-df7d-4ee5-9d76-940e1b9fe221-77827fc8-924f645a.jpeg",
        alt: "Bergwerk 1",
      },
      {
        src: "/images/galerie/877c3d7a-9feb-454c-9a13-7378743b6850-d9b88457-924f645a.jpeg",
        alt: "Bergwerk 3",
      },
      {
        src: "/images/galerie/98dbeb61-60b5-4486-8257-0ec40df51d00-e64c2c8a-924f645a.jpeg",
        alt: "Bergwerk 2",
      },
      {
        src: "/images/galerie/cda65282-5e6f-4a29-a76e-6b32e17e4fb9-7efdca77-924f645a.jpeg",
        alt: "Bergwerk 4",
      },
      {
        src: "/images/galerie/83a7cccc-1936-48fe-b898-23e24f6c6d2a-281e5c38-924f645a.jpeg",
        alt: "Bergwerk 5",
      },
      {
        src: "/images/galerie/b54c5f39-da3f-4df3-a246-88d0c8621c1a-1f151c5d-924f645a.jpeg",
        alt: "Bergwerk 6",
      },
    ],
  },
  {
    slug: "pruefungslehrgang-maerz-2025",
    title: "Kleiner Prüfungslehrgang März 2025",
    location: "Stutensee",
    year: 2025,
    images: [
      {
        src: "/images/galerie/IMG_2687-e15ba1c3-924f645a.JPG",
        alt: "Kleiner Prüfungslehrgang März 2025",
      },
    ],
  },
  {
    slug: "winter-event-2024",
    title: "Wing Chun Winter Event 2024",
    location: "Stutensee",
    year: 2024,
    images: [
      {
        src: "/images/galerie/PHOTO-2025-01-05-20-33-53-8c652dd6-924f645a.jpg",
        alt: "Wing Chun Stutensee — Winter Event 2024",
      },
    ],
  },
  {
    slug: "sommer-event-2024",
    title: "Wing Chun Sommer Event 2024",
    location: "Stutensee",
    year: 2024,
    images: [
      {
        src: "/images/galerie/Foto-27.07.24-14-38-37-3-1536x835-164bdf93-924f645a.jpg",
        alt: "Wing Chun Stutensee — Sommer Event 2024",
      },
    ],
  },
  {
    slug: "winter-event-2023",
    title: "Wing Chun Winter Event 2023",
    location: "Waghäusel",
    year: 2023,
    images: [
      {
        src: "/images/galerie/IMG_0348-3ac815b1-924f645a.jpeg",
        alt: "Wing Chun Waghäusel — 2023",
      },
    ],
  },
  {
    slug: "sommer-event-2023",
    title: "Wing Chun Sommer Event 2023",
    location: "Karlsruhe",
    year: 2023,
    images: [
      {
        src: "/images/galerie/da4095aa-cb4e-4a41-99be-f9deab53bb44-209db08e-924f645a.jpg",
        alt: "Wing Chun Karlsruhe — 2023",
      },
    ],
  },
  {
    slug: "sommer-event-2021",
    title: "Wing Chun Sommer Event 2021",
    location: "Stutensee",
    year: 2021,
    images: [
      {
        src: "/images/galerie/Gruppenfoto-11.12.2021-1536x1024-e3b0673f-924f645a.jpg",
        alt: "Wing Chun Combat — 2021 — Stutensee",
      },
    ],
  },
  {
    slug: "combat-event-2020",
    title: "Wing Chun Combat Event 2020",
    location: "Stutensee",
    year: 2020,
    images: [
      {
        src: "/images/galerie/Gruppenfoto-Combat-Sommer-Camp-26.07.2020-2048x1365-4ac5043b-924f645a.jpg",
        alt: "Wing Chun Stutensee — Combat Event 2020",
      },
    ],
  },
  {
    slug: "techniker-event-2020",
    title: "Techniker Event 2020",
    location: "Spöck",
    year: 2020,
    images: [
      {
        src: "/images/galerie/Gruppenfoto-rot-schwarz-11.12.2021-1536x1024-c785008d-924f645a.jpg",
        alt: "Wing Chun Spöck — Techniker Event",
      },
    ],
  },
  {
    slug: "sommer-event-2019",
    title: "Wing Chun Sommer Event 2019",
    location: "Stutensee",
    year: 2019,
    images: [
      {
        src: "/images/galerie/Gruppenfoto-20.07.2019-1-1024x428-0a53bcdc-924f645a.jpg",
        alt: "Wing Chun Stutensee — Sommer Event 2019",
      },
    ],
  },
] as const;

export const galleryTrainingsraum = {
  slug: "trainingsraum",
  title: "Unser Trainingsraum",
  description: "Einblicke in die Akademie in der Gottlieb-Daimler-Straße 8, Stutensee.",
  images: [
    { src: "/images/trainingsraum/raum-1.jpg", alt: "Trainingsraum Stutensee" },
    { src: "/images/trainingsraum/raum-2.jpg", alt: "Trainingsraum Stutensee" },
    { src: "/images/trainingsraum/raum-3.jpg", alt: "Trainingsraum Stutensee" },
    { src: "/images/trainingsraum/raum-4.jpg", alt: "Trainingsraum Stutensee" },
  ],
} as const;

export const gradeLevels = {
  grundstufe: {
    title: "Grundstufe",
    range: "1. – 4. Schülergrad",
    clothing: "Weißes T-Shirt, schwarze Hose",
    levels: [1, 2, 3, 4],
  },
  mittelstufe: {
    title: "Mittelstufe",
    range: "5. – 8. Schülergrad",
    clothing: "Weißes T-Shirt, schwarze Hose",
    levels: [5, 6, 7, 8],
  },
  oberstufe: {
    title: "Oberstufe",
    range: "9. – 12. Schülergrad",
    clothing: "Schwarzes T-Shirt bzw. traditioneller Anzug",
    levels: [9, 10, 11, 12],
  },
} as const;

export const ctaPanel = {
  title: "Probetraining vereinbaren?",
  body: "Kostenfrei und unverbindlich. Bring bequeme Sportkleidung und etwas zu trinken mit.",
  cta: { label: "Jetzt anfragen", href: "/kontakt#probetraining" },
} as const;

export const pages = {
  wingChun: {
    eyebrow: "Das System",
    title: "Wing Chun — ewiger Frühling",
    lead: "Ein System, das ausschließlich für die Selbstverteidigung geschaffen wurde — zurückgeführt auf den ursprünglichen Zweck: in einer Notwehrsituation zu bestehen.",
  },
  erwachsene: {
    eyebrow: "Erwachsene",
    title: "Erwachsenen Wing Chun Team",
    lead: "Mehr als reine Selbstverteidigung: Körper und Geist schulen, auf Situationen vorbereitet sein — unabhängig von Alter, Geschlecht und Fitness.",
  },
  kinder: {
    eyebrow: "Kinder",
    title: "Black Dragon Team & Kinder-Workout",
    lead: "Zwei Angebote für junge Menschen: Wing Chun für Teens und Workout für Fitness, Beweglichkeit und Spaß.",
  },
  kinderWingChun: {
    eyebrow: "Kinder · Wing Chun",
    title: "Black Dragon Team",
    lead: "Wing Chun für Kids — Fitness, Motorik, Selbstverteidigung und Respekt. Kämpfen lernen, um nicht kämpfen zu müssen.",
  },
  kinderWorkout: {
    eyebrow: "Kinder · Workout",
    title: "Kinder-Workout",
    lead: "Sensomotorik, Beweglichkeit, Fitness — nur mit dem eigenen Körper, ohne Druck, mit Spaß und Musik.",
  },
  graduierung: {
    eyebrow: "System",
    title: "Graduierungssystem",
    lead: "Fünf Stufen vom Schüler- bis zum Meistergrad — ohne Gürtel, mit Graduierungsabzeichen.",
  },
  akademien: {
    eyebrow: "Netzwerk",
    title: "Partner-Akademien",
    lead: "Wenn Du nicht in Stutensee trainieren kannst: kompetente Akademien, mit denen wir im Austausch stehen.",
  },
  trainingszeiten: {
    eyebrow: "Zeiten",
    title: "Trainingszeiten",
    lead: "Erwachsene und Kinder — feste Zeiten in Stutensee, Privatstunden nach Vereinbarung.",
  },
  galerie: {
    eyebrow: "Galerie",
    title: "Impressionen von unseren Events",
    lead: "Prüfungslehrgänge, Sommer- und Winter-Events — chronologisch, neueste zuerst.",
  },
  aktuelles: {
    eyebrow: "News",
    title: "Aktuelles",
    lead: "Meldungen aus der Akademie.",
  },
  kontakt: {
    eyebrow: "Kontakt",
    title: "Probetraining & Fragen",
    lead: "Schreib uns — wir melden uns schnellstmöglich. Ein Probetraining ist kostenfrei und unverbindlich.",
  },
} as const;
