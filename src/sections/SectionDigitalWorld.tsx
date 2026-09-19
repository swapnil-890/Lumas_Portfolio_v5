import { useState } from 'react'
import SectionShell from '../components/SectionShell'
import StatusBadge from '../components/StatusBadge'
import { projects } from '../data/projects'
import type { ProjectStatus } from '../data/projects'
import { ideas } from '../data/ideas'

// Deviation D1: blueprint literal -> composite status string; approved by user.
const PULSING_STATUSES: ReadonlySet<ProjectStatus> = new Set<ProjectStatus>([
  'BUILDING / EXPERIMENTAL',
])
import { socials } from '../data/socials'
import { personal } from '../data/personal'
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  PinterestIcon,
  WhatsAppIcon,
  MailIcon,
  PhoneIcon,
  ExternalLinkIcon,
} from '../components/Icons'

export default function SectionDigitalWorld() {
  const [selectedEmailIdx, setSelectedEmailIdx] = useState(0)
  const [selectedPhoneIdx, setSelectedPhoneIdx] = useState(0)
  const [selectedWaIdx, setSelectedWaIdx] = useState(0)

  const currentEmail = personal.contact.emails[selectedEmailIdx]
  const currentPhone = personal.contact.phones[selectedPhoneIdx]
  const currentWa = personal.contact.whatsapps[selectedWaIdx]

  return (
    <SectionShell id="digital-world" number="05" eyebrow="Digital World" title="Projects & ideas">
      {/* Projects List */}
      <ul className="space-y-6">
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
              <div className="inline-flex items-center gap-2">
                {PULSING_STATUSES.has(p.status) ? (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent ring-4 ring-accent/30 motion-safe:animate-pulse motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                ) : null}
                <StatusBadge label={p.status} tone="accent" />
              </div>
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

      {/* Ideas Grid */}
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

      {/* Section 12: CONNECT / CONTACT Area */}
      <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
        <div className="mb-6 border-b border-border pb-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-accent">
              Connect & Communication
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
              Verified Actions
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            Direct communication channels and public social repositories.
          </p>
        </div>

        {/* Public Social Links with recognizable icons */}
        <div className="space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Public Profiles
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socials
              .filter((s) => s.type !== 'whatsapp')
              .map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${s.label} (${s.subtitle ?? s.url})`}
                  className="group flex items-center justify-between rounded-md border border-border bg-elevated px-4 py-3 text-sm text-fg transition-all duration-200 hover:border-accent-dim hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-subtle transition-colors group-hover:text-accent">
                      {s.type === 'github' && <GitHubIcon className="h-4 w-4" />}
                      {s.type === 'linkedin' && <LinkedInIcon className="h-4 w-4" />}
                      {s.type === 'instagram' && <InstagramIcon className="h-4 w-4" />}
                      {s.type === 'pinterest' && <PinterestIcon className="h-4 w-4" />}
                    </span>
                    <span className="font-medium">{s.label}</span>
                  </div>
                  <ExternalLinkIcon className="h-3.5 w-3.5 text-subtle opacity-60 transition-all group-hover:text-accent group-hover:opacity-100 group-hover:translate-x-0.5" />
                </a>
              ))}
          </div>
        </div>

        {/* Direct Contact Actions: Email, Phone, WhatsApp */}
        <div className="mt-8 border-t border-border pt-6 space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Direct Contact Panel
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Email Action Card */}
            <div className="flex flex-col justify-between rounded-md border border-border bg-elevated p-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                    <MailIcon className="h-3.5 w-3.5 text-accent" />
                    <span>Email</span>
                  </span>
                  <div className="flex gap-1">
                    {personal.contact.emails.map((e, idx) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setSelectedEmailIdx(idx)}
                        aria-label={`Select ${e.label}`}
                        className={`rounded px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                          idx === selectedEmailIdx
                            ? 'bg-accent/15 text-accent font-semibold'
                            : 'text-subtle hover:text-fg'
                        }`}
                      >
                        {idx === 0 ? 'Primary' : 'Alt'}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted font-mono truncate" title={currentEmail.value}>
                  {currentEmail.value}
                </p>
              </div>

              <a
                href={currentEmail.actionHref}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded border border-accent-dim/60 bg-accent/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-accent transition-all duration-200 hover:bg-accent/20 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Launch Mail</span>
                <ExternalLinkIcon className="h-3 w-3" />
              </a>
            </div>

            {/* Phone Action Card */}
            <div className="flex flex-col justify-between rounded-md border border-border bg-elevated p-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                    <PhoneIcon className="h-3.5 w-3.5 text-accent" />
                    <span>Voice</span>
                  </span>
                  <div className="flex gap-1">
                    {personal.contact.phones.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPhoneIdx(idx)}
                        aria-label={`Select ${p.label}`}
                        className={`rounded px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                          idx === selectedPhoneIdx
                            ? 'bg-accent/15 text-accent font-semibold'
                            : 'text-subtle hover:text-fg'
                        }`}
                      >
                        {idx === 0 ? '#1' : '#2'}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted font-mono" title={currentPhone.value}>
                  {currentPhone.value}
                </p>
              </div>

              <a
                href={currentPhone.actionHref}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-fg transition-all duration-200 hover:border-accent-dim hover:text-accent hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Call Number</span>
                <PhoneIcon className="h-3 w-3" />
              </a>
            </div>

            {/* WhatsApp Action Card */}
            <div className="flex flex-col justify-between rounded-md border border-border bg-elevated p-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                    <WhatsAppIcon className="h-3.5 w-3.5 text-accent" />
                    <span>WhatsApp</span>
                  </span>
                  <div className="flex gap-1">
                    {personal.contact.whatsapps.map((w, idx) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setSelectedWaIdx(idx)}
                        aria-label={`Select ${w.label}`}
                        className={`rounded px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                          idx === selectedWaIdx
                            ? 'bg-accent/15 text-accent font-semibold'
                            : 'text-subtle hover:text-fg'
                        }`}
                      >
                        {idx === 0 ? 'Line 1' : 'Line 2'}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted font-mono" title={currentWa.value}>
                  {currentWa.value}
                </p>
              </div>

              <a
                href={currentWa.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded border border-accent-dim/60 bg-accent/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-accent transition-all duration-200 hover:bg-accent/20 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Open Chat</span>
                <WhatsAppIcon className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
