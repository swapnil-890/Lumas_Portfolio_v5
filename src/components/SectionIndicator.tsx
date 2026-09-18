interface SectionIndicatorProps {
  current: number
  total: number
}

export default function SectionIndicator({ current, total }: SectionIndicatorProps) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 right-4 z-40 select-none rounded-full border border-border/80 bg-bg/70 px-3 py-1.5 font-mono text-[11px] tracking-widest2 text-muted backdrop-blur sm:bottom-6 sm:right-6"
    >
      <span className="text-fg">{pad(current)}</span>
      <span className="mx-1 text-subtle">/</span>
      <span>{pad(total)}</span>
    </div>
  )
}
