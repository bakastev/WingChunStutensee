import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: new URL(site.url).host,
  };
}
