interface StatusBadgeProps {
  label: string
  tone?: 'neutral' | 'accent' | 'muted'
}

const TONE: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'border-border text-muted',
  accent: 'border-accent-dim text-accent',
  muted: 'border-border text-subtle',
}

export default function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-widest2 uppercase ${TONE[tone]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          tone === 'accent' ? 'bg-accent' : 'bg-subtle'
        }`}
      />
      {label}
    </span>
  )
}
