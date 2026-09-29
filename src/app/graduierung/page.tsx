import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { gradeLevels, pages } from "@/content/site";

export const metadata: Metadata = {
  title: "Graduierungssystem",
  description: pages.graduierung.lead,
};

export default function GraduierungPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.graduierung.eyebrow}
        title={pages.graduierung.title}
        lead={pages.graduierung.lead}
      />
      <Section pad="lg">
        <Container width="content" className="space-y-6 text-body text-pretty text-foreground-muted">
          <p>
            Das WingChun System ist unterteilt in 5 Stufen: Grundstufe (1.–4.), Mittelstufe
            (5.–8.), Oberstufe (9.–12.), Technikerstufe (1.–4./5.) und Meistergrad.
          </p>
          <p>
            Es gibt keine Gürtel. Nach bestandener Prüfung erhält der Schüler das
            Graduierungsabzeichen (Blüte) für die linke Shirt-/Kittel-Seite.
          </p>
          <p>
            Schüler der Grund- und Mittelstufe tragen weißes T-Shirt. Ab der Oberstufe
            schwarzes T-Shirt bzw. traditionellen Anzug. Ab der Technikerstufe den
            traditionellen Anzug mit roten Streifen.
          </p>
        </Container>
      </Section>

      {Object.values(gradeLevels).map((stufe) => (
        <Section key={stufe.title} tone="muted" pad="lg">
          <Container>
            <h2 className="font-display text-h2">{stufe.title}</h2>
            <p className="mt-2 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-foreground-muted">
              {stufe.range} · {stufe.clothing}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stufe.levels.map((level) => (
                <figure key={level} className="flex flex-col items-center gap-3 border border-border bg-surface p-4">
                  <div className="relative aspect-square w-full max-w-[8rem]">
                    <Image
                      src={`/images/grades/level-${level}.png`}
                      alt={`Schülergrad ${level}`}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                  <figcaption className="text-center font-sans text-[0.6875rem] uppercase tracking-[0.14em]">
                    {level}. Schülergrad
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section pad="lg">
        <Container width="narrow" className="space-y-4 text-body text-pretty text-foreground-muted">
          <h2 className="font-display text-h3 text-foreground">Technikerstufe</h2>
          <p>
            Schwarzes Shirt mit rotem Logo, Hose mit roten Streifen. Vorprüfung erforderlich.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[2, 3, 4, 5].map((n) => (
              <figure key={n} className="flex flex-col items-center gap-2 border border-border p-3">
                <div className="relative aspect-square w-full max-w-[7rem]">
                  <Image
                    src={`/images/grades/techniker-${n}.png`}
                    alt={`Technikergrad ${n}`}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
                <figcaption className="text-center text-caption uppercase tracking-[0.12em]">
                  {n}. Techniker
                </figcaption>
              </figure>
            ))}
          </div>
          <p>
            Prüfungen nach regelmäßigem Unterricht und Einverständnis des Lehrers.
            Mitgliedsausweis und Trainingsbekleidung erforderlich.
          </p>
        </Container>
      </Section>
    </>
  );
}
