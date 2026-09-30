import { notFound } from "next/navigation";
import { GalleryEditorForm } from "@/components/admin/gallery-editor-form";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function AdminGalerieEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getConvexClient();
  const row = await client.query(
    api.gallery.adminGet,
    adminArgs({ id: id as Id<"galleryAlbums"> }),
  );
  if (!row) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Galerie bearbeiten</h1>
        <p className="mt-1 text-sm text-zinc-500">/{`galerie#${row.slug}`}</p>
      </div>
      <GalleryEditorForm
        initial={{
          id: row._id,
          slug: row.slug,
          title: row.title,
          eyebrow: row.eyebrow,
          description: row.description,
          location: row.location,
          year: row.year,
          sortOrder: row.sortOrder,
          published: row.published,
          images: row.images.map((img) => ({ src: img.src, alt: img.alt })),
        }}
      />
    </div>
  );
}
