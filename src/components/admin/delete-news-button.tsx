"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteNewsAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/shadcn-button";

export function DeleteNewsButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Artikel löschen?")) return;
        start(async () => {
          try {
            await deleteNewsAction(id);
            toast.success("Gelöscht");
            router.refresh();
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Fehler");
          }
        });
      }}
    >
      Löschen
    </Button>
  );
}
