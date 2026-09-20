import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { labEntries } from '@/data/lab';
import { Card, CardTitle } from '@/components/ui/Card';

export function LabSection() {
  return (
    <section id="lab" className="scroll-mt-24 mb-16" aria-label="Hardware and robotics lab">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <span className="font-mono text-xs text-accent tracking-widest" aria-hidden="true">
          03 //
        </span>
        <h2 className="font-mono text-xs uppercase tracking-widest text-fg-dim font-medium">
          HARDWARE & ROBOTICS LAB
        </h2>
      </div>

      <div className="space-y-6">
        {labEntries.map((entry) => (
          <Card
            key={entry.id}
            as="article"
            className="border border-border bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-border-strong"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                  <span className="text-accent font-semibold">{entry.code}</span>
                  <span className="text-fg-muted">·</span>
                  <span className="px-2 py-0.5 rounded border border-border bg-bg/80 text-[11px] uppercase tracking-wider text-fg-dim">
                    {entry.status} · PRIVATE
                  </span>
                </div>

                <CardTitle as="h3" className="text-xl font-semibold text-fg">
                  {entry.name}
                </CardTitle>

                <p className="text-xs font-mono text-cyan mt-1">
                  {entry.category}
                </p>
              </div>

              {entry.caseStudySlug && (
                <Link
                  href={entry.caseStudySlug}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-border bg-bg/60 text-xs font-mono text-accent hover:border-accent transition-colors shrink-0"
                >
                  <span>Inspect Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>

            {/* Factual Description */}
            <p className="text-sm text-fg-dim leading-relaxed mt-4">
              {entry.summary}
            </p>

            {/* Schematic Airframe Vector Visualization (viewBox-scaled, aria-hidden, no fabricated metrics) */}
            <div
              className="my-5 p-4 rounded border border-border/80 bg-bg/60 flex flex-col items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-full max-w-sm">
                <svg
                  viewBox="0 0 400 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto opacity-75"
                >
                  {/* Biomimetic Airframe Schematic Contour */}
                  <path
                    d="M 200,20 L 210,50 L 370,35 L 340,65 L 215,65 L 205,100 L 200,110 L 195,100 L 185,65 L 60,65 L 30,35 L 190,50 Z"
                    stroke="#00f5ff"
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                  />
                  {/* Wing Spar Kinematic Center */}
                  <circle cx="200" cy="55" r="4" fill="#00f5ff" />
                  <line x1="200" y1="55" x2="350" y2="45" stroke="#7c5cff" strokeWidth="1" />
                  <line x1="200" y1="55" x2="50" y2="45" stroke="#7c5cff" strokeWidth="1" />
                  {/* Joint Markers */}
                  <circle cx="215" cy="65" r="2.5" stroke="#00f5ff" strokeWidth="1" />
                  <circle cx="185" cy="65" r="2.5" stroke="#00f5ff" strokeWidth="1" />
                  <text x="200" y="116" textAnchor="middle" fill="#8b8b94" fontSize="8" fontFamily="monospace">
                    AIRFRAME KINEMATICS SCHEMATIC · NON-SCALE
                  </text>
                </svg>
              </div>
            </div>

            {/* Active Bench Focus */}
            {entry.currentWork && entry.currentWork.length > 0 && (
              <div className="pt-3 border-t border-border">
                <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider block mb-2">
                  Active Bench Focus
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-fg-dim">
                  {entry.currentWork.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-accent select-none">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
