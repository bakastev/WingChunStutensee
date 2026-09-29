import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { FALLBACK_NEWS } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const routes: {
    path: string;
    priority: number;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/wing-chun", priority: 0.9, changeFrequency: "monthly" },
    { path: "/erwachsene", priority: 0.9, changeFrequency: "monthly" },
    { path: "/kinder", priority: 0.9, changeFrequency: "monthly" },
    { path: "/kinder/wing-chun", priority: 0.8, changeFrequency: "monthly" },
    { path: "/kinder/workout", priority: 0.8, changeFrequency: "monthly" },
    { path: "/trainingszeiten", priority: 0.9, changeFrequency: "weekly" },
    { path: "/kontakt", priority: 0.85, changeFrequency: "monthly" },
    { path: "/galerie", priority: 0.7, changeFrequency: "monthly" },
    { path: "/aktuelles", priority: 0.75, changeFrequency: "weekly" },
    { path: "/graduierung", priority: 0.65, changeFrequency: "monthly" },
    { path: "/akademien", priority: 0.6, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: new Date("2026-09-29"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const newsEntries: MetadataRoute.Sitemap = FALLBACK_NEWS.map((n) => ({
    url: `${base}/aktuelles/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "yearly",
    priority: 0.55,
  }));

  return [...staticEntries, ...newsEntries];
}
