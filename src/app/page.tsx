import { getRecentCommits } from '@/lib/github';
import { IdentityHeader } from '@/components/layout/IdentityHeader';
import { CurrentFocus } from '@/components/layout/CurrentFocus';
import { Terminal } from '@/components/Terminal';
import { ProjectIndex } from '@/components/layout/ProjectIndex';
import { SkillsMatrix } from '@/components/layout/SkillsMatrix';
import { Footer } from '@/components/layout/Footer';
import { CommitTicker } from '@/components/github/CommitTicker';
import AskLumas from '@/components/AskLumas';

export const revalidate = 3600;

export default async function HomePage() {
  const commits = await getRecentCommits(5);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <IdentityHeader />

      <CurrentFocus />

      <Terminal />

      <section className="mb-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          Build Log
        </h2>
        <CommitTicker commits={commits} />
      </section>

      <ProjectIndex
        projects={[
          {
            slug: 'vovera',
            title: 'VOVERA',
            subtitle: 'Real-Time Voice Attack Detection Pipeline',
            status: 'Prototype',
            stack: ['Python', 'FastAPI', 'SQLite', 'Librosa'],
            metrics: [
              { label: 'P99 Latency', value: '142ms' },
              { label: 'Target', value: '<500ms' },
            ],
            href: '/work/vovera',
            repoUrl: 'https://github.com/swapnil-890/vovera',
          },
          {
            slug: 'core7',
            title: 'Core-7',
            subtitle: 'Mini RAG Pipeline with Guardrail Middleware',
            status: 'Active Development',
            stack: ['Python', 'FastAPI', 'ChromaDB', 'sentence-transformers'],
            metrics: [
              { label: 'Retrieval Recall', value: '89%' },
              { label: 'P99 Latency', value: '128ms' },
            ],
            href: '/work/core7',
            repoUrl: 'https://github.com/swapnil-890/core-7',
          },
          {
            slug: 'steel-raven',
            title: 'Steel Raven',
            subtitle: 'Biomimetic Drone Architecture',
            status: 'Concept Design',
            stack: ['Fusion 360', 'CFRP', '3D Printing'],
            metrics: [
              { label: 'Frame Weight', value: '68g' },
              { label: 'Thrust/Weight', value: '5.7:1' },
            ],
            href: '/work/steel-raven',
          },
        ]}
      />

      <SkillsMatrix />

      <section className="mt-16 mb-16" aria-label="Interactive Query Console">
        <AskLumas />
      </section>

      <Footer />
    </main>
  );
}
