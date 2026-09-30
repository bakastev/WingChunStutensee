import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { partnerAcademies } from "@/content/site";
import { getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy("akademien");
  return {
    title: "Partner-Akademien",
    description: copy.lead,
  };
}

export default async function AkademienPage() {
  const copy = await getPageCopy("akademien");

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
      />
      <Section pad="lg">
        <Container width="narrow" className="mb-12 space-y-4 text-body text-pretty text-foreground-muted">
          <p>
            Wenn Du nicht in Stutensee trainieren kannst, findest Du hier Partner-Akademien
            mit kompetenten Lehrern, die seit vielen Jahren Wing Chun unterrichten.
          </p>
          <p>
            Du möchtest Partnerakademie werden? Schreib uns — Erstgespräch und Einführung
            sind kostenfrei.
          </p>
        </Container>
        <Container className="grid gap-8 sm:grid-cols-2">
          {partnerAcademies.map((academy) => (
            <article key={academy.slug} className="border border-border">
              <div className="relative aspect-[16/10] bg-surface-band">
                <Image
                  src={academy.image}
                  alt={academy.leaders}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-foreground-muted">
                  {academy.leaders}
                </p>
                <h2 className="mt-2 font-display text-h4">{academy.name}</h2>
                {academy.href !== "#" ? (
                  <a
                    href={academy.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex font-sans text-[0.75rem] uppercase tracking-[0.14em] text-accent hover:text-accent-hover"
                  >
                    Webseite →
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
