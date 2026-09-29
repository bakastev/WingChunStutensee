# Wing Chun Stutensee

Next.js 16 Rebuild der Akademie-Website [wingchun-stutensee.de](https://wingchun-stutensee.de/).

## Stack

- Next.js 16 (App Router) · React 19 · Tailwind CSS v4
- Eigenes **Dark Theme** mit Gelb-Akzent **`#FACF48`** (Layout-Sprache an Baka angelehnt, Look eigen)
- Content aus der Live-Akademie-Site — MDX/TS · Convex · Resend

## Setup

```bash
pnpm install
cp .env.local.example .env.local
# Convex (optional für lokalen Fallback ohne DB):
npx convex dev
pnpm dev
```

## Scripts

- `pnpm dev` — Next + Convex parallel
- `pnpm build` — Production Build
- `pnpm email:test` — Resend-Test (wenn Key gesetzt)
