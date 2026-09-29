import Image from "next/image";
import Link from "next/link";
import { ImageLightboxGrid } from "@/components/gallery/image-lightbox-grid";
import { Hero } from "@/components/sections/hero";
import { ValuesBand } from "@/components/sections/values-band";
import { ContactForm } from "@/components/forms/contact-form";
import { OsmEmbed } from "@/components/maps/osm-embed";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  benefits,
  ctaPanel,
  galleryTrainingsraum,
  schedule,
  site,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesBand />

      <Section tone="default" pad="lg" aria-labelledby="benefits-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
                Vorteile
              </p>
              <h2
                id="benefits-heading"
                className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-balance"
              >
                Was bringt Dir das Training?
              </h2>
              <p className="mt-5 max-w-sm text-[0.9875rem] leading-[1.7] text-foreground-muted">
                Wing Chun ist keine Show. Du trainierst für Situationen, in denen
                es zählt — und nimmst Kraft, Fitness und Haltung mit nach Hause.
              </p>
            </div>

            <ol className="divide-y divide-border border-y border-border">
              {benefits.map((item, index) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-7"
                >
                  <span className="font-display text-[1.375rem] tabular-nums text-yellow-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.125rem] leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.65] text-pretty text-foreground-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="default" pad="lg" aria-labelledby="unique-heading">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
              Wing Chun
            </p>
            <h2
              id="unique-heading"
              className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-balance"
            >
              Was macht Wing Chun einzigartig?
            </h2>
            <span aria-hidden className="mt-5 block h-1 w-12 bg-yellow-500" />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-[1.7] text-foreground-muted">
              <p>
                Wing Chun ist eine Kampfkunst für die Selbstverteidigung —
                explosive, präzise und kraftvolle Techniken. Ein Zusammenspiel
                von Körper und Geist.
              </p>
              <p>
                Körperliche Voraussetzungen spielen eine untergeordnete Rolle.
                Wing Chun kann von jedem gelernt werden, unabhängig von Alter und
                Geschlecht.
              </p>
            </div>
            <ButtonLink href="/wing-chun" variant="arrow" className="mt-9">
              Mehr über Wing Chun
            </ButtonLink>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden bg-surface-band lg:aspect-[5/4]">
            <Image
              src="/images/people/igor-home.jpg"
              alt="Sifu Igor Peic — Wing Chun Stutensee"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent px-4 pb-4 pt-12">
              <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-yellow-500">
                {site.sifu}
              </p>
            </figcaption>
          </figure>
        </Container>
      </Section>

      <Section tone="muted" pad="lg" aria-labelledby="schedule-heading">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
                Zeiten
              </p>
              <h2
                id="schedule-heading"
                className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em]"
              >
                Trainingszeiten
              </h2>
            </div>
            <ButtonLink href="/trainingszeiten" variant="outline">
              Alle Zeiten
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Erwachsene
              </p>
              <ul className="mt-6 space-y-6">
                {schedule.adults.map((row) => (
                  <li key={row.title}>
                    <p className="font-display text-[1.375rem] text-foreground">
                      {row.title}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-foreground-muted">
                      {row.days}
                    </p>
                    <p className="mt-2 font-display text-[1.75rem] tabular-nums tracking-tight text-yellow-500">
                      {row.time.replace(" Uhr", "")}
                      <span className="ml-2 text-[0.75rem] font-sans font-medium uppercase tracking-[0.16em] text-foreground-muted">
                        Uhr
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Kinder
              </p>
              <ul className="mt-6 space-y-6">
                {schedule.kids.map((row) => (
                  <li key={row.title}>
                    <p className="font-display text-[1.375rem] text-foreground">
                      {row.title}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-foreground-muted">
                      {row.days}
                    </p>
                    <p className="mt-2 font-display text-[1.75rem] tabular-nums tracking-tight text-yellow-500">
                      {row.time.replace(" Uhr", "")}
                      <span className="ml-2 text-[0.75rem] font-sans font-medium uppercase tracking-[0.16em] text-foreground-muted">
                        Uhr
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="default" pad="lg" aria-labelledby="location-heading">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
              Standort
            </p>
            <h2
              id="location-heading"
              className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em]"
            >
              Hier findest Du uns
            </h2>
            <span aria-hidden className="mt-5 block h-1 w-12 bg-yellow-500" />
            <p className="mt-6 font-display text-[1.25rem] leading-snug text-foreground">
              {site.address.street}
              <br />
              {site.address.zipCity}
            </p>
            <a
              href={site.map.osmDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex font-sans text-[0.75rem] uppercase tracking-[0.14em] text-yellow-500 hover:text-yellow-400"
            >
              Routenplaner öffnen →
            </a>
            <p className="mt-4 max-w-sm text-caption text-foreground-subtle">
              Die Karte lädt OpenStreetMap. Mit dem Klick wird eine Anfrage mit
              Deiner IP-Adresse gesendet.{" "}
              <Link href="/datenschutz" className="underline hover:text-yellow-500">
                Datenschutz
              </Link>
            </p>
          </div>
          <OsmEmbed lat={site.map.lat} lon={site.map.lon} label={site.name} />
        </Container>
      </Section>

      <Section tone="muted" pad="lg" aria-labelledby="room-heading">
        <Container>
          <div>
            <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
              Akademie
            </p>
            <h2
              id="room-heading"
              className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em]"
            >
              Unser Trainingsraum
            </h2>
            <p className="mt-4 max-w-xl text-[0.9875rem] leading-[1.7] text-foreground-muted">
              {galleryTrainingsraum.description}
            </p>
          </div>

          <ImageLightboxGrid
            images={galleryTrainingsraum.images}
            caption={galleryTrainingsraum.title}
            className="mt-10 grid-cols-1 sm:grid-cols-2"
            sizes="(max-width: 640px) 100vw, 50vw"
          />

          <div className="mt-8">
            <ButtonLink href="/galerie" variant="arrow">
              Zur Bildergalerie
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section
        id="probetraining"
        tone="accent"
        pad="lg"
        aria-labelledby="trial-heading"
        className="scroll-mt-4"
      >
        <Container width="narrow">
          <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-accent-foreground/70">
            {ctaPanel.title}
          </p>
          <h2
            id="trial-heading"
            className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-accent-foreground"
          >
            Probetraining vereinbaren
          </h2>
          <span
            aria-hidden
            className="mt-5 block h-1 w-12 bg-accent-foreground"
          />
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-pretty text-accent-foreground/85">
            {ctaPanel.body} Gerne kannst Du einen Freund oder Partner mitbringen.
          </p>
          <div className="mt-10 border border-accent-foreground/25 bg-background p-6 text-foreground sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
