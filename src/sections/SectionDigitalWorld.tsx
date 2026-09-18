import SectionShell from '../components/SectionShell'
import StatusBadge from '../components/StatusBadge'
import SpotlightCard from '../components/SpotlightCard'
import { projects } from '../data/projects'
import { ideas } from '../data/ideas'
import { Layers, Lightbulb, Info, AlertTriangle } from 'lucide-react'

export default function SectionDigitalWorld() {
  return (
    <SectionShell id="digital-world" number="05" eyebrow="Digital World" title="Projects & ideas">
      {/* Featured Projects List */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          <Layers className="h-3.5 w-3.5 text-accent" />
          <span>Active & Planned Architectures</span>
        </div>

        <ul className="space-y-6">
          {projects.map((p) => (
            <li key={p.id}>
              <SpotlightCard className="p-6 sm:p-8 space-y-4 hover:border-accent-dim/80">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                        {p.name}
                      </h3>
                      {p.shortName ? (
                        <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-widest2 text-accent border border-border">
                          {p.shortName}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest2 text-subtle">
                      {p.category}
                    </p>
                  </div>
                  <StatusBadge
                    label={p.status}
                    tone={p.status.includes('BUILDING') ? 'accent' : 'neutral'}
                  />
                </div>

                <p className="text-sm leading-relaxed text-muted text-pretty">
                  {p.description}
                </p>

                {p.context ? (
                  <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-elevated/40 px-3.5 py-2 text-xs text-muted">
                    <Info className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span>
                      <strong className="font-mono text-[10px] uppercase tracking-widest2 text-subtle mr-1">
                        Context:
                      </strong>
                      {p.context}
                    </span>
                  </div>
                ) : null}

                {/* Tech & Research Areas */}
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest2 text-subtle">
                    Domain Focus Areas
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.areas.map((a) => (
                      <li
                        key={a}
                        className="rounded-md border border-border bg-elevated/60 px-2.5 py-1 font-mono text-[11px] text-muted hover:text-fg hover:border-accent-dim transition-colors"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {p.disclaimer ? (
                  <div className="flex items-center gap-2 pt-2 border-t border-border/40 font-mono text-[10px] uppercase tracking-widest2 text-subtle">
                    <AlertTriangle className="h-3 w-3 text-subtle shrink-0" />
                    <span>{p.disclaimer}</span>
                  </div>
                ) : null}
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>

      {/* Experimental Ideas Grid */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
          <span>Exploratory Concepts & Ideas</span>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {ideas.map((idea) => (
            <li key={idea.id}>
              <SpotlightCard className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border/80 bg-elevated font-mono text-xs font-semibold text-accent">
                    {idea.index}
                  </span>
                  <span className="text-sm font-medium text-fg">{idea.title}</span>
                </div>
                <StatusBadge label={idea.status} tone="muted" />
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
