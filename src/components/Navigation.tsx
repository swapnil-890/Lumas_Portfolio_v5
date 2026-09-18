import { motion } from 'framer-motion'

export interface NavSection {
  id: string
  label: string
}

interface NavigationProps {
  sections: readonly NavSection[]
  activeIndex: number
  onNavigate: (index: number) => void
}

export default function Navigation({
  sections,
  activeIndex,
  onNavigate,
}: NavigationProps) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-md transition-all duration-200"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <a
            href={`#${sections[0]?.id ?? 'info'}`}
            onClick={(e) => {
              e.preventDefault()
              onNavigate(0)
            }}
            className="group flex items-center gap-2 font-mono text-[12px] font-medium tracking-widest2 text-fg hover:text-accent focus-visible:text-accent transition-colors"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>LUMAS</span>
            <span className="text-subtle group-hover:text-accent/80 transition-colors">™</span>
          </a>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 px-2 py-0.5 text-[10px] font-mono text-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
            <span>IST SYSTEM ONLINE</span>
          </div>
        </div>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-1 sm:gap-1.5">
            {sections.map((s, i) => {
              const active = i === activeIndex
              return (
                <li key={s.id} className="relative">
                  <button
                    type="button"
                    onClick={() => onNavigate(i)}
                    aria-current={active ? 'true' : undefined}
                    className={`relative z-10 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] tracking-widest2 uppercase transition-colors ${
                      active
                        ? 'text-accent font-semibold'
                        : 'text-subtle hover:text-fg focus-visible:text-fg'
                    }`}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span className="hidden md:inline">{s.label}</span>
                  </button>

                  {active ? (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-md border border-accent/20 bg-accent/10 shadow-[0_0_12px_rgba(76,141,255,0.12)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
