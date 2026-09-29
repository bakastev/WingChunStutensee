import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ContentHero } from "@/components/layout/content-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getNewsBySlug, getPublishedNews } from "@/lib/news";
import { markdownToHtml } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const news = await getPublishedNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Meldung" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const html = await markdownToHtml(item.body);

  return (
    <>
      <ContentHero
        backHref="/aktuelles"
        backLabel="Aktuelles"
        eyebrow="Meldung"
        title={item.title}
        lead={item.excerpt}
      />
      <Section pad="lg">
        <Container width="narrow">
          {item.image ? (
            <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-surface-band">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 44rem"
              />
            </div>
          ) : null}
          <time className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-foreground-muted">
            {new Date(item.publishedAt).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
          <div
            className="prose-news mt-6 space-y-4 text-body text-pretty text-foreground-muted [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </Section>
    </>
  );
}
