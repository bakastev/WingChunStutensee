"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, ImagePlus, Loader2, Search, Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  getUploadUrlAction,
  listMediaLibraryAction,
  saveMediaAction,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/shadcn-button";
import { Input } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

export type MediaPickerItem = {
  id: string;
  url: string;
  filename: string;
  folder: string;
  alt: string;
};

type MediaPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Single select returns one URL; multiple returns many. */
  multiple?: boolean;
  title?: string;
  onSelect: (urls: string[]) => void;
};

export function MediaPicker({
  open,
  onOpenChange,
  multiple = false,
  title = "Medium wählen",
  onSelect,
}: MediaPickerProps) {
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [tab, setTab] = React.useState<"site" | "uploads">("site");
  const [query, setQuery] = React.useState("");
  const [folder, setFolder] = React.useState("all");
  const [site, setSite] = React.useState<MediaPickerItem[]>([]);
  const [uploads, setUploads] = React.useState<MediaPickerItem[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!open) return;
    setSelected(new Set());
    setQuery("");
    setFolder("all");
    setLoading(true);
    void listMediaLibraryAction()
      .then((data) => {
        setSite(data.site);
        setUploads(data.uploads);
        if (data.site.length === 0 && data.uploads.length > 0) {
          setTab("uploads");
        }
      })
      .catch((err) => {
        toast.error(err instanceof Error ? err.message : "Medien nicht geladen");
      })
      .finally(() => setLoading(false));
  }, [open]);

  const folders = React.useMemo(() => {
    const set = new Set(site.map((i) => i.folder));
    return ["all", ...[...set].sort()];
  }, [site]);

  const items = React.useMemo(() => {
    const source = tab === "site" ? site : uploads;
    const q = query.trim().toLowerCase();
    return source.filter((item) => {
      if (tab === "site" && folder !== "all" && item.folder !== folder) {
        return false;
      }
      if (!q) return true;
      return (
        item.filename.toLowerCase().includes(q) ||
        item.folder.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.alt.toLowerCase().includes(q)
      );
    });
  }, [tab, site, uploads, folder, query]);

  function toggle(url: string) {
    setSelected((prev) => {
      if (!multiple) return new Set([url]);
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  function confirm() {
    const urls = [...selected];
    if (urls.length === 0) {
      toast.message("Bitte ein Bild auswählen");
      return;
    }
    onSelect(urls);
    onOpenChange(false);
  }

  async function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    const files = await new Promise<FileList | null>((resolve) => {
      input.onchange = () => resolve(input.files);
      input.click();
    });
    if (!files?.length) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const uploadUrl = await getUploadUrlAction();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = (await result.json()) as { storageId: string };
        const saved = await saveMediaAction({
          storageId,
          alt: file.name,
          filename: file.name,
          contentType: file.type,
          bytes: file.size,
        });
        newUrls.push(saved.url);
        setUploads((prev) => [
          {
            id: saved._id,
            url: saved.url,
            filename: saved.filename,
            folder: "uploads",
            alt: saved.alt,
          },
          ...prev,
        ]);
      }
      setTab("uploads");
      setSelected((prev) => {
        if (!multiple) return new Set(newUrls.slice(0, 1));
        const next = new Set(prev);
        for (const url of newUrls) next.add(url);
        return next;
      });
      toast.success(
        newUrls.length === 1
          ? "Bild hochgeladen"
          : `${newUrls.length} Bilder hochgeladen`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload fehlgeschlagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex h-[min(88vh,880px)] w-[min(96vw,1040px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl outline-none">
          <div className="flex items-start justify-between gap-3 border-b border-zinc-100 px-5 py-4">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight text-zinc-950">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-zinc-500">
                {multiple
                  ? "Mehrere Bilder auswählen oder neue hochladen."
                  : "Ein Bild aus der Bibliothek wählen oder neu hochladen."}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 px-5 py-3">
            <button
              type="button"
              onClick={() => setTab("site")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-semibold",
                tab === "site"
                  ? "bg-[#111113] text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
              )}
            >
              Website ({site.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("uploads")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-semibold",
                tab === "uploads"
                  ? "bg-[#111113] text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
              )}
            >
              Uploads ({uploads.length})
            </button>
            <div className="relative ml-auto min-w-[12rem] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Suchen…"
                className="pl-9"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => void handleUpload()}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" strokeWidth={1.75} />
              )}
              Hochladen
            </Button>
          </div>

          {tab === "site" ? (
            <div className="flex gap-1.5 overflow-x-auto border-b border-zinc-100 px-5 py-2">
              {folders.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFolder(f)}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold",
                    folder === f
                      ? "bg-amber-100 text-amber-900"
                      : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100",
                  )}
                >
                  {f === "all" ? "Alle" : f}
                </button>
              ))}
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex h-48 items-center justify-center text-sm text-zinc-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Lade Medien…
              </div>
            ) : items.length === 0 ? (
              <div className="flex h-48 flex-col items-center justify-center gap-2 text-center text-sm text-zinc-500">
                <ImagePlus className="h-8 w-8 text-zinc-300" strokeWidth={1.5} />
                <p>Keine Medien in dieser Ansicht.</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void handleUpload()}
                >
                  Bild hochladen
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {items.map((item) => {
                  const isSelected = selected.has(item.url);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.url)}
                      onDoubleClick={() => {
                        if (!multiple) {
                          onSelect([item.url]);
                          onOpenChange(false);
                        }
                      }}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border text-left transition-all",
                        isSelected
                          ? "border-[#FACF48] ring-2 ring-[#FACF48]/50"
                          : "border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      <div className="aspect-square bg-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="space-y-0.5 p-2">
                        <p className="truncate text-xs font-semibold text-zinc-900">
                          {item.filename}
                        </p>
                        <p className="truncate text-[0.65rem] text-zinc-400">
                          {item.folder}
                        </p>
                      </div>
                      {isSelected ? (
                        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FACF48] text-zinc-950 shadow">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/80 px-5 py-3">
            <p className="text-sm text-zinc-500">
              {selected.size === 0
                ? "Nichts ausgewählt"
                : multiple
                  ? `${selected.size} ausgewählt`
                  : "1 ausgewählt"}
            </p>
            <div className="flex gap-2">
              <Dialog.Close asChild>
                <Button type="button" variant="outline">
                  Abbrechen
                </Button>
              </Dialog.Close>
              <Button
                type="button"
                variant="accent"
                disabled={selected.size === 0}
                onClick={confirm}
              >
                Übernehmen
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Promise helper for TipTap / one-shot pickers. */
export function pickMedia(options?: {
  multiple?: boolean;
  title?: string;
}): Promise<string[]> {
  return new Promise((resolve) => {
    const host = document.createElement("div");
    document.body.appendChild(host);

    let root: ReturnType<typeof import("react-dom/client").createRoot> | null =
      null;
    let settled = false;

    const finish = (urls: string[]) => {
      if (settled) return;
      settled = true;
      resolve(urls);
      queueMicrotask(() => {
        root?.unmount();
        host.remove();
      });
    };

    void import("react-dom/client").then(({ createRoot }) => {
      root = createRoot(host);
      root.render(
        <MediaPickerBridge
          multiple={options?.multiple}
          title={options?.title}
          onDone={finish}
        />,
      );
    });
  });
}

function MediaPickerBridge({
  multiple,
  title,
  onDone,
}: {
  multiple?: boolean;
  title?: string;
  onDone: (urls: string[]) => void;
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <MediaPicker
      open={open}
      multiple={multiple}
      title={title}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onDone([]);
      }}
      onSelect={(urls) => onDone(urls)}
    />
  );
}
