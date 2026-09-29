"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "@/styles/lightbox.css";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/components/gallery/gallery-with-lightbox";

type ImageLightboxGridProps = {
  images: readonly GalleryImage[];
  caption: string;
  className?: string;
  sizes?: string;
};

export function ImageLightboxGrid({
  images,
  caption,
  className,
  sizes = "(max-width: 640px) 50vw, 25vw",
}: ImageLightboxGridProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides: SlideImage[] = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
        title: caption,
        description: image.alt !== caption ? image.alt : undefined,
      })),
    [images, caption],
  );

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  if (images.length === 0) return null;

  return (
    <>
      <ul className={cn("grid gap-2 sm:gap-3", className)}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => openAt(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-surface-band text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              aria-label={`${img.alt} vergrößern`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes={sizes}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink-950/80 via-ink-950/25 to-transparent px-3 pb-3 pt-10 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
              >
                <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-white/90">
                  Zoomen
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={slides}
        labels={{
          Close: "Schließen",
          Next: "Nächstes Bild",
          Previous: "Vorheriges Bild",
          "Zoom in": "Vergrößern",
          "Zoom out": "Verkleinern",
          "Enter Fullscreen": "Vollbild",
          "Exit Fullscreen": "Vollbild beenden",
        }}
        plugins={[Zoom, Captions, Counter, Fullscreen]}
        carousel={{
          finite: false,
          preload: 2,
          padding: "16px",
          spacing: "16px",
          imageFit: "contain",
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        animation={{ fade: 220, swipe: 280 }}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          pinchZoomV4: true,
          scrollToZoom: true,
        }}
        captions={{
          showToggle: false,
          descriptionTextAlign: "start",
          descriptionMaxLines: 3,
        }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        styles={{
          root: { zIndex: 10000 },
          container: { backgroundColor: "rgba(7, 7, 7, 0.97)" },
          captionsTitle: {
            fontFamily: "inherit",
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          },
          captionsDescription: {
            fontFamily: "inherit",
            fontSize: "0.8rem",
            opacity: 0.75,
          },
        }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        className="wcs-lightbox"
      />
    </>
  );
}
