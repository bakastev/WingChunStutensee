import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pages, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Black Dragon Team",
  description: pages.kinderWingChun.lead,
};

export default function KinderWingChunPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.kinderWingChun.eyebrow}
        title={pages.kinderWingChun.title}
        lead={pages.kinderWingChun.lead}
      />
      <Section pad="lg">
        <Container width="narrow" className="space-y-5 text-body text-pretty text-foreground-muted">
          <p>
            <strong className="text-foreground">Black Dragon</strong> ist das Wing Chun
            Training für Kids. Es ist kein reines Selbstverteidigungsprogramm, sondern
            vermittelt Fitness, Beweglichkeit, Motorik, Selbstverteidigung und Respekt.
          </p>
          <p>
            Ziel: kämpfen lernen, um nicht kämpfen zu müssen. Der Wunsch sollte von den
            Teens kommen — nicht als Pflicht der Eltern. Nur ein freier Geist ist
            wissbegierig.
          </p>
          <p>
            Black Dragon folgt der Systematik der Schülergrade. Zwölf Kindergrade mit klar
            definierten Lernzielen. Prüfungen werden in Prüfungslehrgängen von unserem Sifu
            abgenommen.
          </p>
          <p>
            Einstieg sinnvoll ab ca. acht Jahren. Mit Körperkontakt — blaue Flecken an den
            Armen sind möglich. Kleidung: schwarze Jogging-/Sporthose, weißes T-Shirt.
          </p>
          <p>
            <strong className="text-foreground">Trainingszeit:</strong> Dienstag 18:00 –
            19:00 Uhr
          </p>
          <p>
            Mobil: {site.phone.display} oder {site.phoneAlt.display}
            <br />
            E-Mail: {site.email}
          </p>
          <ButtonLink href="/kontakt#probetraining" variant="primary">
            Probetraining vereinbaren
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
