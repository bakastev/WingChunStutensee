import type { Metadata } from "next";
import {
  GalleryWithLightbox,
  type GallerySectionData,
} from "@/components/gallery/gallery-with-lightbox";
import { PageHeader } from "@/components/layout/page-header";
import { galleryEvents, galleryTrainingsraum, pages } from "@/content/site";

export const metadata: Metadata = {
  title: "Bildergalerie",
  description: pages.galerie.lead,
};

const sections: GallerySectionData[] = [
  ...galleryEvents.map((event, index) => ({
    id: event.slug,
    eyebrow: `${event.year}${event.location ? ` · ${event.location}` : ""}`,
    title: event.title,
    images: event.images,
    layout: (event.images.length === 1 ? "single" : "grid") as "single" | "grid",
    tone: (index % 2 === 0 ? "default" : "muted") as "default" | "muted",
  })),
  {
    id: galleryTrainingsraum.slug,
    eyebrow: "Akademie",
    title: galleryTrainingsraum.title,
    description: galleryTrainingsraum.description,
    images: galleryTrainingsraum.images,
    layout: "rooms",
    tone: "muted",
  },
];

export default function GaleriePage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.galerie.eyebrow}
        title={pages.galerie.title}
        lead={pages.galerie.lead}
      />
      <GalleryWithLightbox sections={sections} />
    </>
  );
}
