import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <Section pad="lg">
        <Container width="narrow" className="space-y-8 text-body text-pretty text-foreground-muted">
          <div>
            <h2 className="font-display text-h3 text-foreground">Angaben gemäß § 5 TMG</h2>
            <p className="mt-3">
              {site.legal.name}
              <br />
              {site.legal.org}
              <br />
              {site.legal.street}
              <br />
              {site.legal.zipCity}
            </p>
          </div>
          <div>
            <h2 className="font-display text-h3 text-foreground">Kontakt</h2>
            <p className="mt-3">
              Telefon: {site.phone.display}
              <br />
              E-Mail: {site.email}
            </p>
          </div>
          <div>
            <h2 className="font-display text-h3 text-foreground">Redaktionell verantwortlich</h2>
            <p className="mt-3">{site.legal.name}</p>
          </div>
          <div>
            <h2 className="font-display text-h3 text-foreground">EU-Streitschlichtung</h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:text-accent"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-h3 text-foreground">
              Verbraucherstreitbeilegung
            </h2>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
          <div>
            <h2 className="font-display text-h3 text-foreground">Entwicklung</h2>
            <p className="mt-3">
              Entwickelt von:{" "}
              <a
                href={site.developer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:text-accent"
              >
                {site.developer.label}
              </a>
              {" — "}
              {site.developer.tagline}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
