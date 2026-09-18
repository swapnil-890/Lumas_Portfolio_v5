import SectionShell from '../components/SectionShell'
import { personal } from '../data/personal'
import { ExternalLinkIcon } from '../components/Icons'

export default function SectionInfo() {
  return (
    <SectionShell id="info" number="01" eyebrow="Info" title="Identity">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-4xl font-medium tracking-tight text-fg sm:text-5xl">
              {personal.name}
            </h1>
            <span className="font-mono text-[11px] tracking-widest2 text-subtle uppercase">
              / {personal.legalName}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">{personal.role}</p>
        </div>
        <dl className="grid grid-cols-3 gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle sm:justify-items-end">
          <div>
            <dt className="text-subtle">Age</dt>
            <dd className="mt-1 text-fg">{personal.age}</dd>
          </div>
          <div>
            <dt className="text-subtle">Gender</dt>
            <dd className="mt-1 text-fg">{personal.gender}</dd>
          </div>
          <div>
            <dt className="text-subtle">TZ</dt>
            <dd className="mt-1 text-fg">{personal.timezone.split(' ')[0]}</dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {/* Interests with exact Wikipedia links */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Interests (Research & Theory)
          </p>
          <ul className="space-y-1.5 text-sm">
            {personal.interests.map((item) => (
              <li key={item.label}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-fg hover:text-accent focus-visible:text-accent focus-visible:underline outline-none transition-colors"
                >
                  <span aria-hidden="true" className="text-subtle group-hover:text-accent transition-colors">
                    ·
                  </span>
                  <span>{item.label}</span>
                  <ExternalLinkIcon className="h-3 w-3 text-subtle opacity-70 group-hover:text-accent group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Likes, Games, Dislikes (unlinked as specified) */}
        <div className="space-y-8">
          <Field label="Likes" items={personal.likes} />
          <Field label="Games" items={personal.games} />
          <Field label="Dislikes" items={personal.dislikes} muted />
        </div>
      </div>
    </SectionShell>
  )
}

function Field({
  label,
  items,
  muted = false,
}: {
  label: string
  items: readonly string[]
  muted?: boolean
}) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
        {label}
      </p>
      <ul className={`space-y-1.5 text-sm ${muted ? 'text-muted' : 'text-fg'}`}>
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-2">
            <span aria-hidden="true" className="text-subtle">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
