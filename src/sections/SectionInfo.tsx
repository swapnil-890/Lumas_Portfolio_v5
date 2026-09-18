import SectionShell from '../components/SectionShell'
import { personal } from '../data/personal'

export default function SectionInfo() {
  return (
    <SectionShell id="info" number="01" eyebrow="Info" title="Identity">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <p className="text-4xl font-medium tracking-tight text-fg sm:text-5xl">
            {personal.name}
          </p>
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
            <dd className="mt-1 text-fg">IST</dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Interests" items={personal.interests} />
        <Field label="Likes" items={personal.likes} />
        <Field label="Games" items={personal.games} />
        <Field label="Dislikes" items={personal.dislikes} muted />
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
