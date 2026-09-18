import SectionShell from '../components/SectionShell'
import StatusBadge from '../components/StatusBadge'
import { projects } from '../data/projects'
import { ideas } from '../data/ideas'

export default function SectionDigitalWorld() {
  return (
    <SectionShell id="digital-world" number="05" eyebrow="Digital World" title="Projects & ideas">
      <ul className="space-y-5">
        {projects.map((p) => (
          <li
            key={p.id}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent-dim/60 sm:p-6"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-medium tracking-tight text-fg">
                  {p.name}
                  {p.shortName ? (
                    <span className="ml-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                      {p.shortName}
                    </span>
                  ) : null}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                  {p.category}
                </p>
              </div>
              <StatusBadge label={p.status} tone="accent" />
            </div>

            <p className="text-sm leading-relaxed text-muted text-pretty">
              {p.description}
            </p>

            {p.context ? (
              <p className="mt-3 text-sm text-muted">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                  Context ·{' '}
                </span>
                {p.context}
              </p>
            ) : null}

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.areas.map((a) => (
                <li
                  key={a}
                  className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {a}
                </li>
              ))}
            </ul>

            {p.disclaimer ? (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                {p.disclaimer}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          Ideas
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="flex items-baseline justify-between rounded-md border border-border bg-surface px-4 py-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-widest2 text-subtle">
                  {idea.index}
                </span>
                <span className="text-sm text-fg">{idea.title}</span>
              </div>
              <StatusBadge label={idea.status} tone="muted" />
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
