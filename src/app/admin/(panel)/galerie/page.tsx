import Link from "next/link";
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

export default async function AdminGaleriePage() {
  let rows: {
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    year?: number;
    images: { src: string }[];
    sortOrder: number;
  }[] = [];
  let error: string | null = null;

  try {
    const client = getConvexClient();
    rows = await client.query(api.gallery.adminList, adminArgs({}));
  } catch (e) {
    error = e instanceof Error ? e.message : "Laden fehlgeschlagen";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-600">
            Medien
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Galerien
          </h1>
          <p className="mt-2 text-[0.95rem] text-zinc-500">
            Events und Bilderalben anlegen, sortieren und veröffentlichen.
          </p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/galerie/neu">Neue Galerie</Link>
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
            <CardTitle>Keine Galerien</CardTitle>
            <CardDescription>
              Seed ausführen oder erste Galerie anlegen.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map((row) => (
            <Card key={row._id}>
              <CardContent className="p-0">
                {row.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={row.images[0].src}
                    alt=""
                    className="aspect-[16/10] w-full rounded-t-xl object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center rounded-t-xl bg-zinc-100 text-sm text-zinc-400">
                    Kein Bild
                  </div>
                )}
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold">{row.title}</h2>
                      <p className="text-xs text-zinc-500">
                        {row.year ?? "—"} · {row.images.length} Bilder · Sort{" "}
                        {row.sortOrder}
                      </p>
                    </div>
                    <Badge
                      className={
                        row.published
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : ""
                      }
                    >
                      {row.published ? "Live" : "Entwurf"}
                    </Badge>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/galerie/${row._id}`}>Bearbeiten</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
