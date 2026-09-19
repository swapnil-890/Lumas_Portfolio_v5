import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import { ideas } from '../data/ideas'
import { personal } from '../data/personal'
import { FEATURES } from '../config/features'

export interface PaletteItem {
  id: string
  title: string
  category: 'Section' | 'Project' | 'Idea' | 'Interest'
  subtitle?: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigateSection: (sectionId: string) => void
}

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigateSection,
}: CommandPaletteProps) {
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Manage html[data-palette-open="true"], body scroll lock, and focus restoration
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null
      document.documentElement.setAttribute('data-palette-open', 'true')
      const origOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })

      return () => {
        document.documentElement.removeAttribute('data-palette-open')
        document.body.style.overflow = origOverflow
        if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen])

  // Build searchable items catalogue
  const allItems = useMemo<PaletteItem[]>(() => {
    const items: PaletteItem[] = [
      {
        id: 'sec-info',
        title: '01 — Info / Identity & Record',
        category: 'Section',
        action: () => onNavigateSection('info'),
      },
      {
        id: 'sec-pfp',
        title: '02 — PFP / Visual Identity',
        category: 'Section',
        action: () => onNavigateSection('pfp'),
      },
      {
        id: 'sec-who',
        title: '03 — Who Am I / Philosophy',
        category: 'Section',
        action: () => onNavigateSection('who-am-i'),
      },
      {
        id: 'sec-intro',
        title: '04 — Introduction / Student & Ecosystem',
        category: 'Section',
        action: () => onNavigateSection('introduction'),
      },
      {
        id: 'sec-digital',
        title: '05 — Digital World / Projects & Ideas',
        category: 'Section',
        action: () => onNavigateSection('digital-world'),
      },
    ]

    if (FEATURES.secretArchive.enabled) {
      items.push({
        id: 'sec-archive',
        title: '06 — Something Special / Secret Archive',
        category: 'Section',
        action: () => onNavigateSection('something-special'),
      })
    }

    // Projects
    projects.forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        title: p.name,
        category: 'Project',
        subtitle: p.category,
        action: () => onNavigateSection('digital-world'),
      })
    })

    // Ideas
    ideas.forEach((idea) => {
      items.push({
        id: `idea-${idea.id}`,
        title: idea.title,
        category: 'Idea',
        subtitle: 'Exploratory Idea',
        action: () => onNavigateSection('digital-world'),
      })
    })

    // Interests
    personal.interests.forEach((interest) => {
      items.push({
        id: `interest-${interest.label.toLowerCase().replace(/\s+/g, '-')}`,
        title: interest.label,
        category: 'Interest',
        subtitle: 'Wikipedia Reference ↗',
        action: () => {
          window.open(interest.wiki, '_blank', 'noopener,noreferrer')
        },
      })
    })

    return items
  }, [onNavigateSection])

  // Filter items based on query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allItems
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q))
    )
  }, [allItems, query])

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleSelect = (item: PaletteItem) => {
    onClose()
    item.action()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      e.stopPropagation()
      setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      e.stopPropagation()
      setSelectedIndex((prev) => (filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
        >
          {/* Backdrop: rgba(9,10,15,0.72) + blur 6px */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-[#090A0F]/72 backdrop-blur-[6px]"
          />

          {/* Centered Panel: max-w-lg, border, bg-overlay */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg border border-border bg-overlay shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="border-b border-border p-3">
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-results"
                aria-activedescendant={
                  filtered[selectedIndex] ? `item-${filtered[selectedIndex].id}` : undefined
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Jump to section, project, or interest…"
                className="w-full bg-transparent px-2 py-1.5 font-mono text-sm text-fg placeholder:text-subtle focus:outline-none"
              />
            </div>

            {/* Result List */}
            <ul
              ref={listRef}
              id="palette-results"
              role="listbox"
              className="max-h-80 overflow-y-auto p-2 space-y-1"
            >
              {filtered.length > 0 ? (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <li
                      key={item.id}
                      id={`item-${item.id}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-xs transition-colors ${
                        isSelected
                          ? 'bg-elevated text-fg border border-border-hi'
                          : 'text-muted hover:bg-surface hover:text-fg'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 truncate pr-2">
                        <span className="font-medium text-fg truncate">
                          {item.title}
                        </span>
                        {item.subtitle ? (
                          <span className="font-mono text-[11px] text-subtle truncate">
                            {item.subtitle}
                          </span>
                        ) : null}
                      </div>

                      <span className="shrink-0 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest2 text-subtle">
                        {item.category}
                      </span>
                    </li>
                  )
                })
              ) : (
                <li className="py-6 text-center font-mono text-xs text-subtle">
                  No matches.
                </li>
              )}
            </ul>

            {/* Keyboard shortcut footer */}
            <div className="border-t border-border bg-surface/60 px-3 py-2 flex items-center justify-between font-mono text-[10px] tracking-widest2 text-subtle uppercase">
              <span>↑↓ Navigate · Enter Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
