import SectionShell from '../components/SectionShell'
import SpotlightCard from '../components/SpotlightCard'
import { personal } from '../data/personal'
import { User, Cpu, ShieldCheck } from 'lucide-react'

export default function SectionPFP() {
  const { profileImage, name } = personal

  return (
    <SectionShell id="pfp" number="02" eyebrow="PFP" title="Profile">
      <SpotlightCard className="p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[240px_minmax(0,1fr)] sm:items-center">
          {/* Avatar / Cybernetic Scanner Placeholder */}
          <div className="relative aspect-square w-full max-w-[240px] mx-auto overflow-hidden rounded-2xl border border-border/80 bg-elevated/90 shadow-inner">
            {profileImage ? (
              <img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
                {/* Background radar grid effect */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#4c8dff_1px,transparent_1px)] [background-size:16px_16px]"
                  aria-hidden="true"
                />

                {/* Cyber orbital ring */}
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/40" />
                  <div className="absolute inset-1 rounded-full border border-accent/20 bg-accent/5" />
                  <User className="h-8 w-8 text-accent/80" />
                </div>

                <div className="relative z-10 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest2 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    Awaiting input
                  </div>
                  <p className="font-mono text-[10px] text-subtle/80 break-all pt-1">
                    src/data/personal.ts → profileImage
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Context and Information */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
              <Cpu className="h-3.5 w-3.5 text-accent" />
              <span>Identity Matrix · Biometric Slot</span>
            </div>

            <p className="text-base text-muted text-pretty leading-relaxed">
              No portrait has been provided. This slot is intentionally empty and
              will render a real image the moment one is added to the data layer.
            </p>

            <div className="rounded-lg border border-border/60 bg-surface/60 p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-subtle">
                <span>SLOT_STATUS</span>
                <span className="text-accent">UNASSIGNED (NULL)</span>
              </div>
              <div className="flex items-center justify-between text-subtle">
                <span>RENDER_ENGINE</span>
                <span className="text-fg">STATIC ASSET LOADER</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span>Placeholder · Not a representation</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </SectionShell>
  )
}
