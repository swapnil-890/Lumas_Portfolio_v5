// src/app/page.tsx
// Unified 5-Section Systems Dashboard Shell (§14.3, §17)
import { getRecentCommits } from '@/lib/github';
import { OverviewBento } from '@/components/overview/OverviewBento';
import { Terminal } from '@/components/Terminal';
import { CommitTicker } from '@/components/github/CommitTicker';
import { SystemsSection } from '@/components/sections/SystemsSection';
import { LabSection } from '@/components/sections/LabSection';
import { StackSection } from '@/components/sections/StackSection';
import { DispatchSection } from '@/components/sections/DispatchSection';

export const revalidate = 3600;

export default async function HomePage() {
  const commits = await getRecentCommits(5);

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* 01 // OVERVIEW & TELEMETRY */}
      <OverviewBento />

      {/* INTERACTIVE TELEMETRY TERMINAL */}
      <div className="mb-16">
        <Terminal />
      </div>

      {/* BUILD LOG / GITHUB TELEMETRY */}
      <section className="mb-16" aria-label="Recent development log">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-fg-muted">
            Telemetry // Build Log
          </h2>
          <span className="font-mono text-[11px] text-fg-muted">Recent GitHub Commits</span>
        </div>
        <CommitTicker commits={commits} />
      </section>

      {/* 02 // SYSTEMS (Primary Engineering Proof Layer) */}
      <SystemsSection />

      {/* 03 // LAB (Robotics & Physical Experimentation) */}
      <LabSection />

      {/* 04 // STACK (Classified Technical Ecosystem) */}
      <StackSection />

      {/* 05 // DISPATCH & COMMS (Communication, Interactive Query Console & Footer) */}
      <DispatchSection />
    </main>
  );
}
