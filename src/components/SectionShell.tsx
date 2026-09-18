import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  number: string
  title: string
  eyebrow?: string
  children: ReactNode
}

export default function SectionShell({
  id,
  number,
  title,
  eyebrow,
  children,
}: SectionShellProps) {
  const reduce = useReducedMotion()

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-20 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-10"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <header className="mb-10 sm:mb-14">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="font-mono text-[11px] tracking-widest2 text-accent">
              {number}
            </span>
            {eyebrow ? (
              <span className="font-mono text-[11px] tracking-widest2 text-subtle uppercase">
                {eyebrow}
              </span>
            ) : null}
          </div>
          <div className="mt-3 h-px w-full bg-border" aria-hidden="true" />
          <h2
            id={`${id}-title`}
            className="mt-6 text-balance text-2xl font-medium tracking-tight text-fg sm:text-3xl"
          >
            {title}
          </h2>
        </header>
        <div className="space-y-10">{children}</div>
      </motion.div>
    </section>
  )
}
