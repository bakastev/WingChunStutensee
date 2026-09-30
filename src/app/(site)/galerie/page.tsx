import type { Metadata } from "next";
import { GalleryWithLightbox } from "@/components/gallery/gallery-with-lightbox";
import { PageHeader } from "@/components/layout/page-header";
import { getPageCopy } from "@/lib/content";
import { getGallerySections } from "@/lib/gallery";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy("galerie");
  return {
    title: "Bildergalerie",
    description: copy.lead,
  };
}

export default async function GaleriePage() {
  const [sections, copy] = await Promise.all([
    getGallerySections(),
    getPageCopy("galerie"),
  ]);

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
      <GalleryWithLightbox sections={sections} />
    </>
  );
}
