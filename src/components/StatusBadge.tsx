interface StatusBadgeProps {
  label: string
  tone?: 'neutral' | 'accent' | 'muted'
}

const TONE: Record<NonNullable<StatusBadgeProps['tone']>, { badge: string; dot: string; pulse?: string }> = {
  neutral: {
    badge: 'border-border bg-surface/80 text-muted shadow-sm',
    dot: 'bg-subtle',
  },
  accent: {
    badge: 'border-accent-dim/60 bg-accent/10 text-accent shadow-[0_0_12px_rgba(76,141,255,0.15)]',
    dot: 'bg-accent',
    pulse: 'bg-accent/40',
  },
  muted: {
    badge: 'border-border/60 bg-surface/40 text-subtle',
    dot: 'bg-subtle/70',
  },
}

export default function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  const currentTone = TONE[tone]

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest2 uppercase backdrop-blur-sm transition-colors ${currentTone.badge}`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        {currentTone.pulse ? (
          <span
            aria-hidden="true"
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${currentTone.pulse}`}
          />
        ) : null}
        <span
          aria-hidden="true"
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${currentTone.dot}`}
        />
      </span>
      {label}
    </span>
  )
}
