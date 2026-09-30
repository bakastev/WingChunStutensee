import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <Section pad="lg">
        <Container
          width="narrow"
          className="space-y-10 text-body text-pretty text-foreground-muted [&_h2]:font-display [&_h2]:text-h3 [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-[0.8125rem] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.14em] [&_h3]:text-foreground"
        >
          <div>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p className="mt-3">
              Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
            <h3>Datenerfassung auf dieser Website</h3>
            <p className="mt-3">
              Die Datenverarbeitung erfolgt durch den Websitebetreiber. Kontaktdaten finden
              Sie unten unter „Verantwortliche Stelle“. Daten werden erhoben, wenn Sie uns
              diese mitteilen (z. B. Kontaktformular) oder automatisch beim Besuch
              (technische Log-Daten).
            </p>
          </div>

          <div>
            <h2>2. Hosting</h2>
            <p className="mt-3">
              Diese Website wird über moderne Cloud-Infrastruktur bereitgestellt. Die
              konkrete Hosting-Umgebung kann sich ändern; Details und
              Auftragsverarbeitungsverträge werden bei Bedarf aktualisiert.
            </p>
          </div>

          <div>
            <h2>3. Verantwortliche Stelle</h2>
            <p className="mt-3">
              {site.sifu}
              <br />
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.zipCity}
              <br />
              Telefon: {site.phone.display}
              <br />
              E-Mail: {site.email}
            </p>
          </div>

          <div>
            <h2>4. Kontaktformular</h2>
            <p className="mt-3">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
              Angaben inklusive Kontaktdaten zur Bearbeitung der Anfrage gespeichert. Die
              Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich)
              bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effektiver
              Bearbeitung) oder Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            </p>
            <p className="mt-3">
              Zur Speicherung und Zustellung nutzen wir Convex (Datenbank) und Resend
              (E-Mail-Versand). Die Daten verbleiben bei uns, bis der Zweck entfällt oder
              Sie Löschung verlangen.
            </p>
          </div>

          <div>
            <h2>5. Server-Log-Dateien</h2>
            <p className="mt-3">
              Der Provider speichert automatisch technische Daten (Browsertyp, OS, Referrer,
              Hostname, Uhrzeit, IP). Grundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div>
            <h2>6. Karten (OpenStreetMap)</h2>
            <p className="mt-3">
              Eingebettete Karten können Anfragen an OpenStreetMap senden (inkl. IP-Adresse).
              Nutzen Sie den Routenplaner-Link, wenn Sie die Einbettung vermeiden möchten.
            </p>
          </div>

          <div>
            <h2>7. Ihre Rechte</h2>
            <p className="mt-3">
              Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
              Datenübertragbarkeit und Widerspruch sowie Beschwerde bei einer
              Aufsichtsbehörde. Einwilligungen können Sie jederzeit widerrufen.
            </p>
          </div>

          <div>
            <h2>8. SSL-/TLS-Verschlüsselung</h2>
            <p className="mt-3">
              Diese Seite nutzt SSL-/TLS-Verschlüsselung zum Schutz vertraulicher Inhalte.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
