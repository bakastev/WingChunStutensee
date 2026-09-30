"use client";

import * as React from "react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { Check, ExternalLink, Loader2 } from "lucide-react";
import { saveContentEntryAction } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/image-field";
import { Input, Label, Textarea } from "@/components/admin/ui";
import { Button } from "@/components/ui/shadcn-button";
import { cn } from "@/lib/cn";
import {
  PAGE_CATALOG,
  catalogForGroup,
  fieldHint,
  fieldRole,
  humanFieldLabel,
} from "@/lib/admin/page-catalog";

export type ContentEntryRow = {
  _id: string;
  key: string;
  group: string;
  label: string;
  format: "plain" | "html" | "markdown";
  value: string;
};

function sortEntries(a: ContentEntryRow, b: ContentEntryRow) {
  const order = [
    "eyebrow",
    "title",
    "lead",
    "slogan",
    "tagline",
    "description",
    "hero.eyebrow",
    "hero.headline",
    "hero.accentLineIndex",
    "hero.body",
    "hero.image",
    "hero.imageAlt",
    "hero.primaryCtaLabel",
    "hero.primaryCtaHref",
    "hero.secondaryCtaLabel",
    "hero.secondaryCtaHref",
  ];
  const tailA = a.key.includes(".") ? a.key.slice(a.key.indexOf(".") + 1) : a.key;
  const tailB = b.key.includes(".") ? b.key.slice(b.key.indexOf(".") + 1) : b.key;
  const ia = order.indexOf(tailA);
  const ib = order.indexOf(tailB);
  if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  return a.label.localeCompare(b.label);
}

export function ContentStudio({ entries }: { entries: ContentEntryRow[] }) {
  const groupsInData = [...new Set(entries.map((e) => e.group))];
  const pages = PAGE_CATALOG.filter((p) => groupsInData.includes(p.id)).concat(
    groupsInData
      .filter((g) => !PAGE_CATALOG.some((p) => p.id === g))
      .map((g) => catalogForGroup(g)),
  );

  const [activeId, setActiveId] = React.useState(pages[0]?.id ?? "");
  const active = pages.find((p) => p.id === activeId) ?? pages[0];
  const pageEntries = entries
    .filter((e) => e.group === active?.id)
    .slice()
    .sort(sortEntries);

  if (!active) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
        Keine Texte vorhanden.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="grid md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-zinc-100 bg-zinc-50/80 md:border-b-0 md:border-r">
          <div className="border-b border-zinc-100 px-4 py-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Seiten
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-700">
              {pages.length} Bereiche
            </p>
          </div>
          <nav className="flex max-h-48 gap-1 overflow-x-auto p-2 md:max-h-[min(70vh,40rem)] md:flex-col md:overflow-y-auto">
            {pages.map((page) => {
              const count = entries.filter((e) => e.group === page.id).length;
              const selected = page.id === active.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setActiveId(page.id)}
                  className={cn(
                    "flex min-w-[9.5rem] shrink-0 flex-col rounded-xl px-3 py-2.5 text-left transition-colors md:min-w-0",
                    selected
                      ? "bg-[#111113] text-white"
                      : "text-zinc-600 hover:bg-white hover:text-zinc-950",
                  )}
                >
                  <span className="text-sm font-semibold tracking-tight">
                    {page.label}
                  </span>
                  <span className="mt-0.5 text-[0.7rem] text-zinc-400">
                    {count} Felder
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <PageEditor key={active.id} page={active} entries={pageEntries} />
      </div>
    </div>
  );
}

function PageEditor({
  page,
  entries,
}: {
  page: ReturnType<typeof catalogForGroup>;
  entries: ContentEntryRow[];
}) {
  const [pending, start] = useTransition();
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(entries.map((e) => [e.key, e.value])),
  );
  const [savedSnapshot, setSavedSnapshot] = React.useState(values);

  React.useEffect(() => {
    const next = Object.fromEntries(entries.map((e) => [e.key, e.value]));
    setValues(next);
    setSavedSnapshot(next);
  }, [entries]);

  const dirtyKeys = entries
    .map((e) => e.key)
    .filter((key) => (values[key] ?? "") !== (savedSnapshot[key] ?? ""));
  const dirty = dirtyKeys.length > 0;

  const headerFields = entries.filter((e) => {
    if (e.key.includes(".hero.") || e.key.includes("hero.")) return false;
    return ["eyebrow", "title", "lead"].includes(fieldRole(e.key));
  });
  const heroFields = entries.filter(
    (e) => e.key.includes(".hero.") || e.key.includes("hero."),
  );
  const otherFields = entries.filter(
    (e) => !headerFields.includes(e) && !heroFields.includes(e),
  );

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function saveAll() {
    start(async () => {
      try {
        const changed = entries.filter(
          (e) => (values[e.key] ?? "") !== (savedSnapshot[e.key] ?? ""),
        );
        if (changed.length === 0) {
          toast.message("Keine Änderungen");
          return;
        }
        for (const entry of changed) {
          await saveContentEntryAction({
            key: entry.key,
            group: entry.group,
            label: entry.label,
            format: entry.format,
            value: values[entry.key] ?? "",
          });
        }
        setSavedSnapshot({ ...values });
        toast.success(
          changed.length === 1
            ? "Feld gespeichert"
            : `${changed.length} Felder gespeichert`,
        );
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Speichern fehlgeschlagen");
      }
    });
  }

  return (
    <div className="flex min-h-[32rem] flex-col">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 bg-white/95 px-5 py-4 backdrop-blur-md sm:px-7">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-600">
            Seite bearbeiten
          </p>
          <h2 className="mt-1 truncate text-xl font-semibold tracking-tight text-zinc-950">
            {page.label}
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500">{page.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {page.sitePath ? (
            <Button asChild variant="outline" size="sm">
              <Link href={page.sitePath} target="_blank">
                Vorschau
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            </Button>
          ) : null}
          <Button
            type="button"
            variant="accent"
            size="sm"
            disabled={pending || !dirty}
            onClick={saveAll}
            className="min-w-[8.5rem]"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Speichert…
              </>
            ) : dirty ? (
              `Speichern (${dirtyKeys.length})`
            ) : (
              <>
                <Check className="h-4 w-4" />
                Gespeichert
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
        {headerFields.length > 0 ? (
          <Section
            title="Seitenkopf"
            subtitle="Eyebrow, Titel und Einleitung — erscheinen oben auf der Seite."
          >
            <div className="grid gap-5">
              {headerFields.map((entry) => (
                <FieldControl
                  key={entry.key}
                  entry={entry}
                  value={values[entry.key] ?? ""}
                  dirty={dirtyKeys.includes(entry.key)}
                  onChange={(v) => setValue(entry.key, v)}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {heroFields.length > 0 ? (
          <Section
            title="Hero"
            subtitle="Erstes Viewport der Startseite — Bild, Headline und CTAs."
          >
            <div className="grid gap-5">
              {heroFields.map((entry) => (
                <FieldControl
                  key={entry.key}
                  entry={entry}
                  value={values[entry.key] ?? ""}
                  dirty={dirtyKeys.includes(entry.key)}
                  onChange={(v) => setValue(entry.key, v)}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {otherFields.length > 0 ? (
          <Section
            title={headerFields.length || heroFields.length ? "Weitere Felder" : "Inhalte"}
            subtitle="Zusätzliche Texte und Einstellungen für diese Seite."
          >
            <div className="grid gap-5">
              {otherFields.map((entry) => (
                <FieldControl
                  key={entry.key}
                  entry={entry}
                  value={values[entry.key] ?? ""}
                  dirty={dirtyKeys.includes(entry.key)}
                  onChange={(v) => setValue(entry.key, v)}
                />
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-150 border-zinc-200 bg-zinc-50/40 p-5 sm:p-6">
      <div className="mb-5 border-b border-zinc-200/80 pb-4">
        <h3 className="text-base font-semibold tracking-tight text-zinc-950">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function FieldControl({
  entry,
  value,
  dirty,
  onChange,
}: {
  entry: ContentEntryRow;
  value: string;
  dirty: boolean;
  onChange: (value: string) => void;
}) {
  const role = fieldRole(entry.key);
  const label = humanFieldLabel(entry.key, entry.label);
  const hint = fieldHint(entry.key);
  const isImage = role === "image";
  const isShort =
    role === "eyebrow" ||
    role === "title" ||
    role === "cta" ||
    role === "meta" ||
    role === "imageAlt" ||
    (value.length > 0 && value.length < 80 && !value.includes("\n"));

  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-4 transition-colors sm:p-5",
        dirty ? "border-amber-300 ring-1 ring-amber-200/60" : "border-zinc-200",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        {isImage ? null : (
          <div>
            <Label htmlFor={entry.key} className="text-[0.925rem] text-zinc-900">
              {label}
            </Label>
            {hint ? (
              <p className="mt-1 max-w-2xl text-[0.8rem] leading-relaxed text-zinc-500">
                {hint}
              </p>
            ) : null}
          </div>
        )}
        {dirty ? (
          <span className="ml-auto shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-700">
            Geändert
          </span>
        ) : null}
      </div>

      {isImage ? (
        <ImageField
          label={label}
          hint={hint ?? undefined}
          value={value}
          onChange={onChange}
        />
      ) : isShort && role !== "body" && role !== "lead" && role !== "headline" ? (
        <Input
          id={entry.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Textarea
          id={entry.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={
            role === "headline"
              ? Math.max(3, value.split("\n").length + 1)
              : role === "lead" || role === "body"
                ? 4
                : Math.min(8, Math.max(3, Math.ceil(value.length / 70)))
          }
          className="leading-relaxed"
        />
      )}
    </div>
  );
}
