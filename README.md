# LUMAS™ — Digital Identity

A personal digital archive exploring AI, computing, science, systems, and
experimental projects. Built as a static single-page application.

## Tech Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS
- Framer Motion (used sparingly)

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

## Version 2.0 — Design Pivot & Architecture Upgrade

LUMAS™ v2.0 elevates the visual identity to a cinematic, technical personal digital archive:
- **Layered Charcoal Palette**: Refined dark theme (`#090A0F` base, `#0F1018` surface, `#12131A` elevated, `#181A22` overlay) with scientific-blue accent (`#4C8DFF`).
- **Geist Typography**: Modern typographical foundation utilizing Geist Sans and Geist Mono via `@fontsource`.
- **Bento Info Grid**: Section 01 redesigned as a responsive bento grid with live IST telemetry readout, SYSTEM ONLINE status indicator, vital specs, and Wikipedia-linked interests.
- **Instagram-Style Profile Disc**: Section 02 profile disc featuring a 22s rotating conic-gradient ring, dual-portrait dot switcher, and zero-scale hover response.
- **Command Palette (`Cmd/Ctrl + K`)**: Accessible, keyboard-first modal enabling instant search and navigation across sections, projects, ideas, and Wikipedia topics with isolated navigation guards.
- **5-Slot Archive Reorganization**: Normalized 5-slot structure (`1st One`, `2nd One`, `3rd One`, `4th One`, `Childhood Crush`) with hardened neutral passphrase gate (`placeholder="Enter passphrase"`).

## Section 06 — Security Warning

The private archive uses a **prototype, client-side passphrase gate**. This is
not security. Read `SECURITY.md` before adding any real private content.
