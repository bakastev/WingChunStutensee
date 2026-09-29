import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { FALLBACK_NEWS } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/wing-chun",
    "/graduierung",
    "/akademien",
    "/erwachsene",
    "/kinder",
    "/kinder/wing-chun",
    "/kinder/workout",
    "/aktuelles",
    "/trainingszeiten",
    "/galerie",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];

  const newsRoutes = FALLBACK_NEWS.map((n) => ({
    url: `${base}/aktuelles/${n.slug}`,
    lastModified: new Date(n.publishedAt),
  }));

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...newsRoutes,
  ];
}
