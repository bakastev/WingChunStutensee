import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pages } from "@/content/site";
import { getPublishedNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Aktuelles",
  description: pages.aktuelles.lead,
};

export default async function AktuellesPage() {
  const news = await getPublishedNews();

  return (
    <>
      <PageHeader
        eyebrow={pages.aktuelles.eyebrow}
        title={pages.aktuelles.title}
        lead={pages.aktuelles.lead}
      />
      <Section pad="lg">
        <Container className="grid gap-8 sm:grid-cols-2">
          {news.length === 0 ? (
            <p className="text-body text-foreground-muted">
              Derzeit keine Meldungen. Schau bald wieder vorbei.
            </p>
          ) : (
            news.map((item) => (
              <article key={item.slug} className="border border-border">
                {item.image ? (
                  <div className="relative aspect-[16/10] bg-surface-band">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="p-5 sm:p-6">
                  <time className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-foreground-muted">
                    {new Date(item.publishedAt).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-display text-h3">
                    <Link href={`/aktuelles/${item.slug}`} className="hover:text-accent">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-body-sm text-pretty text-foreground-muted">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/aktuelles/${item.slug}`}
                    className="mt-4 inline-flex font-sans text-[0.75rem] uppercase tracking-[0.14em] text-accent hover:text-accent-hover"
                  >
                    Zur Meldung →
                  </Link>
                </div>
              </article>
            ))
          )}
        </Container>
      </Section>
    </>
  );
}
