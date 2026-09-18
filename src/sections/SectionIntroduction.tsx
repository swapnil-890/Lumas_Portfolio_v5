import SectionShell from '../components/SectionShell'
import StatusBadge from '../components/StatusBadge'
import { personal } from '../data/personal'

export default function SectionIntroduction() {
  return (
    <SectionShell id="introduction" number="04" eyebrow="Introduction" title="Focus & environment">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <StatusBadge label={personal.role} tone="accent" />
          <p className="text-sm leading-relaxed text-muted text-pretty">
            Currently focused on AI and data science, with a parallel pull
            toward scientific computing, robotics, and aerospace. The work below
            reflects exploration rather than claimed expertise.
          </p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Learning / exploration
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {personal.focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <TokenList label="Programming" items={personal.programming} />
        <TokenList label="Technical ecosystem" items={personal.ecosystem} />
      </div>

      <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          Hands-on exploration
        </p>
        <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
          <li>· Linux environments</li>
          <li>· GPU / CUDA troubleshooting</li>
          <li>· Local AI tooling</li>
          <li>· Android development</li>
          <li>· Backend / API experimentation</li>
        </ul>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          Exploration — not achievement claims.
        </p>
      </div>
    </SectionShell>
  )
}

function TokenList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
        {label}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
