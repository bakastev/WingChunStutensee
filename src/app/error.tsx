"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-h2">Etwas ist schiefgelaufen</h1>
      <p className="mt-4 text-body text-foreground-muted">
        Bitte versuche es erneut oder kontaktiere uns direkt.
      </p>
      <Button type="button" variant="primary" className="mt-8" onClick={reset}>
        Erneut versuchen
      </Button>
    </Container>
  );
}
