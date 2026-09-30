import { hero as heroFallback, pages } from "@/content/site";

export type PageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
};

export type HeroCopy = {
  eyebrow: string;
  headline: string[];
  accentLineIndex: number;
  body: string[];
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export async function getContentMap(): Promise<Record<string, string>> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!url) return {};
  try {
    const { ConvexHttpClient } = await import("convex/browser");
    const { api } = await import("../../convex/_generated/api");
    const client = new ConvexHttpClient(url);
    return await client.query(api.content.mapAll, {});
  } catch {
    return {};
  }
}

export async function getPageCopy(
  pageKey: keyof typeof pages,
): Promise<PageCopy> {
  const fallback = pages[pageKey];
  const map = await getContentMap();
  return {
    eyebrow: map[`${pageKey}.eyebrow`] ?? fallback.eyebrow,
    title: map[`${pageKey}.title`] ?? fallback.title,
    lead: map[`${pageKey}.lead`] ?? fallback.lead,
  };
}

export async function getContentValue(key: string, fallback: string) {
  const map = await getContentMap();
  return map[key] ?? fallback;
}

export async function getHeroCopy(): Promise<HeroCopy> {
  const map = await getContentMap();
  const headlineRaw =
    map["home.hero.headline"] ?? heroFallback.headline.join("\n");
  const bodyRaw = map["home.hero.body"] ?? heroFallback.body.join("\n\n");
  const accent = Number(map["home.hero.accentLineIndex"]);
  return {
    eyebrow: map["home.hero.eyebrow"] ?? heroFallback.eyebrow,
    headline: headlineRaw
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean),
    accentLineIndex: Number.isFinite(accent)
      ? accent
      : heroFallback.accentLineIndex,
    body: bodyRaw
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    image: map["home.hero.image"] ?? heroFallback.image,
    imageAlt: map["home.hero.imageAlt"] ?? heroFallback.imageAlt,
    primaryCta: {
      label:
        map["home.hero.primaryCtaLabel"] ?? heroFallback.primaryCta.label,
      href: map["home.hero.primaryCtaHref"] ?? heroFallback.primaryCta.href,
    },
    secondaryCta: {
      label:
        map["home.hero.secondaryCtaLabel"] ??
        heroFallback.secondaryCta.label,
      href:
        map["home.hero.secondaryCtaHref"] ?? heroFallback.secondaryCta.href,
    },
  };
}
