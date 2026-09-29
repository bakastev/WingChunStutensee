import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pages } from "@/content/site";

export const metadata: Metadata = {
  title: "Wing Chun",
  description: pages.wingChun.lead,
};

export default function WingChunPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.wingChun.eyebrow}
        title={pages.wingChun.title}
        lead={pages.wingChun.lead}
      />
      <Section pad="lg">
        <Container width="content" className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="prose-site space-y-5 text-body text-pretty text-foreground-muted">
            <p>
              Wing Chun bedeutet übersetzt „ewiger Frühling“ und deutet auf die kulturelle
              und wirtschaftliche Blütezeit Chinas hin (die Ming-Dynastie).
            </p>
            <p>
              Das System, das in der Akademie für Wing Chun Stutensee sowie in
              Partner-Akademien unterrichtet wird, wurde auf den ursprünglichen Zweck
              zurückgeführt: in einer Notwehrsituation zu bestehen.
            </p>
            <p>
              Es geht nicht um sportliche Wettkämpfe oder akrobatische Kunststücke. Ziel
              ist es, den Gegenüber von seinem Vorhaben abzubringen und innerhalb weniger
              Sekunden außer Gefecht zu setzen — mit allen zur Verfügung stehenden Mitteln.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <ButtonLink href="/graduierung" variant="outline">
                Graduierungssystem
              </ButtonLink>
              <ButtonLink href="/kontakt#probetraining" variant="primary">
                Probetraining
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-band">
            <Image
              src="/images/hero/wingchun.jpg"
              alt="Wing Chun Training"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
