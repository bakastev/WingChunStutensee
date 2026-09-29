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

export type GalleryImage = {
  src: string;
  alt: string;
};

export type GallerySectionData = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  images: readonly GalleryImage[];
  /** Single-image sections use a narrower grid. */
  layout?: "grid" | "single" | "rooms";
  tone?: "default" | "muted";
};

type GalleryWithLightboxProps = {
  sections: readonly GallerySectionData[];
};

function slideFromImage(image: GalleryImage, caption: string): SlideImage {
  return {
    src: image.src,
    alt: image.alt,
    title: caption,
    description: image.alt !== caption ? image.alt : undefined,
  };
}

export function GalleryWithLightbox({ sections }: GalleryWithLightboxProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { slides, flat } = useMemo(() => {
    const flatMap: { image: GalleryImage; caption: string; sectionId: string }[] =
      [];
    for (const section of sections) {
      for (const image of section.images) {
        flatMap.push({
          image,
          caption: section.title,
          sectionId: section.id,
        });
      }
    }
    return {
      flat: flatMap,
      slides: flatMap.map(({ image, caption }) =>
        slideFromImage(image, caption),
      ),
    };
  }, [sections]);

  const openAt = useCallback(
    (sectionId: string, imageSrc: string) => {
      const i = flat.findIndex(
        (item) => item.sectionId === sectionId && item.image.src === imageSrc,
      );
      if (i < 0) return;
      setIndex(i);
      setOpen(true);
    },
    [flat],
  );

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  let offset = 0;

  return (
    <>
      {sections.map((section) => {
        const start = offset;
        offset += section.images.length;
        const layout = section.layout ?? "grid";

        return (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "scroll-mt-8 py-9 sm:py-14 md:py-20",
              section.tone === "muted"
                ? "bg-surface-muted text-foreground"
                : "bg-background text-foreground",
              section.id === "trainingsraum" && "border-t border-border",
            )}
            aria-labelledby={`gallery-${section.id}`}
          >
            <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12 xl:px-14">
              <header className="max-w-3xl">
                <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-yellow-500">
                  {section.eyebrow}
                </p>
                <h2
                  id={`gallery-${section.id}`}
                  className="mt-3 font-display text-[clamp(1.375rem,3vw,2rem)] leading-[1.15] tracking-[-0.02em] text-balance"
                >
                  {section.title}
                </h2>
                <span aria-hidden className="mt-4 block h-1 w-10 bg-yellow-500" />
                {section.description ? (
                  <p className="mt-5 max-w-xl text-[0.9875rem] leading-[1.7] text-foreground-muted">
                    {section.description}
                  </p>
                ) : null}
              </header>

              <ul
                className={cn(
                  "mt-8 grid gap-3",
                  layout === "single" && "max-w-3xl",
                  layout === "grid" && "sm:grid-cols-2 lg:grid-cols-3",
                  layout === "rooms" && "sm:grid-cols-2 lg:grid-cols-4",
                )}
              >
                {section.images.map((img, imageIndex) => (
                  <li key={img.src}>
                    <button
                      type="button"
                      onClick={() => openAt(section.id, img.src)}
                      className="group relative block aspect-[4/3] w-full overflow-hidden bg-surface-band text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                      aria-label={`${img.alt} vergrößern`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        sizes={
                          layout === "single"
                            ? "(max-width: 768px) 100vw, 48rem"
                            : layout === "rooms"
                              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        priority={start + imageIndex < 3}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink-950/80 via-ink-950/25 to-transparent px-3 pb-3 pt-10 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                      >
                        <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-white/90">
                          Zoomen
                        </span>
                        <span className="inline-flex h-9 w-9 items-center justify-center border border-white/40 bg-ink-950/50 text-white backdrop-blur-sm">
                          <ZoomIcon />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <Lightbox
        open={open}
        index={index}
        close={close}
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

function ZoomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16 16l5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
      <path
        d="M10.5 8v5M8 10.5h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}
