import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pages, schedule } from "@/content/site";

export const metadata: Metadata = {
  title: "Trainingszeiten",
  description: pages.trainingszeiten.lead,
};

export default function TrainingszeitenPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.trainingszeiten.eyebrow}
        title={pages.trainingszeiten.title}
        lead={pages.trainingszeiten.lead}
      />
      <Section pad="lg">
        <Container className="grid gap-10 md:grid-cols-3">
          <div className="border-t-2 border-accent pt-5">
            <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em]">
              Erwachsenen-Training
            </h2>
            <ul className="mt-5 space-y-4">
              {schedule.adults.map((row) => (
                <li key={row.title}>
                  <p className="font-display text-h4">{row.title}</p>
                  <p className="text-body-sm text-foreground-muted">
                    {row.days}
                    <br />
                    {row.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-accent pt-5">
            <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em]">
              Kinder
            </h2>
            <ul className="mt-5 space-y-4">
              {schedule.kids.map((row) => (
                <li key={row.title}>
                  <p className="font-display text-h4">{row.title}</p>
                  <p className="text-body-sm text-foreground-muted">
                    {row.days}
                    <br />
                    {row.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-accent pt-5">
            <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em]">
              {schedule.private.title}
            </h2>
            <p className="mt-5 text-body-sm text-foreground-muted">
              {schedule.private.note}
            </p>
          </div>
        </Container>
        <Container className="mt-12">
          <ButtonLink href="/kontakt#probetraining" variant="primary">
            Probetraining vereinbaren
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
