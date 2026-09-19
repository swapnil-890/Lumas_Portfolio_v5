import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

export interface PanelProps {
  children: ReactNode
  brackets?: boolean
  spotlight?: boolean
  className?: string
  as?: 'div' | 'section' | 'article'
}

export default function Panel({
  children,
  brackets = false,
  spotlight = false,
  className = '',
  as = 'div',
}: PanelProps) {
  const Component = as as ElementType
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!spotlight) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const el = panelRef.current
    if (!el) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }

    const handlePointerLeave = () => {
      el.style.setProperty('--mx', '-9999px')
      el.style.setProperty('--my', '-9999px')
    }

    el.addEventListener('pointermove', handlePointerMove, { passive: true })
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [spotlight])

  return (
    <Component
      ref={panelRef}
      className={`group relative overflow-hidden rounded-lg border border-border bg-surface ${className}`}
      style={
        spotlight
          ? ({
              '--mx': '-9999px',
              '--my': '-9999px',
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Optional spotlight radial gradient layer */}
      {spotlight ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(280px circle at var(--mx) var(--my), rgba(76, 141, 255, 0.12), transparent 80%)',
          }}
        />
      ) : null}

      {/* Optional technical corner brackets */}
      {brackets ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 select-none">
          {/* Top-Left */}
          <span className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-accent-dim/50" />
          {/* Top-Right */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-accent-dim/50" />
          {/* Bottom-Left */}
          <span className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-accent-dim/50" />
          {/* Bottom-Right */}
          <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-accent-dim/50" />
        </div>
      ) : null}

      <div className="relative z-1">{children}</div>
    </Component>
  )
}
