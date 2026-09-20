# LUMAS™ — Personal Systems Engineering Environment

> "EXPLORING AI/ML, ROBOTICS, AND PHYSICAL COMPUTING AT FIRST PRINCIPLES."

Official portfolio and systems dashboard for **Swapnil Roy (LUMAS)**. Built with Next.js 14 App Router, React 18, and Tailwind CSS. Emphasizes empirical depth, systems provenance, and zero fabricated claims.

---

## 1. Technical Architecture

- **Framework:** Next.js 14.2.15 (App Router, Static Site Generation / Prerendering)
- **UI & Runtime:** React 18.3.1, TypeScript 5.6, Tailwind CSS 3.4.13
- **Typography & Background:** Local zero-runtime Google Font loaders (`Inter` + `JetBrains Mono` via `next/font/google`), static CSS dot-grid texture (`body::before`) replacing legacy canvas animation.
- **Accessibility:** Skip-to-content landmark, semantic native `<dialog>` overlays, `<details>` disclosures, full keyboard navigation, WCAG AA contrast ($\ge 5.5:1$), and `prefers-reduced-motion` compliance.
- **Telemetry:** Real-time IST clock island (`Asia/Kolkata`) with automatic background tab throttling and live GitHub commit telemetry via Octokit.

---

## 2. Systems Dashboard Architecture

The primary landing page (`/`) is structured into five cohesive engineering vectors:

1. **`01 // OVERVIEW`** — High-level identity, core inquiry vectors, authentic first-principles engineering philosophy, and high-precision IST clock island.
2. **`02 // SYSTEMS`** — Primary software engineering proof layer housing experimental systems with interactive zero-JS architecture pipeline disclosures.
3. **`03 // LAB`** — Physical computing, robotics, and hardware airframe prototyping bench.
4. **`04 // STACK`** — Classified technical ecosystem with bi-directional relational graph mapping tools directly to parent systems (`USED IN: SYS-01, SYS-02`).
5. **`05 // DISPATCH`** — Portfolio communication console, verified contact endpoints with 1.5s accessible copy micro-toasts, and the interactive Ask Lumas query engine.

---

## 3. Engineering Work & Case Studies

All projects are strictly source-backed and preserve accurate development states:

### Software Systems (Experimental · Private)
- **VOVERA™ (`SYS-01`)** — Real-Time Voice Attack Detection Pipeline
  - *Domain:* AI Security, Audio DSP, Voice Synthesis Analysis, Scam Mitigation.
  - *Pipeline:* Audio Ingestion → Librosa DSP Spectral Feature Extraction → Synthetic Artifact Classifier → Deterministic Risk Scoring → Tamper-Evident SQLite Audit Ledger.
  - *State:* `EXPERIMENTAL · PRIVATE` (Private repository; inspect technical methodology via [`/work/vovera`](/work/vovera)).
- **Core-7 (`SYS-02`)** — Mini RAG Pipeline with Guardrail Middleware
  - *Domain:* Retrieval-Augmented Generation, Vector Databases, AI Guardrails.
  - *Pipeline:* Tokenization & Chunking → Dense Vector Embedding → ChromaDB Proximity Indexing → Guardrail Policy Verification → Context Assembly.
  - *State:* `EXPERIMENTAL · PRIVATE` (Private repository; inspect technical methodology via [`/work/core7`](/work/core7)).

### Hardware & Robotics Lab (Prototype · Private)
- **Steel Raven (`LAB-01`)** — Biomimetic Autonomous UAV Airframe
  - *Domain:* Physical Computing, Robotics Kinematics, Aerodynamics.
  - *Bench Focus:* Wing articulation mechanical linkage kinematics, carbon-fiber reinforced polymer (CFRP) structural rigidity testing, and onboard sensor telemetry.
  - *State:* `PROTOTYPE · PRIVATE` (Strictly zero fabricated numeric specs; case study via [`/work/steel-raven`](/work/steel-raven)).

### Personal Exploration & Disciplines
- **Off-Duty Profile ([`/off-duty`](/off-duty))** — Personal concepts, cinematography analysis, operating principles, and gaming disciplines (Genshin Impact strictly categorized as Action RPG).

---

## 4. Interactive Core

- **Ask Lumas Local Query Engine (`src/lib/ask/`):**
  - A deterministic, 100% offline profile query engine operating strictly on verified repository datasets.
  - **Zero LLM hallucination and zero network fetch.**
  - Resolves queries across structured intents: `HELP`, `ABOUT`, `SYSTEMS`, `VOVERA`, `CORE-7`, `LAB`, `STEEL RAVEN`, `STACK`, `GAMES`, `CONTACT`, `NAVIGATION`, and `STATUS`.
  - Provides a graceful fallback for unindexed inquiries.
- **Native Command Palette (`src/components/command-palette/`):**
  - Zero-dependency modal combobox built using the native HTML5 `<dialog>` API with `showModal()`.
  - Accessible shortcut trigger: <kbd>Ctrl</kbd>+<kbd>K</kbd> (Windows/Linux) or <kbd>⌘</kbd>+<kbd>K</kbd> (macOS).
  - Native focus trapping, focus restoration on close, ARIA combobox pattern, and keyboard navigation (<kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>↵ Enter</kbd>, <kbd>Esc</kbd>).

---

## 5. Local Development & Verification

### Prerequisites
- Node.js 18+ (tested on Node 22)
- npm 10+

### Setup
```bash
# Clone and enter workspace
git clone https://github.com/swapnil-890/Lumas_Portfolio_v5.git
cd Lumas_Portfolio_v5

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### Static Analysis & Verification Gates
```bash
# Run ESLint validation (0 errors, 0 warnings)
npm run lint

# Run strict TypeScript compiler verification (0 errors)
npx tsc --noEmit

# Compile production build (Static HTML export)
npm run build

# Start local production server
npm run start -- -p 3000
```

---

## 6. Authoritative Contacts

- **Legal Name:** Swapnil Roy
- **Direct Email:** `swapnilroymldt@gmail.com`
- **Academic Email:** `cseai2026015@rcciit.edu.in`
- **WhatsApp:** `+91 9242233053`
- **GitHub:** [https://github.com/swapnil-890](https://github.com/swapnil-890)
- *(LinkedIn is omitted until verified URL is configured)*

---

## License
Source code and architecture open for reference. Project content, trademarks, and case study documentation © 2026 Swapnil Roy. All rights reserved.
