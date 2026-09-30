/**
 * Seeds CMS content, gallery albums and news into Convex.
 * Usage: pnpm tsx --env-file=.env.local scripts/seed-cms.ts
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { FALLBACK_NEWS } from "../src/content/news";
import {
  galleryEvents,
  galleryTrainingsraum,
  hero,
  pages,
  site,
} from "../src/content/site";

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} fehlt`);
  return value;
}

function toHtmlParagraphs(text: string) {
  if (/^\s*</.test(text)) return text;
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_CONVEX_URL");
  const adminSecret = requireEnv("ADMIN_SECRET");
  const client = new ConvexHttpClient(url);

  const contentItems = Object.entries(pages).flatMap(([pageKey, copy]) =>
    (["eyebrow", "title", "lead"] as const).map((field) => ({
      key: `${pageKey}.${field}`,
      group: pageKey,
      label: `${pageKey} · ${field}`,
      format: "plain" as const,
      value: copy[field],
    })),
  );

  contentItems.push(
    {
      key: "home.slogan",
      group: "home",
      label: "Start · Slogan",
      format: "plain",
      value: site.slogan,
    },
    {
      key: "home.description",
      group: "home",
      label: "Start · Beschreibung",
      format: "plain",
      value: site.description,
    },
    {
      key: "home.tagline",
      group: "home",
      label: "Start · Tagline",
      format: "plain",
      value: site.tagline,
    },
    {
      key: "home.hero.eyebrow",
      group: "home",
      label: "Hero · Eyebrow",
      format: "plain",
      value: hero.eyebrow,
    },
    {
      key: "home.hero.headline",
      group: "home",
      label: "Hero · Headline (Zeilen)",
      format: "plain",
      value: hero.headline.join("\n"),
    },
    {
      key: "home.hero.accentLineIndex",
      group: "home",
      label: "Hero · Akzent-Zeile (0-basiert)",
      format: "plain",
      value: String(hero.accentLineIndex),
    },
    {
      key: "home.hero.body",
      group: "home",
      label: "Hero · Text",
      format: "plain",
      value: hero.body.join("\n\n"),
    },
    {
      key: "home.hero.image",
      group: "home",
      label: "Hero · Bild-URL",
      format: "plain",
      value: hero.image,
    },
    {
      key: "home.hero.imageAlt",
      group: "home",
      label: "Hero · Bild-Alt",
      format: "plain",
      value: hero.imageAlt,
    },
    {
      key: "home.hero.primaryCtaLabel",
      group: "home",
      label: "Hero · Primary CTA Label",
      format: "plain",
      value: hero.primaryCta.label,
    },
    {
      key: "home.hero.primaryCtaHref",
      group: "home",
      label: "Hero · Primary CTA Link",
      format: "plain",
      value: hero.primaryCta.href,
    },
    {
      key: "home.hero.secondaryCtaLabel",
      group: "home",
      label: "Hero · Secondary CTA Label",
      format: "plain",
      value: hero.secondaryCta.label,
    },
    {
      key: "home.hero.secondaryCtaHref",
      group: "home",
      label: "Hero · Secondary CTA Link",
      format: "plain",
      value: hero.secondaryCta.href,
    },
  );

  const contentCount = await client.mutation(api.content.adminSeed, {
    adminSecret,
    items: contentItems,
  });
  console.log(`content entries: ${contentCount}`);

  const albums = [
    ...galleryEvents.map((event, index) => ({
      slug: event.slug,
      title: event.title,
      eyebrow: `${event.year}${event.location ? ` · ${event.location}` : ""}`,
      location: event.location,
      year: event.year,
      sortOrder: index,
      published: true,
      images: event.images.map((img) => ({ src: img.src, alt: img.alt })),
    })),
    {
      slug: galleryTrainingsraum.slug,
      title: galleryTrainingsraum.title,
      eyebrow: "Akademie",
      description: galleryTrainingsraum.description,
      sortOrder: galleryEvents.length,
      published: true,
      images: galleryTrainingsraum.images.map((img) => ({
        src: img.src,
        alt: img.alt,
      })),
    },
  ];

  const albumCount = await client.mutation(api.gallery.adminSeed, {
    adminSecret,
    items: albums,
  });
  console.log(`gallery albums: ${albumCount}`);

  const newsCount = await client.mutation(api.news.seedPublic, {
    items: FALLBACK_NEWS.map((item) => ({
      ...item,
      body: toHtmlParagraphs(item.body),
    })),
  });
  console.log(`news: ${newsCount}`);
  console.log("CMS seed done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
