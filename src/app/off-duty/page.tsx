import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

      <div className="mt-16 pt-8 border-t border-slate-800">
        <p className="text-xs font-mono text-slate-600">
          Online alias: Lumas
        </p>
      </div>
    </main>
  );
}
