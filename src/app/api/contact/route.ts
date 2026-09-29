import { NextResponse } from "next/server";
import { z } from "zod";
import {
  assertResendReady,
  sendContactEmails,
} from "@/lib/email/templates";
import { SITE_EMAIL } from "@/lib/email/config";

export const runtime = "nodejs";

const topicSchema = z.enum([
  "probetraining",
  "training",
  "kinder",
  "sonstiges",
]);

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  topic: topicSchema,
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  website: z.string().optional().default(""),
});

export const TOPIC_LABELS: Record<z.infer<typeof topicSchema>, string> = {
  probetraining: "Probetraining vereinbaren",
  training: "Frage zum Training",
  kinder: "Kinder / Teens",
  sonstiges: "Etwas anderes",
};

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Bitte alle Felder korrekt ausfüllen." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const topicLabel = TOPIC_LABELS[parsed.data.topic];

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (convexUrl) {
    try {
      const { ConvexHttpClient } = await import("convex/browser");
      const { api } = await import("../../../../convex/_generated/api");
      const convex = new ConvexHttpClient(convexUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await convex.mutation(api.contacts.submit as any, {
        name: parsed.data.name,
        email: parsed.data.email,
        topic: parsed.data.topic,
        message: parsed.data.message,
        consent: parsed.data.consent,
      });
    } catch (err) {
      console.error("Convex contact save failed", err);
    }
  }

  const resendError = assertResendReady();
  if (resendError) {
    if (process.env.NODE_ENV === "development" || !process.env.RESEND_API_KEY) {
      console.warn(resendError, "— Kontakt ohne Mail (Resend nicht konfiguriert).");
      return NextResponse.json({ ok: true, email: "skipped" });
    }
    return NextResponse.json(
      { ok: false, error: "E-Mail-Versand ist derzeit nicht verfügbar." },
      { status: 503 },
    );
  }

  try {
    await sendContactEmails({
      name: parsed.data.name,
      email: parsed.data.email,
      topic: parsed.data.topic,
      topicLabel,
      message: parsed.data.message,
    });
  } catch (err) {
    console.error("Resend failed", err);
    return NextResponse.json(
      {
        ok: false,
        error: `Versand fehlgeschlagen. Schreib uns an ${SITE_EMAIL}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
