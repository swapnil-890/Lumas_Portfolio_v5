import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ideas } from '@/data/ideas';
import { personal } from '@/data/personal';

const interests = [
  {
    category: 'Cinematography',
    items: [
      'SVF Cinemas — Bengali film culture',
      'Animated series — narrative structure analysis',
      'Film editing — pacing and rhythm',
    ],
  },
  {
    category: 'Gaming',
    items: [
      'Genshin Impact — systems design analysis',
      'Tekken 8 — competitive fighting mechanics',
      'Shadow Fight 3 — mobile combat design',
      'Mortal Kombat / Injustice — franchise evolution',
    ],
  },
  {
    category: 'Other',
    items: [
      'Aviation — flight dynamics',
      'Space exploration — orbital mechanics',
      'Industrial design — form and function',
      'Technical writing — clarity and precision',
    ],
  },
];

export const metadata = {
  title: 'Off-Duty',
  description: 'Personal interests outside engineering.',
};

export default function OffDutyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-amber-500 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      <h1 className="text-3xl font-semibold text-slate-100 mb-2">Off-Duty</h1>
      <p className="text-slate-400 mb-12">
        Interests outside engineering. These inform my work but do not define
        it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {interests.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
              {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-slate-400 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Concept Exploration (Ideas) */}
      <div className="mt-16 pt-8 border-t border-slate-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
          Concept Exploration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs text-slate-500">{idea.index}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {idea.status}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-200">{idea.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Operating Principles (Dislikes) */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
          Operating Principles
        </h2>
        <ul className="space-y-3">
          {personal.dislikes.map((dislike) => (
            <li
              key={dislike}
              className="text-sm text-slate-400 leading-relaxed font-mono flex items-start gap-2"
            >
              <span className="text-slate-600 select-none">›</span>
              <span>{dislike}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-800">
        <p className="text-xs font-mono text-slate-600">
          Online alias: Lumas
        </p>
      </div>
    </main>
  );
}
