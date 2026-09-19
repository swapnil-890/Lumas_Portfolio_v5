import { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import Panel from '../components/Panel'
import { personal } from '../data/personal'
import Lightbox from '../components/Lightbox'

export default function SectionPFP() {
  const { profileImages } = personal
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hoverTimerRef = useRef<number | null>(null)

  const count = profileImages ? profileImages.length : 0
  const currentImage = count >= 2
    ? (flipped ? profileImages[1] : profileImages[0])
    : (count === 1 ? profileImages[0] : null)

  const clearHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (reduce) return
    if (e.pointerType !== 'mouse') return
    if (flipped) return // only flip front -> back on hover dwell

    clearHoverTimer()
    hoverTimerRef.current = window.setTimeout(() => {
      setFlipped(true)
    }, 600)
  }

  const handlePointerLeave = () => {
    clearHoverTimer()
  }

  const handleCoinClick = () => {
    clearHoverTimer()
    setFlipped((prev) => !prev)
  }

  useEffect(() => {
    return () => {
      clearHoverTimer()
    }
  }, [])

  return (
    <SectionShell id="pfp" number="02" eyebrow="Identity" title="Profile Disc">
      <Panel brackets spotlight className="p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-12">
          {/* Concentric Rotating Disc / 3D Data Coin Container */}
          <div className="flex flex-col items-center justify-center">
            {count >= 2 ? (
              <div className="coin-stage h-48 w-48 min-h-[180px] min-w-[180px] sm:h-56 sm:w-56">
                <div className="coin-glow" aria-hidden="true" />
                <div className="coin-ring" aria-hidden="true">
                  <div className="coin-ring-inner" />
                </div>
                <button
                  ref={triggerRef}
                  type="button"
                  className="coin-btn"
                  data-flipped={flipped}
                  aria-label="Flip profile image"
                  aria-pressed={flipped}
                  onClick={handleCoinClick}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={handlePointerLeave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCoinClick()
                    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                >
                  <span className="coin">
                    <span className="coin-face coin-front">
                      <img
                        src={profileImages[0].src}
                        alt={profileImages[0].alt}
                        className="h-full w-full object-cover pointer-events-none"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="coin-face coin-back">
                      <img
                        src={profileImages[1].src}
                        alt={profileImages[1].alt}
                        className="h-full w-full object-cover pointer-events-none"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  </span>
                </button>
                <div className="coin-scan" aria-hidden="true" />
              </div>
            ) : count === 1 ? (
              <div className="coin-stage h-48 w-48 min-h-[180px] min-w-[180px] sm:h-56 sm:w-56">
                <div className="coin-glow" aria-hidden="true" />
                <div className="coin-ring" aria-hidden="true">
                  <div className="coin-ring-inner" />
                </div>
                <div className="relative z-10 flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center overflow-hidden rounded-full border border-border bg-elevated">
                  <img
                    src={profileImages[0].src}
                    alt={profileImages[0].alt}
                    className="h-full w-full rounded-full object-cover pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="coin-scan" aria-hidden="true" />
              </div>
            ) : (
              <div className="coin-stage h-48 w-48 min-h-[180px] min-w-[180px] sm:h-56 sm:w-56">
                <div className="coin-glow" aria-hidden="true" />
                <div className="coin-ring" aria-hidden="true">
                  <div className="coin-ring-inner" />
                </div>
                <div
                  className="relative z-10 flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center overflow-hidden rounded-full border border-border bg-elevated"
                  aria-label="Profile image awaiting input"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-xs uppercase tracking-widest2 text-subtle">
                      AWAITING INPUT
                    </span>
                  </div>
                </div>
                <div className="coin-scan" aria-hidden="true" />
              </div>
            )}

            {/* Multiple Images Dot Indicators */}
            {count > 1 ? (
              <div className="mt-4 flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    clearHoverTimer()
                    setFlipped(false)
                  }}
                  aria-label="Show front capture"
                  aria-pressed={!flipped}
                  className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${
                      !flipped ? 'w-5 bg-accent' : 'w-2 bg-border hover:bg-subtle'
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearHoverTimer()
                    setFlipped(true)
                  }}
                  aria-label="Show back capture"
                  aria-pressed={flipped}
                  className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${
                      flipped ? 'w-5 bg-accent' : 'w-2 bg-border hover:bg-subtle'
                    }`}
                  />
                </button>
              </div>
            ) : null}

            {/* Separate Expand Lightbox Trigger */}
            {currentImage ? (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label={`Open ${currentImage.alt} in lightbox`}
                className="mt-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-subtle hover:border-accent/40 hover:bg-elevated hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span>Expand Capture</span>
              </button>
            ) : null}
          </div>

          {/* Contextual Archival Narrative */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                Archival Record // Profile Disc
              </span>
              <h3 className="text-xl font-medium tracking-tight text-fg">
                Visual Identity
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted text-pretty">
              Concentric rotating 3D data coin reflecting verified personal captures. Click or hover to reveal the alternate capture; use the expand trigger to view in full resolution.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Dual Capture
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                3D Perspective
              </span>
            </div>
          </div>
        </div>
      </Panel>

      {/* Shared Lightbox */}
      {currentImage ? (
        <Lightbox
          open={isLightboxOpen}
          src={currentImage.src}
          alt={currentImage.alt}
          onClose={() => setIsLightboxOpen(false)}
          returnFocusTo={triggerRef}
        />
      ) : null}
    </SectionShell>
  )
}
