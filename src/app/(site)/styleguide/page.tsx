import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const yellowSwatches = [
  { name: "50", className: "bg-yellow-50" },
  { name: "100", className: "bg-yellow-100" },
  { name: "200", className: "bg-yellow-200" },
  { name: "300", className: "bg-yellow-300" },
  { name: "400", className: "bg-yellow-400" },
  { name: "500", className: "bg-yellow-500" },
  { name: "600", className: "bg-yellow-600" },
  { name: "700", className: "bg-yellow-700" },
  { name: "800", className: "bg-yellow-800" },
  { name: "900", className: "bg-yellow-900" },
];

export default function StyleguidePage() {
  return (
    <Section pad="lg">
      <Container>
        <Eyebrow tone="accent">Design System</Eyebrow>
        <h1 className="mt-3 font-display text-h1">Styleguide</h1>
        <Rule tone="accent" length="md" className="mt-5" />
        <p className="mt-4 max-w-xl text-body text-foreground-muted">
          Eigenes Dark Theme für Wing Chun Stutensee — Gelb-Akzent{" "}
          <code className="text-accent">#FACF48</code>, dunkle Flächen, heller Text.
          Radius 0, keine Schatten.
        </p>

        <h2 className="mt-12 font-display text-h2">Yellow Scale</h2>
        <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {yellowSwatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-2">
              <div className={`aspect-square border border-border ${s.className}`} />
              <span className="text-center text-caption text-foreground-subtle">{s.name}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-h2">Buttons</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <ButtonLink href="/" variant="arrow">
            Arrow
          </ButtonLink>
        </div>

        <div data-surface="light" className="mt-8 bg-accent p-8 text-accent-foreground">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" className="!bg-ink-900 !text-foreground hover:!bg-ink-800">
              Dark on yellow
            </Button>
            <Button variant="on-accent">On accent</Button>
          </div>
        </div>

        <h2 className="mt-12 font-display text-h2">Typography</h2>
        <div className="mt-6 space-y-3">
          <p className="font-display text-display">Display</p>
          <p className="font-display text-h1">Headline 1</p>
          <p className="font-display text-h2">Headline 2</p>
          <p className="text-body text-foreground-muted">
            Body — Inter für UI und Fließtext. Muted für Lesbarkeit auf Dunkel.
          </p>
          <p className="font-quote text-quote italic">Quote — Cormorant Garamond.</p>
        </div>
      </Container>
    </Section>
  );
}
