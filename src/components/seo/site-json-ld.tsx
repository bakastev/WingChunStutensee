import { buildSiteJsonLd } from "@/lib/seo/site-graph";

/** Server-rendered JSON-LD for LocalBusiness / SportsActivityLocation + WebSite. */
export function SiteJsonLd() {
  const data = buildSiteJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
