import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";
import { getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy("erwachsene");
  return {
    title: "Erwachsene",
    description: copy.lead,
  };
}

export default async function ErwachsenePage() {
  const copy = await getPageCopy("erwachsene");

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
      />
      <Section pad="lg">
        <Container width="narrow" className="space-y-5 text-body text-pretty text-foreground-muted">
          <p>
            Wing Chun bietet Dir mehr als nur reine Selbstverteidigung. Es ist eine
            Kampfkunst, in der Körper und Geist geschult werden. Der Fokus liegt nicht auf
            Techniken allein, sondern auf Prinzipien, Funktionen und taktischen
            Überlegungen im Einklang mit physikalischen Grundlagen.
          </p>
          <p>
            Wing Chun kann man in jedem Alter erlernen — unabhängig von Geschlecht,
            Fitness oder Körperbau. Bei uns ist jeder willkommen, der Spaß und Lust auf
            etwas Neues hat.
          </p>
          <p>
            Regelmäßiges Training verbessert Beweglichkeit, Konzentration, Kraft und
            Sensomotorik. Es stärkt indirekt Dein Selbstbewusstsein und gibt Dir mehr
            Sicherheit im Alltag.
          </p>
          <p>
            Im Vergleich zu vielen Kampfsportarten ist Wing Chun reine Selbstverteidigung.
            Realistische und effektive Techniken stehen im Vordergrund. Für den Start
            brauchst Du keinerlei Kampfkunsterfahrung.
          </p>
          <p>
            Mobil:{" "}
            <a href={`tel:${site.phone.tel}`} className="text-foreground hover:text-accent">
              {site.phone.display}
            </a>{" "}
            oder{" "}
            <a href={`tel:${site.phoneAlt.tel}`} className="text-foreground hover:text-accent">
              {site.phoneAlt.display}
            </a>
            <br />
            E-Mail:{" "}
            <a href={`mailto:${site.email}`} className="text-foreground hover:text-accent">
              {site.email}
            </a>
          </p>
          <ButtonLink href="/kontakt#probetraining" variant="primary" className="mt-4">
            Kostenloses Probetraining
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
