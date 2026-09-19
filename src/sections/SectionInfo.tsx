import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import Panel from '../components/Panel'
import { personal } from '../data/personal'

export default function SectionInfo() {
  const reduce = useReducedMotion()
  const [istTime, setIstTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Format time in IST (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setIstTime(now.toLocaleTimeString('en-GB', options))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <SectionShell id="info" number="01" eyebrow="Overview" title="Identity & Record">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* T1: Hero (2x2) */}
        <Panel
          brackets
          spotlight
          className="p-6 md:col-span-2 md:row-span-2 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                Archival Record // 01
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-accent">
                <span
                  className={`h-2 w-2 rounded-full bg-accent ${
                    reduce ? '' : 'animate-pulse'
                  }`}
                  aria-hidden="true"
                />
                <span>SYSTEM ONLINE</span>
              </span>
            </div>

            <div className="pt-2">
              <h1 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                {personal.name}
              </h1>
              <p className="mt-1 font-mono text-sm text-muted">
                {personal.legalName}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted text-pretty pt-1">
              {personal.role}
            </p>
          </div>

          <div className="mt-8 rounded-md border border-border bg-elevated/80 p-3.5 font-mono text-[11px] uppercase tracking-widest2 text-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>TELEMETRY · IST (UTC+5:30)</span>
            <span className="text-fg font-mono text-xs">{istTime ? `${istTime} IST` : 'SYNCING...'}</span>
          </div>
        </Panel>

        {/* T2: Key-Value Specs (1x1) */}
        <Panel brackets spotlight className="p-5 md:col-span-1 md:row-span-1">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Vital Specs
          </span>
          <dl className="mt-4 space-y-2.5 font-mono text-xs">
            <div className="flex items-baseline justify-between border-b border-border/60 pb-1.5">
              <dt className="text-subtle uppercase tracking-widest2 text-[11px]">Age</dt>
              <dd className="text-fg font-medium">{personal.age}</dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-border/60 pb-1.5">
              <dt className="text-subtle uppercase tracking-widest2 text-[11px]">Gender</dt>
              <dd className="text-fg">{personal.gender}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-subtle uppercase tracking-widest2 text-[11px]">TZ</dt>
              <dd className="text-fg">{personal.timezone}</dd>
            </div>
          </dl>
        </Panel>

        {/* T3: Interests Chips (1x2 tall) */}
        <Panel brackets spotlight className="p-5 md:col-span-1 md:row-span-2 flex flex-col">
          <div className="border-b border-border pb-3">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
              Interests
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 overflow-y-auto max-h-[360px] pr-1">
            {personal.interests.map((interest) => (
              <a
                key={interest.label}
                href={interest.wiki}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${interest.label} — opens Wikipedia in a new tab`}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-widest2 text-fg hover:border-border-hi hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors"
              >
                <span>{interest.label}</span>
                <span aria-hidden="true" className="text-subtle text-[10px]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Panel>

        {/* T4: Games (1x1) */}
        <Panel brackets spotlight className="p-5 md:col-span-1 md:row-span-1">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Simulations / Games
          </span>
          <div className="mt-3 space-y-2">
            {personal.games.map((game, idx) => {
              const glyphs = ['⟡', '◈', '❖']
              return (
                <div
                  key={game}
                  className="flex items-center gap-2 rounded border border-border/80 bg-elevated/60 px-2.5 py-1.5 font-mono text-xs text-fg"
                >
                  <span aria-hidden="true" className="text-accent text-[11px]">
                    {glyphs[idx % glyphs.length]}
                  </span>
                  <span className="truncate">{game}</span>
                </div>
              )
            })}
          </div>
        </Panel>

        {/* T5: Likes (2x1) */}
        <Panel brackets spotlight className="p-5 md:col-span-2 md:row-span-1">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Resonances
          </span>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-fg">
            {personal.likes.map((like) => (
              <li key={like} className="flex items-center gap-2 truncate">
                <span aria-hidden="true" className="text-accent text-[10px]">·</span>
                <span>{like}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* T6: Dislikes (2x1, muted) */}
        <Panel brackets spotlight className="p-5 md:col-span-2 md:row-span-1">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            Divergences
          </span>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-muted">
            {personal.dislikes.map((dislike) => (
              <li key={dislike} className="flex items-center gap-2 truncate">
                <span aria-hidden="true" className="text-subtle text-[10px]">·</span>
                <span>{dislike}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </SectionShell>
  )
}
