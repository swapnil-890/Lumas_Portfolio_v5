import React from 'react';
import { stack, type StackId } from '@/data/stack';
import { STACK_CATEGORIES, type StackCategory, type StackItem } from '@/data/types';
import { systemsUsing } from '@/data/graph';
import { Card } from '@/components/ui/Card';
import { ExternalLink } from 'lucide-react';

const CATEGORY_LABELS: Record<StackCategory, string> = {
  LANGUAGES: '01 // PROGRAMMING LANGUAGES',
  AI_ML: '02 // AI & SCIENTIFIC COMPUTING',
  FRAMEWORKS: '03 // ARCHITECTURAL FRAMEWORKS',
  SYSTEMS: '04 // KERNEL & ENVIRONMENTS',
  TOOLING: '05 // ENGINEERING TOOLING & PIPELINES',
  HARDWARE_GPU: '06 // HARDWARE & DESIGN ARCHITECTURES',
};

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-24 mb-16" aria-label="Technical stack">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <span className="font-mono text-xs text-accent tracking-widest" aria-hidden="true">
          04 //
        </span>
        <h2 className="font-mono text-xs uppercase tracking-widest text-fg-dim font-medium">
          TECHNICAL STACK & ECOSYSTEM
        </h2>
      </div>

      <div className="space-y-8">
        {STACK_CATEGORIES.map((catKey: StackCategory) => {
          const items = (stack as readonly StackItem[]).filter((item) => item.category === catKey);
          if (items.length === 0) return null;

          return (
            <div key={catKey}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted mb-3 flex items-center gap-2">
                <span className="text-accent">›</span>
                <span>{CATEGORY_LABELS[catKey]}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item) => {
                  const relatedSystems = systemsUsing(item.id as StackId);

                  return (
                    <Card
                      key={item.id}
                      className="p-4 border border-border bg-surface transition-all duration-200 hover:border-border-strong flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-sm text-fg tracking-tight">
                            {item.name}
                          </span>

                          {item.resource && (
                            <a
                              href={item.resource.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${item.name} documentation (opens in a new tab)`}
                              className="text-fg-muted hover:text-cyan transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>

                        {item.context && (
                          <p className="text-xs text-fg-dim leading-relaxed">
                            {item.context}
                          </p>
                        )}
                      </div>

                      {/* Derived relationship: systemsUsing(stackId) per §17.4 */}
                      {relatedSystems.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-border flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
                          <span className="text-fg-muted select-none">USED IN:</span>
                          {relatedSystems.map((sys) => (
                            <a
                              key={sys.id}
                              href="#systems"
                              className="text-accent hover:underline bg-bg/80 px-1.5 py-0.5 rounded border border-border"
                            >
                              {sys.code}
                            </a>
                          ))}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
