import { buildLlmsJson } from "@/lib/seo/site-graph";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildLlmsJson(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
