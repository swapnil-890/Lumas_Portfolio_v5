import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import Panel from '../components/Panel'
import { personal } from '../data/personal'
import Lightbox from '../components/Lightbox'

export default function SectionPFP() {
  const { profileImages } = personal
  const reduce = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const hasImages = profileImages && profileImages.length > 0
  const currentImage = hasImages ? profileImages[activeIdx] : null

  return (
    <SectionShell id="pfp" number="02" eyebrow="Identity" title="Profile Disc">
      <Panel brackets spotlight className="p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-12">
          {/* Concentric Rotating Disc Container (min 180px x 180px) */}
          <div className="flex flex-col items-center justify-center">
            <div className="group relative flex h-48 w-48 min-h-[180px] min-w-[180px] items-center justify-center sm:h-56 sm:w-56">
              {/* Outer Ring: Conic gradient, 22s linear rotation, 3px < 400px, 2px >= 400px */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full p-[3px] transition-[filter] duration-200 group-hover:brightness-125 min-[400px]:p-[2px]"
                style={{
                  background: 'conic-gradient(from 0deg, #4C8DFF, #2B5AA8, #4C8DFF)',
                }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={
                  reduce
                    ? undefined
                    : {
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 22,
                      }
                }
              >
                {/* 6px Middle gap of bg color */}
                <div className="h-full w-full rounded-full bg-bg" />
              </motion.div>

              {/* Inner Image Container (Static transform, scale 1.0 on hover) */}
              <button
                ref={triggerRef}
                type="button"
                onClick={() => {
                  if (hasImages) setIsLightboxOpen(true)
                }}
                disabled={!hasImages}
                aria-label={
                  hasImages
                    ? `Open ${currentImage?.alt} in lightbox`
                    : 'Profile image awaiting input'
                }
                className={`relative z-10 flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center overflow-hidden rounded-full border border-border bg-elevated transition-colors ${
                  hasImages
                    ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                    : 'cursor-default'
                }`}
                style={{ transform: 'none' }}
              >
                {currentImage ? (
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="h-full w-full rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-xs uppercase tracking-widest2 text-subtle">
                      AWAITING INPUT
                    </span>
                  </div>
                )}
              </button>
            </div>

            {/* Multiple Images Dot Indicators */}
            {hasImages && profileImages.length > 1 ? (
              <div className="mt-5 flex items-center gap-2">
                {profileImages.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Show ${img.alt}`}
                    aria-current={i === activeIdx ? 'true' : undefined}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIdx
                        ? 'w-5 bg-accent'
                        : 'w-2 bg-border hover:bg-subtle'
                    }`}
                  />
                ))}
              </div>
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
              Concentric rotating profile disc reflecting verified personal captures. Click the portrait to examine the full-resolution capture in the isolated lightbox.
            </p>
            <div className="rounded-md border border-border bg-surface p-3 font-mono text-[11px] uppercase tracking-widest2 text-subtle space-y-1">
              <p className="text-fg">Target asset paths:</p>
              <p className="text-subtle">· public/images/pfp/main-01.jpg</p>
              <p className="text-subtle">· public/images/pfp/main-02.jpg</p>
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
