import { ContentStudio } from "@/components/admin/content-studio";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";

export default async function AdminInhaltePage() {
  let entries: {
    _id: string;
    key: string;
    group: string;
    label: string;
    format: "plain" | "html" | "markdown";
    value: string;
  }[] = [];
  let error: string | null = null;

  try {
    const client = getConvexClient();
    entries = await client.query(api.content.adminList, adminArgs({}));
  } catch (e) {
    error = e instanceof Error ? e.message : "Laden fehlgeschlagen";
  }

  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-600">
          Content
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          Texte
        </h1>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-zinc-500">
          Seitenweise bearbeiten — Eyebrow, Titel, Einleitung und Hero. Speichern
          schreibt nur geänderte Felder auf die Live-Seite.
        </p>
      </div>

      {error ? (
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-base">Nicht geladen</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : entries.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Noch keine Texte</CardTitle>
            <CardDescription>
              Seed ausführen: `pnpm tsx --env-file=.env.local scripts/seed-cms.ts`
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ContentStudio entries={entries} />
      )}
    </div>
  );
}
