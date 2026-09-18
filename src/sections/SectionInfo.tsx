import { useEffect, useState } from 'react'
import SectionShell from '../components/SectionShell'
import SpotlightCard from '../components/SpotlightCard'
import { personal } from '../data/personal'
import { Sparkles, Heart, Gamepad2, Ban, Clock, MapPin } from 'lucide-react'

export default function SectionInfo() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
        setCurrentTime(timeStr)
      } catch {
        setCurrentTime('00:00:00')
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <SectionShell id="info" number="01" eyebrow="Info" title="Identity">
      {/* Hero Header Card */}
      <SpotlightCard className="p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-dim/40 bg-accent/10 px-3 py-1 font-mono text-[11px] font-medium tracking-widest2 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              AVAILABLE FOR RESEARCH & COLLABORATION
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-6xl lg:text-7xl">
              {personal.name}
            </h1>
            <p className="text-base font-normal text-muted sm:text-lg">
              {personal.role}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <dl className="grid grid-cols-3 gap-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle sm:gap-6 sm:justify-items-end">
              <div className="rounded-lg border border-border/80 bg-elevated/70 p-2.5 text-center sm:text-right">
                <dt className="text-subtle text-[10px]">Age</dt>
                <dd className="mt-1 font-semibold text-fg">{personal.age}</dd>
              </div>
              <div className="rounded-lg border border-border/80 bg-elevated/70 p-2.5 text-center sm:text-right">
                <dt className="text-subtle text-[10px]">Gender</dt>
                <dd className="mt-1 font-semibold text-fg">{personal.gender}</dd>
              </div>
              <div className="rounded-lg border border-border/80 bg-elevated/70 p-2.5 text-center sm:text-right">
                <dt className="text-subtle text-[10px]">Timezone</dt>
                <dd className="mt-1 font-semibold text-fg">IST</dd>
              </div>
            </dl>

            <div className="flex items-center gap-3 font-mono text-[11px] text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-accent" />
                <span className="text-fg font-medium">{currentTime || 'IST'}</span>
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-subtle" />
                UTC+5:30
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Grid of Interests, Likes, Games, Dislikes */}
      <div className="grid gap-6 sm:grid-cols-2">
        <SpotlightCard className="p-5 sm:p-6">
          <Field
            icon={<Sparkles className="h-4 w-4 text-accent" />}
            label="Interests"
            items={personal.interests}
          />
        </SpotlightCard>

        <SpotlightCard className="p-5 sm:p-6">
          <Field
            icon={<Heart className="h-4 w-4 text-rose-400" />}
            label="Likes"
            items={personal.likes}
          />
        </SpotlightCard>

        <SpotlightCard className="p-5 sm:p-6">
          <Field
            icon={<Gamepad2 className="h-4 w-4 text-indigo-400" />}
            label="Games"
            items={personal.games}
          />
        </SpotlightCard>

        <SpotlightCard className="p-5 sm:p-6">
          <Field
            icon={<Ban className="h-4 w-4 text-subtle" />}
            label="Dislikes"
            items={personal.dislikes}
            muted
          />
        </SpotlightCard>
      </div>
    </SectionShell>
  )
}

function Field({
  icon,
  label,
  items,
  muted = false,
}: {
  icon?: React.ReactNode
  label: string
  items: readonly string[]
  muted?: boolean
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest2 text-subtle">
        {icon}
        <span>{label}</span>
      </div>
      <ul className={`space-y-2 text-sm ${muted ? 'text-muted' : 'text-fg'}`}>
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-2.5 transition-colors hover:text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-dim/60 shrink-0 self-center" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
