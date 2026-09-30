import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Images,
  Newspaper,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";
import { cn } from "@/lib/cn";
import type { ComponentType } from "react";

export default async function AdminDashboardPage() {
  let newsCount = 0;
  let albumCount = 0;
  let contentCount = 0;
  let publishedNews = 0;
  let publishedAlbums = 0;
  let convexOk = true;
  let error: string | null = null;

  try {
    const client = getConvexClient();
    const [news, albums, content] = await Promise.all([
      client.query(api.news.adminList, adminArgs({})),
      client.query(api.gallery.adminList, adminArgs({})),
      client.query(api.content.adminList, adminArgs({})),
    ]);
    newsCount = news.length;
    albumCount = albums.length;
    contentCount = content.length;
    publishedNews = news.filter((n) => n.published).length;
    publishedAlbums = albums.filter((a) => a.published).length;
  } catch (e) {
    convexOk = false;
    error = e instanceof Error ? e.message : "Convex nicht erreichbar";
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-600">
          Content Studio
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          Übersicht
        </h1>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-zinc-500">
          Texte, Aktuelles und Galerien der Akademie — redaktionell, ohne
          Entwickler-Modus.
        </p>
      </div>

      {!convexOk ? (
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-base">Backend nicht bereit</CardTitle>
            <CardDescription className="text-amber-900/80">
              {error}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Texte"
          value={contentCount}
          hint="CMS-Felder"
          href="/admin/inhalte"
          icon={FileText}
        />
        <StatCard
          title="Aktuelles"
          value={newsCount}
          hint={`${publishedNews} live`}
          href="/admin/aktuelles"
          icon={Newspaper}
        />
        <StatCard
          title="Galerien"
          value={albumCount}
          hint={`${publishedAlbums} live`}
          href="/admin/galerie"
          icon={Images}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-zinc-100 bg-zinc-50/60">
            <CardTitle className="text-base">Schnellstart</CardTitle>
            <CardDescription>Die häufigsten Redaktionsaufgaben</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 p-4 sm:grid-cols-3 sm:p-5">
            <QuickLink href="/admin/aktuelles/neu" label="Neuer Artikel" primary />
            <QuickLink href="/admin/galerie/neu" label="Neue Galerie" />
            <QuickLink href="/admin/inhalte" label="Texte öffnen" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-zinc-100 bg-zinc-50/60">
            <CardTitle className="text-base">Arbeitsweise</CardTitle>
            <CardDescription>Kurz und klar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-5 text-sm leading-relaxed text-zinc-600">
            <p>
              Unter <strong className="font-semibold text-zinc-900">Texte</strong>{" "}
              bearbeitest du Seitenköpfe und den Hero — seitenweise, mit Vorschau.
            </p>
            <p>
              <strong className="font-semibold text-zinc-900">Aktuelles</strong> und{" "}
              <strong className="font-semibold text-zinc-900">Galerien</strong>{" "}
              erscheinen auf der Website erst nach Veröffentlichung.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  hint,
  href,
  icon: Icon,
}: {
  title: string;
  value: number;
  hint: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:border-zinc-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-[#FACF48]/30">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-zinc-700" />
      </div>
      <p className="mt-5 text-sm font-medium text-zinc-500">{title}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-zinc-950">
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-400">{hint}</p>
    </Link>
  );
}

function QuickLink({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center rounded-xl px-3 py-3 text-center text-sm font-semibold transition-colors",
        primary
          ? "bg-[#FACF48] text-zinc-950 hover:bg-[#f5c53a]"
          : "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
      )}
    >
      {label}
    </Link>
  );
}
