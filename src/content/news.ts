export type NewsItem = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image?: string;
  publishedAt: number;
  published: boolean;
};

/** Seed / fallback when Convex is not configured yet. */
export const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "Erstes Training in unserem neuen Trainingsraum",
    slug: "erstes-wing-chun-training-stutensee",
    excerpt:
      "Vielen Dank an alle Schüler aus Stutensee, Heidelberg und Landau, die beim ersten Training dabei waren.",
    body: `Vielen Dank an alle Schüler aus Stutensee, Heidelberg und Landau, die gestern bei unserem ersten Training dabei waren.

So sollte eine Einweihung aussehen — schön verschwitzte Gesichter am Ende des Trainings.`,
    image: "/images/news/erstes-training.jpg",
    publishedAt: new Date("2021-08-18").getTime(),
    published: true,
  },
  {
    title: "Neueröffnung",
    slug: "neueroeffnung-wing-chun-stutensee",
    excerpt:
      "Am kommenden Dienstag eröffnen wir offiziell unsere neuen Räumlichkeiten in Stutensee mit einem ersten Training.",
    body: `Am kommenden Dienstag eröffnen wir offiziell unsere neuen Räumlichkeiten in Stutensee mit einem ersten Training.

Wir freuen uns auf Dich!`,
    image: "/images/news/neueroeffnung.jpg",
    publishedAt: new Date("2021-08-17").getTime(),
    published: true,
  },
];
