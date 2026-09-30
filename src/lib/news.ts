import { FALLBACK_NEWS, type NewsItem } from "@/content/news";

function isHtml(body: string) {
  return /^\s*</.test(body);
}

export async function newsBodyToHtml(body: string): Promise<string> {
  if (isHtml(body)) return body;
  const { markdownToHtml } = await import("@/lib/markdown");
  return markdownToHtml(body);
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!url) return FALLBACK_NEWS;

  try {
    const { ConvexHttpClient } = await import("convex/browser");
    const { api } = await import("../../convex/_generated/api");
    const client = new ConvexHttpClient(url);
    const rows = await client.query(api.news.listPublished, {});
    if (!Array.isArray(rows) || rows.length === 0) return FALLBACK_NEWS;
    return rows.map((row) => ({
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      body: row.body,
      image: row.image,
      publishedAt: row.publishedAt,
      published: row.published,
    }));
  } catch {
    return FALLBACK_NEWS;
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!url) {
    return FALLBACK_NEWS.find((n) => n.slug === slug) ?? null;
  }

  try {
    const { ConvexHttpClient } = await import("convex/browser");
    const { api } = await import("../../convex/_generated/api");
    const client = new ConvexHttpClient(url);
    const row = await client.query(api.news.getBySlug, { slug });
    if (!row || !row.published) {
      return FALLBACK_NEWS.find((n) => n.slug === slug) ?? null;
    }
    return {
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      body: row.body,
      image: row.image,
      publishedAt: row.publishedAt,
      published: row.published,
    };
  } catch {
    return FALLBACK_NEWS.find((n) => n.slug === slug) ?? null;
  }
}
