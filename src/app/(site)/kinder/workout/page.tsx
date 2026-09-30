import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";
import { getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy("kinderWorkout");
  return {
    title: "Kinder-Workout",
    description: copy.lead,
  };
}

export default async function KinderWorkoutPage() {
  const copy = await getPageCopy("kinderWorkout");

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
            Workout ist kein Bodybuilding und kein reines Krafttraining. Kinder-Workout
            fördert Sensomotorik, Beweglichkeit, Dehnbarkeit und allgemeine Fitness.
          </p>
          <p>
            Viele Kinder verbringen mehr Zeit vor Handy und PC. Workout steuert dagegen:
            motorische Fähigkeiten, Gleichgewichtssinn, Muskulatur und Beweglichkeit —
            nur mit dem eigenen Körper.
          </p>
          <p>
            Sit-ups, Arme kreisen, Liegestütze, Planks — unter dem Motto ohne Druck, mit
            Spaß und Musik. Jeder macht so gut und so viel er kann.
          </p>
          <p>
            Einstieg sinnvoll ab ca. acht Jahren. Kleidung: Jogging-/Sporthose, T-Shirt,
            Hallenschuhe.
          </p>
          <p>
            <strong className="text-foreground">Trainingszeit:</strong> Donnerstag 18:00 –
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
