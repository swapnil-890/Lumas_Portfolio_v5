interface SectionIndicatorProps {
  current: number
  total: number
}

export default function SectionIndicator({ current, total }: SectionIndicatorProps) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const progressPercent = total > 0 ? (current / total) * 100 : 0
  const circumference = 2 * Math.PI * 10 // radius 10
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 right-5 z-40 select-none flex items-center gap-3 rounded-full border border-border/80 bg-surface/85 px-3.5 py-1.5 font-mono text-[11px] tracking-widest2 text-muted backdrop-blur-md shadow-lg shadow-black/40 sm:bottom-6 sm:right-6"
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        <svg className="h-5 w-5 -rotate-90" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-border"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-accent transition-all duration-300 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
      </div>

      <div className="flex items-center">
        <span className="font-semibold text-fg">{pad(current)}</span>
        <span className="mx-1 text-subtle">/</span>
        <span>{pad(total)}</span>
      </div>

      <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-border/60 text-[9px] text-subtle">
        <kbd className="rounded border border-border bg-elevated px-1 py-0.5">↓</kbd>
        <kbd className="rounded border border-border bg-elevated px-1 py-0.5">↑</kbd>
      </div>
    </div>
  )
}
