import {
  galleryEvents,
  galleryTrainingsraum,
} from "@/content/site";
import type { GallerySectionData } from "@/components/gallery/gallery-with-lightbox";

function fallbackSections(): GallerySectionData[] {
  return [
    ...galleryEvents.map((event, index) => ({
      id: event.slug,
      eyebrow: `${event.year}${event.location ? ` · ${event.location}` : ""}`,
      title: event.title,
      images: [...event.images],
      layout: (event.images.length === 1 ? "single" : "grid") as "single" | "grid",
      tone: (index % 2 === 0 ? "default" : "muted") as "default" | "muted",
    })),
    {
      id: galleryTrainingsraum.slug,
      eyebrow: "Akademie",
      title: galleryTrainingsraum.title,
      description: galleryTrainingsraum.description,
      images: [...galleryTrainingsraum.images],
      layout: "rooms" as const,
      tone: "muted" as const,
    },
  ];
}

export async function getGallerySections(): Promise<GallerySectionData[]> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!url) return fallbackSections();

  try {
    const { ConvexHttpClient } = await import("convex/browser");
    const { api } = await import("../../convex/_generated/api");
    const client = new ConvexHttpClient(url);
    const albums = await client.query(api.gallery.listPublished, {});
    if (!Array.isArray(albums) || albums.length === 0) return fallbackSections();

    return albums.map((album, index) => {
      const isRooms = album.slug === "trainingsraum";
      return {
        id: album.slug,
        eyebrow:
          album.eyebrow ??
          (album.year
            ? `${album.year}${album.location ? ` · ${album.location}` : ""}`
            : "Galerie"),
        title: album.title,
        description: album.description,
        images: album.images.map((img) => ({ src: img.src, alt: img.alt })),
        layout: isRooms
          ? ("rooms" as const)
          : album.images.length === 1
            ? ("single" as const)
            : ("grid" as const),
        tone: (index % 2 === 0 ? "default" : "muted") as "default" | "muted",
      };
    });
  } catch {
    return fallbackSections();
  }
}
