import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { systems } from '@/data/systems';
import { Card, CardTitle } from '@/components/ui/Card';

export function SystemsSection() {
  return (
    <section id="systems" className="scroll-mt-24 mb-16" aria-label="Software systems">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <span className="font-mono text-xs text-accent tracking-widest" aria-hidden="true">
          02 //
        </span>
        <h2 className="font-mono text-xs uppercase tracking-widest text-fg-dim font-medium">
          SYSTEMS & ARCHITECTURE
        </h2>
      </div>

      <div className="space-y-6">
        {systems.map((system) => {
          return (
            <Card
              key={system.id}
              as="article"
              className="border border-border bg-surface transition-all duration-200 hover:border-border-strong"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  {/* System Metadata Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                    <span className="text-accent font-semibold">{system.code}</span>
                    <span className="text-fg-muted">·</span>
                    <span className="px-2 py-0.5 rounded border border-border bg-bg/80 text-[11px] uppercase tracking-wider text-fg-dim">
                      {system.status} · {system.visibility}
                    </span>
                  </div>

                  <CardTitle as="h3" className="text-xl font-semibold text-fg">
                    {system.name}
                  </CardTitle>

                  {system.tagline && (
                    <p className="text-xs sm:text-sm font-mono text-cyan mt-1">
                      {system.tagline}
                    </p>
                  )}
                </div>

                {/* Case Study Deep Link */}
                {system.caseStudySlug && (
                  <Link
                    href={system.caseStudySlug}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-border bg-bg/60 text-xs font-mono text-accent hover:border-accent transition-colors shrink-0"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {/* Verified Technical Domains */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {system.domains.map((domain) => (
                  <span
                    key={domain}
                    className="text-[11px] font-mono text-fg-muted px-2 py-0.5 rounded bg-bg/40 border border-border/60"
                  >
                    {domain}
                  </span>
                ))}
              </div>

              {/* Factual Description */}
              <p className="text-sm text-fg-dim leading-relaxed mt-4">
                {system.summary}
              </p>

              {/* Technical Capabilities */}
              <div className="mt-4 pt-3 border-t border-border">
                <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider block mb-2">
                  System Capabilities
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-fg-dim">
                  {system.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <span className="text-accent select-none">›</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Association Chips */}
              <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider mr-1">
                  Stack:
                </span>
                {system.stackIds.map((stackId) => (
                  <Link
                    key={stackId}
                    href="#stack"
                    className="font-mono text-[11px] px-2 py-0.5 rounded border border-border bg-bg/60 text-fg-dim hover:text-cyan hover:border-cyan/40 transition-colors"
                  >
                    {stackId}
                  </Link>
                ))}
              </div>

              {/* Architecture Stage Disclosure Toggle per §17.2 using semantic HTML details/summary */}
              {system.architecture && system.architecture.length > 0 && (
                <details className="group mt-4 pt-3 border-t border-border">
                  <summary className="inline-flex items-center gap-2 text-xs font-mono text-fg-dim hover:text-fg transition-colors cursor-pointer list-none select-none">
                    <span className="group-open:hidden">Inspect Architecture Pipeline</span>
                    <span className="hidden group-open:inline">Hide Architecture Pipeline</span>
                    <ChevronDown className="w-3.5 h-3.5 text-accent transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>

                  <ol className="mt-3 space-y-2 pl-4 border-l-2 border-border font-mono text-xs text-fg-dim">
                    {system.architecture.map((stage, idx) => (
                      <li key={stage.id} className="relative flex items-center gap-3">
                        <span className="text-accent font-semibold text-[10px]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-fg">{stage.label}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
