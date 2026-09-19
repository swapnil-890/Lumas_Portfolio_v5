# LUMAS™ — Digital Identity

A personal portfolio exploring AI, computing, science, systems, and
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
├── data/                       # all personal content lives here
│   ├── personal.ts
│   ├── projects.ts
│   ├── ideas.ts
│   └── socials.ts
├── components/
│   ├── CommandPalette.tsx
│   ├── Icons.tsx
│   ├── Lightbox.tsx
│   ├── Navigation.tsx
│   ├── Panel.tsx
│   ├── SectionIndicator.tsx
│   ├── SectionShell.tsx
│   └── StatusBadge.tsx
└── sections/                   # five sections (01–05)
    ├── SectionInfo.tsx
    ├── SectionPFP.tsx
    ├── SectionWhoAmI.tsx
    ├── SectionIntroduction.tsx
    └── SectionDigitalWorld.tsx
```

### Content is data-driven

Edit `src/data/*.ts` to change content. Components consume the data. Personal
information is never hardcoded inside JSX.

## Deployment

The build output in `dist/` is fully static. Deploy to Netlify, Vercel,
Cloudflare Pages, or any static host.

## Version 2.0 — Design Pivot & Architecture Upgrade

LUMAS™ v2.0 elevates the visual identity to a cinematic, technical personal portfolio:
- **Layered Charcoal Palette**: Refined dark theme (`#090A0F` base, `#0F1018` surface, `#12131A` elevated, `#181A22` overlay) with scientific-blue accent (`#4C8DFF`).
- **Geist Typography**: Modern typographical foundation utilizing Geist Sans and Geist Mono via `@fontsource`.
- **Bento Info Grid**: Section 01 redesigned as a responsive bento grid with live IST telemetry readout, SYSTEM ONLINE status indicator, profile details, and Wikipedia-linked interests.
- **3D Profile Data Coin**: Section 02 profile disc featuring a 22s rotating conic-gradient ring, dual-portrait 3D flip card, and dedicated expand trigger.
- **Command Palette (`Cmd/Ctrl + K`)**: Accessible, keyboard-first modal enabling instant search and navigation across sections, projects, ideas, and Wikipedia topics with isolated navigation guards.
