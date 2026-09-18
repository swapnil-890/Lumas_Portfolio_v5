import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons'

export interface LightboxImage {
  src: string
  alt: string
  title?: string
}

interface LightboxProps {
  isOpen: boolean
  images: readonly LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate?: (newIndex: number) => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
  triggerRef,
}: LightboxProps) {
  const reduce = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const lastActiveElRef = useRef<HTMLElement | null>(null)

  const activeImage = images[currentIndex]
  const hasMultiple = images.length > 1

  // Handle previous focus restoration and body scroll lock
  useEffect(() => {
    if (isOpen) {
      lastActiveElRef.current = (triggerRef?.current ?? document.activeElement) as HTMLElement | null
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      // Focus close button on open
      setTimeout(() => {
        closeBtnRef.current?.focus()
      }, 50)

      return () => {
        document.body.style.overflow = originalOverflow
        if (lastActiveElRef.current && typeof lastActiveElRef.current.focus === 'function') {
          lastActiveElRef.current.focus()
        }
      }
    }
  }, [isOpen, triggerRef])

  const goPrev = useCallback(() => {
    if (hasMultiple && onNavigate) {
      onNavigate((currentIndex - 1 + images.length) % images.length)
    }
  }, [currentIndex, hasMultiple, images.length, onNavigate])

  const goNext = useCallback(() => {
    if (hasMultiple && onNavigate) {
      onNavigate((currentIndex + 1) % images.length)
    }
  }, [currentIndex, hasMultiple, images.length, onNavigate])

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (hasMultiple) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goPrev()
          return
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          goNext()
          return
        }
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, hasMultiple, goPrev, goNext, onClose])

  return (
    <AnimatePresence>
      {isOpen && activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title ?? activeImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          ref={modalRef}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Close button */}
          <button
            type="button"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close image lightbox"
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-fg hover:bg-elevated hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {/* Previous / Next buttons */}
          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-fg hover:bg-elevated hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-fg hover:bg-elevated hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </>
          ) : null}

          {/* Image & Caption Container */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.95 }}
            transition={{ duration: reduce ? 0.01 : 0.25 }}
            className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[82vh] max-w-[90vw] rounded-lg border border-border object-contain shadow-2xl"
            />
            {activeImage.title ? (
              <p className="mt-3 text-center font-mono text-[11px] tracking-widest2 text-muted uppercase">
                {activeImage.title}
                {hasMultiple ? ` (${currentIndex + 1} / ${images.length})` : ''}
              </p>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
