import { FALLBACK_NEWS } from "../src/content/news";

/**
 * Seed news into Convex after `npx convex dev` is running:
 *   pnpm tsx --env-file=.env.local scripts/seed-news.ts
 */
async function main() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!url) {
    console.error("NEXT_PUBLIC_CONVEX_URL fehlt");
    process.exit(1);
  }

  const { ConvexHttpClient } = await import("convex/browser");
  const { api } = await import("../convex/_generated/api");
  const client = new ConvexHttpClient(url);

  const count = await client.mutation(api.news.seedPublic, {
    items: FALLBACK_NEWS,
  });
  console.log(`Seeded ${count} news items`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
