import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import { personal } from '../data/personal'
import Lightbox, { type LightboxImage } from '../components/Lightbox'
import { UserIcon } from '../components/Icons'

export default function SectionPFP() {
  const { pfpImages, name } = personal
  const reduce = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const triggerBtnRef = useRef<HTMLButtonElement>(null)

  const hasImages = pfpImages && pfpImages.length > 0
  const currentImageSrc = hasImages ? pfpImages[activeIdx] : null

  const lightboxImages: LightboxImage[] = hasImages
    ? pfpImages.map((src, i) => ({
        src,
        alt: `Portrait of ${name} (${i + 1})`,
        title: `${name} — Profile Portrait ${i + 1}`,
      }))
    : []

  const handleOpenLightbox = () => {
    if (hasImages) {
      setIsLightboxOpen(true)
    }
  }

  return (
    <SectionShell id="pfp" number="02" eyebrow="PFP" title="Profile">
      <div className="grid gap-10 sm:grid-cols-[260px_minmax(0,1fr)] sm:items-center">
        {/* Instagram-inspired Profile Disc Container */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-52 w-52 items-center justify-center">
            {/* Elegant Rotating Accent Ring (~20s per rotation, linear) */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-accent/40"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={
                reduce
                  ? undefined
                  : {
                      repeat: Infinity,
                      ease: 'linear',
                      duration: 20,
                    }
              }
            />

            {/* Inner static border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-full border border-border bg-surface"
            />

            {/* Static Circular Profile Content (Image remains static) */}
            <button
              ref={triggerBtnRef}
              type="button"
              onClick={handleOpenLightbox}
              disabled={!hasImages}
              aria-label={hasImages ? `View ${name}'s portrait in fullscreen` : 'Profile placeholder - awaiting input'}
              className={`group relative z-10 flex h-44 w-44 overflow-hidden rounded-full border border-border bg-elevated transition-transform duration-200 ${
                hasImages ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : 'cursor-default'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
            >
              {currentImageSrc ? (
                <img
                  src={currentImageSrc}
                  alt={`Portrait of ${name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                  <UserIcon className="h-7 w-7 text-subtle" />
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
                    Awaiting input
                  </span>
                  <span className="font-mono text-[11px] text-subtle/70">
                    /images/pfp/
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Multiple Profile Image Dot Indicators */}
          {hasImages && pfpImages.length > 1 ? (
            <div className="mt-4 flex items-center gap-2">
              {pfpImages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Show portrait ${i + 1}`}
                  aria-current={i === activeIdx ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIdx ? 'w-5 bg-accent' : 'w-2 bg-border hover:bg-subtle'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {/* Narrative & Archival Placeholder Context */}
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-muted text-pretty">
            {hasImages
              ? 'Profile portraits rendered inside the archival circular disc. Click the disc to inspect full-resolution captures in the lightbox.'
              : 'No portrait has been provided. This slot is intentionally empty and will render verified photography the moment assets are dropped into the image layer.'}
          </p>
          <div className="rounded-md border border-border bg-surface p-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle space-y-1.5">
            <p className="text-fg">Target asset paths:</p>
            <p className="text-subtle">· public/images/pfp/main-01.jpg</p>
            <p className="text-subtle">· public/images/pfp/main-06.jpg</p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-subtle">
            {hasImages ? 'Interactive Lightbox Enabled' : 'Archival Placeholder · Not a representation'}
          </p>
        </div>
      </div>

      {/* Shared Lightbox Component */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={lightboxImages}
        currentIndex={activeIdx}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setActiveIdx(newIdx)}
        triggerRef={triggerBtnRef}
      />
    </SectionShell>
  )
}
