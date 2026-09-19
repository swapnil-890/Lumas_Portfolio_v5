import SectionShell from '../components/SectionShell'
import StatusBadge from '../components/StatusBadge'
import { ExternalLinkIcon } from '../components/Icons'
import { personal } from '../data/personal'
import { findKnowledgeEntity } from '../data/knowledge'

const HANDS_ON_ITEMS = [
  'Linux environments',
  'GPU / CUDA troubleshooting',
  'Local AI tooling',
  'Android development',
  'Backend / API experimentation',
] as const

const VERBS = ['init', 'start', 'run'] as const

const slug = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const toCommand = (item: string, index: number): string =>
  `${VERBS[index % VERBS.length]} ${slug(item)}`

export default function SectionIntroduction() {
  return (
    <SectionShell id="introduction" number="04" eyebrow="Introduction" title="Focus & environment">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <StatusBadge label={personal.role} tone="accent" />
          <p className="text-sm leading-relaxed text-muted text-pretty">
            Currently focused on AI and data science, alongside a growing interest in scientific computing, robotics and aerospace. The work below reflects continuous exploration, not claimed expertise.
          </p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Learning & exploration
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

      {/* decorative — hands-on exploration CLI log; nothing is executed */}
      <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
        <p
          id="hands-on-heading"
          className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle"
        >
          Hands-on exploration
        </p>
        <ul
          aria-labelledby="hands-on-heading"
          className="space-y-2 rounded-md border border-border bg-elevated/70 p-3.5 font-mono text-xs leading-relaxed"
        >
          {HANDS_ON_ITEMS.map((item, idx) => (
            <li
              key={item}
              className="whitespace-pre-wrap break-all sm:break-words text-fg"
            >
              <span className="sr-only">{item}</span>
              <span
                className="select-none text-subtle mr-2"
                aria-hidden="true"
              >
                [lumas@local ~]$
              </span>
              <span aria-hidden="true" className="text-fg">
                {toCommand(item, idx)}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          Areas of exploration — not claims of achievement.
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
        {items.map((item) => {
          const entity = findKnowledgeEntity(item)
          const destinationLabel =
            entity?.resourceType === 'gfg'
              ? `Open ${item} learning resource on GeeksforGeeks`
              : `Open ${item} official documentation`

          return (
            <li key={item}>
              {entity?.href ? (
                <a
                  href={entity.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={destinationLabel}
                  className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted transition-all duration-150 hover:border-accent-dim hover:text-accent hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>{item}</span>
                  <ExternalLinkIcon className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <span className="inline-block rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
                  {item}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
