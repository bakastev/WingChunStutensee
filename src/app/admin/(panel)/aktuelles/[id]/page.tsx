import { notFound } from "next/navigation";
import { NewsEditorForm } from "@/components/admin/news-editor-form";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function AdminNewsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getConvexClient();
  const row = await client.query(
    api.news.adminGet,
    adminArgs({ id: id as Id<"news"> }),
  );
  if (!row) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Artikel bearbeiten</h1>
        <p className="mt-1 text-sm text-zinc-500">/{`aktuelles/${row.slug}`}</p>
      </div>
      <NewsEditorForm
        initial={{
          id: row._id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          body: row.body,
          image: row.image,
          publishedAt: row.publishedAt,
          published: row.published,
        }}
      />
    </div>
  );
}
