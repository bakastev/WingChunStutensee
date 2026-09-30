"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy, FolderOpen, ImagePlus, Upload } from "lucide-react";
import { getUploadUrlAction, saveMediaAction } from "@/app/admin/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/admin/ui";
import { Button } from "@/components/ui/shadcn-button";
import { cn } from "@/lib/cn";
import type { SiteMediaItem } from "@/lib/admin/site-media";

type UploadItem = {
  _id: string;
  url: string;
  filename: string;
  alt: string;
};

export function MediaLibrary({
  siteItems,
  uploads,
}: {
  siteItems: SiteMediaItem[];
  uploads: UploadItem[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState<string>("all");
  const [tab, setTab] = useState<"site" | "uploads">("site");

  const folders = useMemo(() => {
    const set = new Set(siteItems.map((i) => i.folder));
    return ["all", ...[...set].sort()];
  }, [siteItems]);

  const filteredSite = useMemo(() => {
    const q = query.trim().toLowerCase();
    return siteItems.filter((item) => {
      if (folder !== "all" && item.folder !== folder) return false;
      if (!q) return true;
      return (
        item.filename.toLowerCase().includes(q) ||
        item.folder.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q)
      );
    });
  }, [siteItems, folder, query]);

  const filteredUploads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return uploads;
    return uploads.filter(
      (item) =>
        item.filename.toLowerCase().includes(q) ||
        item.alt.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q),
    );
  }, [uploads, query]);

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    toast.success("URL kopiert");
  }

  function uploadFiles() {
    start(async () => {
      try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        const files = await new Promise<FileList | null>((resolve) => {
          input.onchange = () => resolve(input.files);
          input.click();
        });
        if (!files?.length) return;
        for (const file of Array.from(files)) {
          const uploadUrl = await getUploadUrlAction();
          const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          const { storageId } = (await result.json()) as { storageId: string };
          await saveMediaAction({
            storageId,
            alt: file.name,
            filename: file.name,
            contentType: file.type,
            bytes: file.size,
          });
        }
        toast.success("Upload fertig");
        setTab("uploads");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload fehlgeschlagen");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-600">
            Bibliothek
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Medien
          </h1>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-zinc-500">
            Alle Website-Bilder aus <code className="text-zinc-700">/images</code>{" "}
            plus neue Uploads. URL kopieren und in Texte, Aktuelles oder Galerien
            einsetzen.
          </p>
        </div>
        <Button variant="accent" disabled={pending} onClick={uploadFiles}>
          <Upload className="h-4 w-4" strokeWidth={1.75} />
          {pending ? "Lädt…" : "Hochladen"}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <TabButton
          active={tab === "site"}
          onClick={() => setTab("site")}
          label={`Website (${siteItems.length})`}
          icon={FolderOpen}
        />
        <TabButton
          active={tab === "uploads"}
          onClick={() => setTab("uploads")}
          label={`Uploads (${uploads.length})`}
          icon={ImagePlus}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suchen nach Dateiname oder Pfad…"
          className="sm:max-w-sm"
        />
        {tab === "site" ? (
          <div className="flex flex-wrap gap-1.5">
            {folders.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFolder(f)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  folder === f
                    ? "bg-[#111113] text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
                )}
              >
                {f === "all" ? "Alle Ordner" : f}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {tab === "site" ? (
        filteredSite.length === 0 ? (
          <Empty title="Keine Treffer" description="Filter oder Suche anpassen." />
        ) : (
          <MediaGrid
            items={filteredSite.map((item) => ({
              key: item.id,
              url: item.url,
              title: item.filename,
              subtitle: `/${item.folder === "root" ? "images" : `images/${item.folder}`}`,
              onCopy: () => copyUrl(item.url),
            }))}
          />
        )
      ) : uploads.length === 0 ? (
        <Empty
          title="Noch keine Uploads"
          description="Neue Bilder erscheinen hier nach dem Hochladen. Die bestehenden Site-Bilder findest du unter „Website“."
        />
      ) : filteredUploads.length === 0 ? (
        <Empty title="Keine Treffer" description="Suche anpassen." />
      ) : (
        <MediaGrid
          items={filteredUploads.map((item) => ({
            key: item._id,
            url: item.url,
            title: item.filename,
            subtitle: item.alt,
            onCopy: () => copyUrl(item.url),
          }))}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-[#FACF48] text-zinc-950"
          : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50",
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
      {label}
    </button>
  );
}

function Empty({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function MediaGrid({
  items,
}: {
  items: {
    key: string;
    url: string;
    title: string;
    subtitle: string;
    onCopy: () => void;
  }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.key} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-2 p-3">
              <div>
                <p className="truncate text-sm font-semibold text-zinc-900">
                  {item.title}
                </p>
                <p className="truncate text-xs text-zinc-500">{item.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={item.onCopy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                URL kopieren
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
