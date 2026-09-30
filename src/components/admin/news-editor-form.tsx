"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteNewsAction, saveNewsAction } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/image-field";
import { pickMedia } from "@/components/admin/media-picker";
import { WysiwygEditor } from "@/components/admin/wysiwyg-editor";
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

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function NewsEditorForm({
  initial,
}: {
  initial?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    image?: string;
    publishedAt: number;
    published: boolean;
  };
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "<p></p>");
  const [image, setImage] = useState(initial?.image ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [publishedAt, setPublishedAt] = useState(
    initial
      ? new Date(initial.publishedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );

  async function pickEditorImage(): Promise<string | null> {
    const urls = await pickMedia({ title: "Bild in Artikel einfügen" });
    return urls[0] ?? null;
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          try {
            const id = await saveNewsAction({
              id: initial?.id,
              title,
              slug: slug || slugify(title),
              excerpt,
              body,
              image: image || undefined,
              publishedAt: new Date(publishedAt).getTime(),
              published,
            });
            toast.success("Artikel gespeichert");
            router.push(`/admin/aktuelles/${id}`);
            router.refresh();
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Fehler");
          }
        });
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Artikel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!initial) setSlug(slugify(e.target.value));
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Teaser</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="published">Veröffentlicht</Label>
            </div>
          </div>
          <ImageField
            label="Titelbild"
            hint="Aus Medien wählen oder direkt hochladen."
            value={image}
            onChange={setImage}
          />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Inhalt</Label>
        <WysiwygEditor
          value={body}
          onChange={setBody}
          onUploadImage={pickEditorImage}
          placeholder="Artikeltext…"
        />
      </div>

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
              if (!confirm("Artikel wirklich löschen?")) return;
              start(async () => {
                await deleteNewsAction(initial.id);
                toast.success("Gelöscht");
                router.push("/admin/aktuelles");
                router.refresh();
              });
            }}
          >
            Löschen
          </Button>
        ) : null}
      </div>
    </form>
  );
}
