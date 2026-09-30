import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";
import { getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy("kontakt");
  return {
    title: "Kontakt",
    description: copy.lead,
  };
}

export default async function KontaktPage() {
  const copy = await getPageCopy("kontakt");

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
      />
      <Section pad="lg">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="space-y-8 lg:col-span-5">
            <figure className="relative aspect-[4/3] overflow-hidden bg-surface-band">
              <Image
                src="/images/people/igor-kontakt.jpg"
                alt="Sifu Igor Peic"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </figure>

            <div className="space-y-4 text-body-sm text-foreground-muted">
              <p className="font-display text-h4 text-foreground">{site.name}</p>
              <p>
                {site.address.street}
                <br />
                {site.address.zipCity}
              </p>
              <div>
                <p className="font-display text-[1.125rem] text-foreground">
                  {site.sifu}
                </p>
                <p className="mt-2">
                  <a href={`tel:${site.phone.tel}`} className="hover:text-yellow-500">
                    {site.phone.display}
                  </a>
                  <br />
                  <a
                    href={`tel:${site.phoneAlt.tel}`}
                    className="hover:text-yellow-500"
                  >
                    {site.phoneAlt.display}
                  </a>
                  <br />
                  <a href={`mailto:${site.email}`} className="hover:text-yellow-500">
                    {site.email}
                  </a>
                </p>
              </div>
              <p>
                Bring bequeme Sportkleidung (T-Shirt, Jogginghose, Sportschuhe) und
                etwas zu trinken mit. Freunde und Partner sind willkommen.
              </p>
            </div>
          </aside>

          <div id="probetraining" className="scroll-mt-8 lg:col-span-7">
            <p className="mb-6 text-body text-foreground-muted">
              Noch Fragen? Schreib uns über das Formular — oder ruf kurz an.
            </p>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
