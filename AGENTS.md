# Wing Chun Stutensee — Agent Notes

- Design: eigenes **Dark Theme** + Gelb `#FACF48` (nicht Light-Baka-Look)
- Content: nur Stutensee-Akademie-Copy / Live-Site — keine Baka-Journal-/Persönlich-Inhalte
- Backend: Convex (`convex/`) + Resend (`src/lib/email/`, `/api/contact`)
- Ohne `NEXT_PUBLIC_CONVEX_URL`: Aktuelles = FALLBACK_NEWS; Kontakt funktioniert trotzdem
- Nach Convex-Login: `npx convex dev` dann `pnpm tsx --env-file=.env.local scripts/seed-news.ts`
- Alte Weblication-Pfade: Redirects in `next.config.ts`

## Learned User Preferences

- Hero und zentrale Portraits (z. B. Igor) müssen klar sichtbar und lesbar sein; Kontrast vor dekorativem Overlay.
- Live-Site-Assets vollständig übernehmen (inkl. Kontakt u. a.), keine Teilmenge.
- Galerie-Einträge mit Text, Event-Beschreibung und Sortierung der Live-Site liefern, nicht nur Bilder.

## Learned Workspace Facts

- Inhaltliche und mediale Quelle ist wingchun-stutensee.de; WingChunBaka höchstens strukturell, nie als Content-/Asset-Quelle.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
