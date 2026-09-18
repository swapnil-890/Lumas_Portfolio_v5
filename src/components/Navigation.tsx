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
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-bg/75 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <a
          href={`#${sections[0]?.id ?? 'info'}`}
          onClick={(e) => {
            e.preventDefault()
            onNavigate(0)
          }}
          className="font-mono text-[12px] tracking-widest2 text-fg hover:text-accent focus-visible:text-accent"
        >
          LUMAS<span className="text-subtle">™</span>
        </a>

        <ul className="flex items-center gap-0.5 sm:gap-1">
          {sections.map((s, i) => {
            const active = i === activeIndex
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(i)}
                  aria-current={active ? 'true' : undefined}
                  className={`group flex items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[11px] tracking-widest2 uppercase transition-colors ${
                    active
                      ? 'text-accent'
                      : 'text-subtle hover:text-fg focus-visible:text-fg'
                  }`}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span className="hidden md:inline">{s.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
