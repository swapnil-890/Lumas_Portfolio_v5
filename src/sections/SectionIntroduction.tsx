import SectionShell from '../components/SectionShell'
import StatusBadge from '../components/StatusBadge'
import SpotlightCard from '../components/SpotlightCard'
import { personal } from '../data/personal'
import { Code2, Server, Terminal, Wrench, CheckCircle2 } from 'lucide-react'

export default function SectionIntroduction() {
  return (
    <SectionShell id="introduction" number="04" eyebrow="Introduction" title="Focus & environment">
      {/* Top Overview Grid */}
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <SpotlightCard className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-3">
            <StatusBadge label={personal.role} tone="accent" />
          </div>
          <p className="text-sm leading-relaxed text-muted text-pretty">
            Currently focused on AI and data science, with a parallel pull
            toward scientific computing, robotics, and aerospace. The work below
            reflects exploration rather than claimed expertise.
          </p>
          <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-subtle">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            <span>Foundational curiosity & first-principles approach</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 sm:p-7">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span>Learning / exploration</span>
          </p>
          <ul className="grid grid-cols-2 gap-2.5">
            {personal.focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-lg border border-border/80 bg-elevated/70 px-3 py-2 text-xs font-mono font-medium text-fg hover:border-accent-dim transition-colors"
              >
                {area}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </div>

      {/* Tech Stack Grids */}
      <div className="grid gap-6 sm:grid-cols-2">
        <SpotlightCard className="p-6 sm:p-7">
          <TokenList
            icon={<Code2 className="h-4 w-4 text-accent" />}
            label="Programming"
            items={personal.programming}
          />
        </SpotlightCard>

        <SpotlightCard className="p-6 sm:p-7">
          <TokenList
            icon={<Server className="h-4 w-4 text-emerald-400" />}
            label="Technical ecosystem"
            items={personal.ecosystem}
          />
        </SpotlightCard>
      </div>

      {/* Hands-on Exploration Terminal */}
      <SpotlightCard className="p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-subtle flex items-center gap-2">
            <Wrench className="h-3.5 w-3.5 text-accent" />
            <span>Hands-on exploration</span>
          </p>
          <span className="font-mono text-[10px] text-accent/80 bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
            PRACTICAL LOG
          </span>
        </div>

        <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-center gap-2.5 rounded-md border border-border/40 bg-elevated/40 p-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-xs text-fg">Linux environments</span>
          </li>
          <li className="flex items-center gap-2.5 rounded-md border border-border/40 bg-elevated/40 p-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-xs text-fg">GPU / CUDA troubleshooting</span>
          </li>
          <li className="flex items-center gap-2.5 rounded-md border border-border/40 bg-elevated/40 p-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-xs text-fg">Local AI tooling</span>
          </li>
          <li className="flex items-center gap-2.5 rounded-md border border-border/40 bg-elevated/40 p-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-xs text-fg">Android development</span>
          </li>
          <li className="flex items-center gap-2.5 rounded-md border border-border/40 bg-elevated/40 p-2.5 sm:col-span-2 lg:col-span-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-xs text-fg">Backend / API experimentation</span>
          </li>
        </ul>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-widest2 text-subtle">
          Exploration — not achievement claims.
        </p>
      </SpotlightCard>
    </SectionShell>
  )
}

function TokenList({
  icon,
  label,
  items,
}: {
  icon: React.ReactNode
  label: string
  items: readonly string[]
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest2 text-subtle">
        {icon}
        <span>{label}</span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-border/80 bg-elevated/80 px-3 py-1 font-mono text-xs text-fg hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
