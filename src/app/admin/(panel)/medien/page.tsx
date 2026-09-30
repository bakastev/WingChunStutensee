import { MediaLibrary } from "@/components/admin/media-library";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";
import { listSiteMedia } from "@/lib/admin/site-media";

export default async function AdminMedienPage() {
  const siteItems = await listSiteMedia();
  let uploads: { _id: string; url: string; filename: string; alt: string }[] =
    [];
  let error: string | null = null;

  try {
    const client = getConvexClient();
    uploads = await client.query(api.media.adminList, adminArgs({}));
  } catch (e) {
    error = e instanceof Error ? e.message : "Uploads nicht geladen";
  }

  return (
    <div className="space-y-4">
      {error ? (
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-base">Uploads nicht erreichbar</CardTitle>
            <CardDescription>
              {error}. Website-Medien werden trotzdem angezeigt.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}
      <MediaLibrary siteItems={siteItems} uploads={uploads} />
    </div>
  );
}
