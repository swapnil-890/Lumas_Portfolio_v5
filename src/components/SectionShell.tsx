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
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <header className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-semibold tracking-widest2 text-accent border border-accent/20">
              {number}
            </span>
            {eyebrow ? (
              <span className="font-mono text-[11px] tracking-widest2 text-subtle uppercase">
                {eyebrow}
              </span>
            ) : null}
          </div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-accent/30 via-border to-border/40" aria-hidden="true" />
          <h2
            id={`${id}-title`}
            className="mt-6 text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-4xl"
          >
            {title}
          </h2>
        </header>
        <div className="space-y-10">{children}</div>
      </motion.div>
    </section>
  )
}
