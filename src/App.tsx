import { useCallback, useEffect, useMemo, useState, type ComponentType } from 'react'
import Navigation, { type NavSection } from './components/Navigation'
import SectionIndicator from './components/SectionIndicator'
import SectionInfo from './sections/SectionInfo'
import SectionPFP from './sections/SectionPFP'
import SectionWhoAmI from './sections/SectionWhoAmI'
import SectionIntroduction from './sections/SectionIntroduction'
import SectionDigitalWorld from './sections/SectionDigitalWorld'
import SectionSomethingSpecial from './sections/SectionSomethingSpecial'
import { FEATURES } from './config/features'
import { socials } from './data/socials'
import { Shield, Sparkles } from 'lucide-react'

interface SectionDef extends NavSection {
  Component: ComponentType
}

export default function App() {
  const sections = useMemo<readonly SectionDef[]>(() => {
    const base: SectionDef[] = [
      { id: 'info', label: 'Info', Component: SectionInfo },
      { id: 'pfp', label: 'PFP', Component: SectionPFP },
      { id: 'who-am-i', label: 'Who Am I', Component: SectionWhoAmI },
      { id: 'introduction', label: 'Introduction', Component: SectionIntroduction },
      { id: 'digital-world', label: 'Digital World', Component: SectionDigitalWorld },
    ]
    if (FEATURES.secretArchive.enabled) {
      base.push({
        id: 'something-special',
        label: 'Special',
        Component: SectionSomethingSpecial,
      })
    }
    return base
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)

  const go = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(sections.length - 1, i))
      const el = document.getElementById(sections[clamped].id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [sections],
  )

  // Track active section via IntersectionObserver.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        }
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  // Keyboard navigation — guarded against typing fields.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.tagName === 'SELECT' ||
          t.isContentEditable)
      ) {
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key.toLowerCase() === 'j') {
        e.preventDefault()
        go(activeIndex + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key.toLowerCase() === 'k') {
        e.preventDefault()
        go(activeIndex - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, go])

  return (
    <div className="relative min-h-screen bg-bg text-fg selection:bg-accent/30 selection:text-white">
      {/* Subtle ambient light and grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-40" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 ambient-glow opacity-60" aria-hidden="true" />

      <a
        href="#info"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-fg focus:ring-2 focus:ring-accent"
      >
        Skip to content
      </a>

      <Navigation sections={sections} activeIndex={activeIndex} onNavigate={go} />

      <main className="relative z-10 mx-auto max-w-6xl pb-24">
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>

      <footer className="relative z-10 border-t border-border/80 bg-surface/40 backdrop-blur-md px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 font-mono text-sm font-semibold tracking-widest2 text-fg">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>LUMAS™</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Personal digital archive exploring artificial intelligence & scientific systems.
              </p>
            </div>

            {/* Social channels display */}
            <div className="flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-1.5 rounded-md border border-border/80 bg-elevated px-2.5 py-1 font-mono text-[11px] text-subtle"
                >
                  <span>{s.label}</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted/60">
                    {s.url ? 'ONLINE' : '[OFFLINE]'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-widest2 text-subtle sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-accent/70" />
              <span>LUMAS™ · Digital Identity Architecture</span>
            </div>
            <span>IST (UTC+5:30) · {new Date().getFullYear()} · Static Release</span>
          </div>
        </div>
      </footer>

      <SectionIndicator current={activeIndex + 1} total={sections.length} />
    </div>
  )
}
