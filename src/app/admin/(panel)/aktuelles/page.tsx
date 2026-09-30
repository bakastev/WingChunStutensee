import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui";
import { Button } from "@/components/ui/shadcn-button";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";
import { DeleteNewsButton } from "@/components/admin/delete-news-button";

export default async function AdminAktuellesPage() {
  let rows: {
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    publishedAt: number;
    excerpt: string;
  }[] = [];
  let error: string | null = null;

  try {
    const client = getConvexClient();
    rows = await client.query(api.news.adminList, adminArgs({}));
  } catch (e) {
    error = e instanceof Error ? e.message : "Laden fehlgeschlagen";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-600">
            Redaktion
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Aktuelles
          </h1>
          <p className="mt-2 text-[0.95rem] text-zinc-500">
            Artikel anlegen, bearbeiten und veröffentlichen.
          </p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/aktuelles/neu">Neuer Artikel</Link>
        </Button>
      </div>

      {error ? (
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-base">Nicht geladen</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : rows.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Keine Artikel</CardTitle>
            <CardDescription>Lege den ersten Beitrag an.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <Card key={row._id}>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate font-semibold">{row.title}</h2>
                    <Badge
                      className={
                        row.published
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : ""
                      }
                    >
                      {row.published ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    {format(row.publishedAt, "dd.MM.yyyy", { locale: de })} · /
                    aktuelles/{row.slug}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                    {row.excerpt}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/aktuelles/${row._id}`}>Bearbeiten</Link>
                  </Button>
                  <DeleteNewsButton id={row._id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
