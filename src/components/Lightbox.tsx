import { useEffect, useRef, type RefObject } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CloseIcon } from './Icons'

export interface LightboxProps {
  open: boolean
  src: string
  alt: string
  onClose: () => void
  returnFocusTo?: RefObject<HTMLElement | null>
}

export default function Lightbox({
  open,
  src,
  alt,
  onClose,
  returnFocusTo,
}: LightboxProps) {
  const reduce = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Manage body scroll lock and focus restoration
  useEffect(() => {
    if (open) {
      previousActiveElement.current =
        returnFocusTo?.current ?? (document.activeElement as HTMLElement | null)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      // Focus close button on mount
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })

      return () => {
        document.body.style.overflow = originalOverflow
        if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [open, returnFocusTo])

  // Key listener & focus trap
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

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
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && src ? (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Visually-hidden accessible dialog title */}
          <h2 id="lightbox-title" className="sr-only">
            {alt || 'Image lightbox'}
          </h2>

          {/* Backdrop: rgba(9,10,15,0.94) + backdrop-blur 8px */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-[#090A0F]/94 backdrop-blur-[8px]"
          />

          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-fg hover:border-border-hi hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {/* Centered Image: max 90vw / 90vh, object-fit: contain, rounded-md, 1px border */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-md border border-border object-contain shadow-2xl"
            />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
