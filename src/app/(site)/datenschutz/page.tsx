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
          className="space-y-10 text-body text-pretty text-foreground-muted [&_a]:text-foreground [&_a]:underline [&_a]:decoration-accent/50 [&_a]:underline-offset-4 hover:[&_a]:text-accent [&_h2]:font-display [&_h2]:text-h3 [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-[0.8125rem] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.14em] [&_h3]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
        >
          <div>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p className="mt-3">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
              Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
              identifiziert werden können. Ausführliche Informationen finden Sie in den
              nachfolgenden Abschnitten.
            </p>
            <h3>Datenerfassung auf dieser Website</h3>
            <p className="mt-3">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
              Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle“ dieser
              Datenschutzerklärung entnehmen.
            </p>
            <p className="mt-3">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen
              (z.&nbsp;B. über das Kontaktformular). Andere Daten werden automatisch oder
              nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme
              erfasst (technische Informationen wie Browser, Betriebssystem oder Uhrzeit
              des Seitenaufrufs).
            </p>
            <h3>Wofür nutzen wir Ihre Daten?</h3>
            <p className="mt-3">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
              Website zu gewährleisten. Andere Daten können zur Bearbeitung Ihrer Anfragen
              (z.&nbsp;B. Probetraining) verwendet werden.
            </p>
            <h3>Welche Rechte haben Sie?</h3>
            <p className="mt-3">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
              und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
              außerdem ein Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit sowie Widerspruch. Hierzu sowie zu weiteren Fragen zum
              Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht
              Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </div>

          <div>
            <h2>2. Verantwortliche Stelle</h2>
            <p className="mt-3">
              Verantwortlicher im Sinne der DSGVO und anderer datenschutzrechtlicher
              Bestimmungen ist:
            </p>
            <p className="mt-3">
              {site.legal.name}
              <br />
              {site.legal.org}
              <br />
              {site.legal.street}
              <br />
              {site.legal.zipCity}
              <br />
              {site.legal.country}
              <br />
              Telefon: {site.phone.display}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>

          <div>
            <h2>3. Hosting und Infrastruktur</h2>
            <p className="mt-3">
              Diese Website wird über Cloud-Dienste in der Europäischen Union bzw. in
              Deutschland betrieben. Mit den eingesetzten Anbietern bestehen – soweit
              erforderlich – Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO.
            </p>

            <h3>Frontend-Hosting (Vercel, Deutschland)</h3>
            <p className="mt-3">
              Das Frontend dieser Website wird über Vercel Inc. bereitgestellt. Die
              Auslieferung erfolgt über Serverstandorte in Deutschland (DE). Beim Besuch
              der Website können dabei automatisch technische Daten (u.&nbsp;a. IP-Adresse,
              Zeitstempel, User-Agent) in Server-Logs verarbeitet werden. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und
              stabilen Bereitstellung der Website).
            </p>
            <p className="mt-3">
              Anbieter: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA —
              europäische Verarbeitung über Vercel-Infrastruktur in der EU/DE. Weitere
              Informationen:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>

            <h3>Backend / Datenbank (Convex, EU)</h3>
            <p className="mt-3">
              Für dynamische Inhalte (u.&nbsp;a. Aktuelles, Galerie, redaktionelle Texte)
              sowie die Verarbeitung von Kontaktanfragen nutzen wir Convex als Backend und
              Datenbank. Die Verarbeitung erfolgt auf Convex-Servern in der Europäischen
              Union (EU). Rechtsgrundlage je nach Vorgang: Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahmen / Anfragebearbeitung), Art. 6 Abs. 1 lit. f DSGVO
              (Betrieb der Website) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
            <p className="mt-3">
              Anbieter: Convex, Inc. — Informationen zum Datenschutz:{" "}
              <a
                href="https://www.convex.dev/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                convex.dev/legal/privacy
              </a>
              .
            </p>

            <h3>E-Mail-Versand (Resend, EU)</h3>
            <p className="mt-3">
              Zur Zustellung von Nachrichten aus dem Kontaktformular nutzen wir Resend.
              Die Verarbeitung erfolgt über Resend-Infrastruktur in der Europäischen Union
              (EU). Übermittelt werden die von Ihnen eingegebenen Formulardaten sowie
              technische Metadaten der Zustellung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b
              bzw. lit. f DSGVO, ggf. Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p className="mt-3">
              Anbieter: Resend, Inc. — Informationen:{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                resend.com/legal/privacy-policy
              </a>
              .
            </p>

            <h3>Weiteres Hosting / Domain</h3>
            <p className="mt-3">
              Angaben zum endgültigen Domain-/DNS- bzw. zusätzlichen Hosting-Anbieter
              folgen und werden in dieser Datenschutzerklärung ergänzt, sobald die
              Konfiguration feststeht.
            </p>
          </div>

          <div>
            <h2>4. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p className="mt-3">
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den
              gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              Bitte beachten Sie, dass die Datenübertragung im Internet Sicherheitslücken
              aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte
              ist nicht möglich.
            </p>
            <h3>Speicherdauer</h3>
            <p className="mt-3">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer
              genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck
              für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen
              geltend machen oder eine Einwilligung widerrufen, werden Ihre Daten gelöscht,
              sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung haben
              (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen).
            </p>
            <h3>Widerruf Ihrer Einwilligung</h3>
            <p className="mt-3">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit
              widerrufen (z.&nbsp;B. über die Cookie-Einstellungen). Die Rechtmäßigkeit der
              bis zum Widerruf erfolgten Verarbeitung bleibt vom Widerruf unberührt.
            </p>
            <h3>Widerspruch gegen Datenverarbeitung (Art. 21 DSGVO)</h3>
            <p className="mt-3">
              Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f
              DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer
              besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen
              Daten Widerspruch einzulegen. Werden Ihre personenbezogenen Daten verarbeitet,
              um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch
              gegen die Verarbeitung zum Zwecke derartiger Werbung einzulegen.
            </p>
            <h3>Beschwerderecht bei der Aufsichtsbehörde</h3>
            <p className="mt-3">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
              Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem
              Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des
              Orts des mutmaßlichen Verstoßes.
            </p>
            <h3>Recht auf Datenübertragbarkeit</h3>
            <p className="mt-3">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
              Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen
              Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
            </p>
            <h3>Auskunft, Berichtigung und Löschung</h3>
            <p className="mt-3">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das
              Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
              Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und
              ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>
            <h3>Recht auf Einschränkung der Verarbeitung</h3>
            <p className="mt-3">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns
              wenden.
            </p>
            <h3>SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="mt-3">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
              Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
              „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>
          </div>

          <div>
            <h2>5. Datenerfassung auf dieser Website</h2>
            <h3>Cookies und Einwilligung</h3>
            <p className="mt-3">
              Unsere Internetseiten verwenden Cookies. Cookies sind kleine Textdateien und
              richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend
              für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente
              Cookies) auf Ihrem Endgerät gespeichert.
            </p>
            <p className="mt-3">
              Notwendige Cookies speichern wir auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO,
              soweit ohne sie der Betrieb der Website nicht möglich oder wesentlich
              erschwert wäre (u.&nbsp;a. Speicherung Ihrer Cookie-Entscheidung). Optionale
              Cookies bzw. vergleichbare Technologien setzen wir nur mit Ihrer Einwilligung
              gemäß Art. 6 Abs. 1 lit. a DSGVO i.&nbsp;V.&nbsp;m. §&nbsp;25 Abs. 1 TDDDG.
            </p>
            <p className="mt-3">Auf dieser Website unterscheiden wir insbesondere:</p>
            <ul>
              <li>
                <strong className="text-foreground">Notwendig</strong> — Betrieb,
                Sicherheit, Speicherung der Einwilligungsentscheidung
              </li>
              <li>
                <strong className="text-foreground">Funktional</strong> — Komfortfunktionen
                wie die eingebettete OpenStreetMap-Karte
              </li>
              <li>
                <strong className="text-foreground">Analyse</strong> — derzeit nicht aktiv;
                nur nach Einwilligung
              </li>
              <li>
                <strong className="text-foreground">Marketing</strong> — derzeit nicht aktiv;
                nur nach Einwilligung
              </li>
            </ul>
            <p className="mt-3">
              Ihre Einwilligung können Sie jederzeit über den Link „Cookie-Einstellungen“
              im Footer der Website ändern oder widerrufen.
            </p>

            <h3>Server-Log-Dateien</h3>
            <p className="mt-3">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in
              sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt.
              Dies sind insbesondere:
            </p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-3">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
              vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
              DSGVO.
            </p>

            <h3>Kontaktformular</h3>
            <p className="mt-3">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
              aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
              zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-3">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
              Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
              Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen
              Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der
              effektiven Bearbeitung der Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
              Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde.
            </p>
            <p className="mt-3">
              Zur technischen Abwicklung nutzen wir Convex (Speicherung in der EU) und Resend
              (E-Mail-Versand in der EU), siehe Abschnitt „Hosting und Infrastruktur“. Die
              von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
              zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der
              Zweck für die Datenspeicherung entfällt.
            </p>

            <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
            <p className="mt-3">
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage
              inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der
              Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div>
            <h2>6. Eingebettete Karten (OpenStreetMap)</h2>
            <p className="mt-3">
              Auf dieser Website kann eine Karte von OpenStreetMap eingebunden sein. Anbieter
              ist die OpenStreetMap Foundation. Beim Laden der eingebetteten Karte kann eine
              Verbindung zu Servern von OpenStreetMap aufgebaut werden; dabei können
              insbesondere Ihre IP-Adresse und weitere technische Daten übermittelt werden.
            </p>
            <p className="mt-3">
              Die eingebettete Karte wird nur geladen, wenn Sie der Kategorie „Funktional“
              zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO i.&nbsp;V.&nbsp;m. §&nbsp;25 Abs. 1
              TDDDG). Ohne Einwilligung zeigen wir einen Hinweis und verlinken auf eine
              externe Kartenansicht bzw. Routenplanung.
            </p>
            <p className="mt-3">
              Weitere Informationen:{" "}
              <a
                href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                wiki.osmfoundation.org/wiki/Privacy_Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2>7. Soziale Netzwerke</h2>
            <p className="mt-3">
              Auf dieser Website verlinken wir auf unser Auftritt bei Facebook. Beim bloßen
              Aufruf unserer Website werden keine Social-Media-Plugins geladen. Erst wenn Sie
              den Link aktiv anklicken, werden Sie zur jeweiligen Plattform weitergeleitet;
              dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
            <p className="mt-3">
              Facebook/Meta:{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                facebook.com/privacy/policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2>8. Admin-Bereich</h2>
            <p className="mt-3">
              Für die redaktionelle Verwaltung der Website existiert ein geschützter
              Admin-Bereich. Der Zugang ist auf autorisierte Personen beschränkt und erfolgt
              über eine Authentifizierung (Sitzungs-Cookie). Die Verarbeitung dient dem
              Betrieb und der Pflege der Website (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>

          <div>
            <h2>9. Aktualität dieser Datenschutzerklärung</h2>
            <p className="mt-3">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets
              den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
              Leistungen in der Datenschutzerklärung umzusetzen (z.&nbsp;B. bei Einführung
              neuer Dienste oder finaler Hosting-Angaben). Für Ihren erneuten Besuch gilt
              dann die neue Datenschutzerklärung.
            </p>
            <p className="mt-3">Stand: September 2026</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
