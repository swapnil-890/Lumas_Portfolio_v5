import SectionShell from '../components/SectionShell'
import { personal } from '../data/personal'

export default function SectionPFP() {
  const { profileImage, name } = personal

  return (
    <SectionShell id="pfp" number="02" eyebrow="PFP" title="Profile">
      <div className="grid gap-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
        <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-lg border border-border bg-surface">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`Portrait of ${name}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                Awaiting input
              </span>
              <span className="font-mono text-[11px] text-subtle/70">
                src/data/personal.ts → profileImage
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted text-pretty">
            No portrait has been provided. This slot is intentionally empty and
            will render a real image the moment one is added to the data layer.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Placeholder · Not a representation
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
