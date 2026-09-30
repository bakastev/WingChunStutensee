import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy("kinder");
  return {
    title: "Kinder",
    description: copy.lead,
  };
}

const offers = [
  {
    href: "/kinder/wing-chun",
    title: "Black Dragon Team",
    body: "Wing Chun für Kids und Teens — Fitness, Motorik, Selbstverteidigung und Respekt.",
    image: "/images/kinder/dragon.jpg",
  },
  {
    href: "/kinder/workout",
    title: "Kinder-Workout",
    body: "Sensomotorik, Beweglichkeit und Fitness — nur mit dem eigenen Körper, mit Spaß.",
    image: "/images/galerie/Foto-27.07.24-14-38-37-3-1536x835-164bdf93-924f645a.jpg",
  },
] as const;

export default async function KinderPage() {
  const copy = await getPageCopy("kinder");

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
      />
      <Section pad="lg">
        <Container className="grid gap-6 sm:grid-cols-2">
          {offers.map((offer) => (
            <Link
              key={offer.href}
              href={offer.href}
              className="group border border-border transition-colors hover:border-yellow-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-band">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-h3">{offer.title}</h2>
                <p className="mt-3 text-body-sm text-pretty text-foreground-muted">
                  {offer.body}
                </p>
                <span className="mt-6 inline-flex font-sans text-[0.75rem] uppercase tracking-[0.14em] text-yellow-500">
                  Mehr erfahren →
                </span>
              </div>
            </Link>
          ))}
        </Container>
      </Section>
    </>
  );
}
