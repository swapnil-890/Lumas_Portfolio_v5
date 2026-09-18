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
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
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

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        go(activeIndex + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        go(activeIndex - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, go])

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#info"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-fg"
      >
        Skip to content
      </a>

      <Navigation sections={sections} activeIndex={activeIndex} onNavigate={go} />

      <main className="mx-auto max-w-6xl">
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>

      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle sm:flex-row sm:items-center">
          <span>LUMAS™ · Personal digital archive</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {socials
              .filter((s) => s.isPublic && s.isPrimary && s.url)
              .map((s) => (
                <a
                  key={s.id}
                  href={s.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg focus-visible:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
          </div>
          <span>IST · {new Date().getFullYear()}</span>
        </div>
      </footer>

      <SectionIndicator current={activeIndex + 1} total={sections.length} />
    </div>
  )
}
