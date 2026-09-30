import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 font-display text-h1">Seite nicht gefunden</h1>
      <p className="mt-4 max-w-md text-body text-foreground-muted">
        Die angeforderte Seite existiert nicht. Zurück zur Startseite oder zum Kontakt.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          Startseite
        </ButtonLink>
        <Link
          href="/kontakt"
          className="inline-flex items-center px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.14em] border border-foreground"
        >
          Kontakt
        </Link>
      </div>
    </Container>
  );
}
