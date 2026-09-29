"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const topics = [
  { value: "probetraining", label: "Probetraining vereinbaren" },
  { value: "training", label: "Frage zum Training" },
  { value: "kinder", label: "Kinder / Teens" },
  { value: "sonstiges", label: "Etwas anderes" },
] as const;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      topic: String(data.get("topic") ?? "probetraining"),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Versand fehlgeschlagen.");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Netzwerkfehler. Bitte später erneut versuchen.");
    }
  }

  return (
    <form className="relative flex flex-col gap-6" onSubmit={onSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Dein Name"
            required
            disabled={status === "sending"}
          />
        </Field>
        <Field label="E-Mail" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="du@beispiel.de"
            required
            disabled={status === "sending"}
          />
        </Field>
      </div>

      <Field label="Thema" htmlFor="topic">
        <Select
          id="topic"
          name="topic"
          defaultValue={topics[0].value}
          disabled={status === "sending"}
        >
          {topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Mitteilung" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          placeholder="Wann möchtest Du zum Probetraining kommen?"
          required
          disabled={status === "sending"}
        />
      </Field>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Checkbox
        id="consent"
        name="consent"
        label="Ich habe die Datenschutzerklärung gelesen und akzeptiere sie."
        required
        disabled={status === "sending"}
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Wird gesendet…" : "Abschicken"}
        </Button>
        {status === "success" ? (
          <p className="text-body-sm text-foreground-muted" role="status">
            Gesendet. Du erhältst eine kurze Bestätigung per E-Mail.
          </p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-body-sm text-accent-soft" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
