# LUMAS™ — Digital Identity

A personal digital archive exploring AI, computing, science, systems, and
experimental projects. Built as a static single-page application.

## Tech Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # emits ./dist
npm run preview    # http://localhost:4173
npm run lint
```

## Architecture

```
src/
├── App.tsx                     # section registry + nav + keyboard + IO
├── config/features.ts          # feature flags (secretArchive.enabled)
├── data/                       # all personal content lives here
│   ├── personal.ts
│   ├── projects.ts
│   ├── ideas.ts
│   └── socials.ts
├── components/
│   ├── Navigation.tsx
│   ├── SectionIndicator.tsx
│   ├── SectionShell.tsx
│   ├── SpotlightCard.tsx
│   └── StatusBadge.tsx
├── sections/                   # six sections (01–06)
└── features/secretArchive/     # Section 06 prototype portal
```

### Content is data-driven

Edit `src/data/*.ts` to change content. Components consume the data. Personal
information is never hardcoded inside JSX.

### Section 06 feature flag

`src/config/features.ts`:

```ts
export const FEATURES = { secretArchive: { enabled: true } }
```

When set to `false`, Section 06 is removed and navigation automatically
recalculates to `01 / 05 … 05 / 05`.

## Deployment

The build output in `dist/` is fully static. Deploy to Netlify, Vercel,
Cloudflare Pages, or any static host.

## Section 06 — Security Warning

The private archive uses a **prototype, client-side passphrase gate**. This is
not security. Read `SECURITY.md` before adding any real private content.
