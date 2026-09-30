"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import {
  deleteGalleryAlbumAction,
  saveGalleryAlbumAction,
} from "@/app/admin/actions";
import { MediaPicker } from "@/components/admin/media-picker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/admin/ui";
import { Button } from "@/components/ui/shadcn-button";

type GalleryImage = { src: string; alt: string };

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function GalleryEditorForm({
  initial,
}: {
  initial?: {
    id: string;
    slug: string;
    title: string;
    eyebrow?: string;
    description?: string;
    location?: string;
    year?: number;
    sortOrder: number;
    published: boolean;
    images: GalleryImage[];
  };
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [eyebrow, setEyebrow] = useState(initial?.eyebrow ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [year, setYear] = useState(
    String(initial?.year ?? new Date().getFullYear()),
  );
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [published, setPublished] = useState(initial?.published ?? true);
  const [images, setImages] = useState<GalleryImage[]>(initial?.images ?? []);

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          start(async () => {
            try {
              const id = await saveGalleryAlbumAction({
                id: initial?.id,
                title,
                slug: slug || slugify(title),
                eyebrow: eyebrow || undefined,
                description: description || undefined,
                location: location || undefined,
                year: Number(year) || undefined,
                sortOrder: Number(sortOrder) || 0,
                published,
                images,
              });
              toast.success("Galerie gespeichert");
              router.push(`/admin/galerie/${id}`);
              router.refresh();
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Fehler");
            }
          });
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Galerie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Titel</Label>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!initial) setSlug(slugify(e.target.value));
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Eyebrow</Label>
                <Input
                  value={eyebrow}
                  onChange={(e) => setEyebrow(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Ort</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Jahr</Label>
                <Input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Sortierung</Label>
                <Input
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Beschreibung</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <Label htmlFor="published">Veröffentlicht</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>Bilder ({images.length})</CardTitle>
            <Button
              type="button"
              variant="accent"
              size="sm"
              onClick={() => setPickerOpen(true)}
            >
              <ImagePlus className="h-4 w-4" strokeWidth={1.75} />
              Aus Medien hinzufügen
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {images.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Noch keine Bilder. Wähle vorhandene Medien oder lade neue hoch.
              </p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((img, index) => (
                  <li
                    key={`${img.src}-${index}`}
                    className="rounded-xl border border-zinc-200 p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="aspect-[4/3] w-full rounded-lg object-cover"
                    />
                    <Input
                      className="mt-2"
                      value={img.alt}
                      onChange={(e) => {
                        const next = [...images];
                        next[index] = { ...img, alt: e.target.value };
                        setImages(next);
                      }}
                      placeholder="Alt-Text"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-1"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                    >
                      Entfernen
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="accent" disabled={pending}>
            {pending ? "Speichert…" : "Speichern"}
          </Button>
          {initial ? (
            <Button
              type="button"
              variant="destructive"
              disabled={pending}
              onClick={() => {
                if (!confirm("Galerie löschen?")) return;
                start(async () => {
                  await deleteGalleryAlbumAction(initial.id);
                  toast.success("Gelöscht");
                  router.push("/admin/galerie");
                  router.refresh();
                });
              }}
            >
              Löschen
            </Button>
          ) : null}
        </div>
      </form>

      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        multiple
        title="Bilder zur Galerie hinzufügen"
        onSelect={(urls) => {
          const additions = urls
            .filter((url) => !images.some((img) => img.src === url))
            .map((url) => ({
              src: url,
              alt: title || "Galeriebild",
            }));
          if (additions.length === 0) {
            toast.message("Bilder sind bereits in der Galerie");
            return;
          }
          setImages((prev) => [...prev, ...additions]);
          toast.success(
            additions.length === 1
              ? "Bild hinzugefügt"
              : `${additions.length} Bilder hinzugefügt`,
          );
        }}
      />
    </>
  );
}
