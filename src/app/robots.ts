import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/styleguide", "/api/", "/admin"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/styleguide", "/api/", "/admin"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/styleguide", "/api/", "/admin"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/styleguide", "/api/", "/admin"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/styleguide", "/api/", "/admin"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/styleguide", "/api/", "/admin"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: new URL(site.url).host,
  };
}
