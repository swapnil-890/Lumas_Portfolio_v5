import SectionShell from '../components/SectionShell'
import SpotlightCard from '../components/SpotlightCard'
import { personal } from '../data/personal'
import { Brain, Cpu, Bot, Rocket, Terminal } from 'lucide-react'

const AREA_ICONS: Record<string, React.ReactNode> = {
  'AI / ML': <Brain className="h-4 w-4 text-accent" />,
  'Scientific Computing': <Cpu className="h-4 w-4 text-sky-400" />,
  Robotics: <Bot className="h-4 w-4 text-emerald-400" />,
  Aerospace: <Rocket className="h-4 w-4 text-amber-400" />,
}

export default function SectionWhoAmI() {
  return (
    <SectionShell id="who-am-i" number="03" eyebrow="Who Am I" title="On understanding systems">
      {/* Manifesto Callout */}
      <SpotlightCard className="p-6 sm:p-8 border-l-4 border-l-accent">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-accent mb-3">
          <Terminal className="h-3.5 w-3.5" />
          <span>Core Principle</span>
        </div>
        <p className="max-w-3xl text-balance text-xl font-medium leading-relaxed text-fg sm:text-2xl lg:text-3xl">
          &ldquo;I want to understand how systems actually work — not simply reproduce tutorials.&rdquo;
        </p>
      </SpotlightCard>

      {/* Explanatory Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        <SpotlightCard className="p-6 sm:p-7">
          <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-accent mb-3">
            01 / Physical & Digital Convergence
          </h3>
          <p className="text-sm leading-relaxed text-muted text-pretty">
            My interests sit where computing meets the physical sciences. Rather
            than collecting surface-level familiarity, I try to reach the point
            where a system&apos;s behaviour stops being a black box: how memory moves,
            how signals propagate, how a model arrives at an answer, how a
            physical process can be modelled and reproduced.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 sm:p-7">
          <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-accent mb-3">
            02 / Practical Exploration
          </h3>
          <p className="text-sm leading-relaxed text-muted text-pretty">
            That curiosity is practical. It shows up as experiments — on Linux,
            with local models, in small scripts that try to answer a question
            directly. Some of them become projects; most remain as notes. The
            common thread is a preference for depth over breadth, and for building
            over claiming.
          </p>
        </SpotlightCard>
      </div>

      {/* Focus Areas */}
      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-subtle">
          Primary Exploration Domains
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {personal.focusAreas.map((area) => (
            <li key={area}>
              <SpotlightCard className="flex flex-col items-center justify-center p-4 text-center transition-all hover:scale-[1.02]">
                <div className="mb-2 p-2 rounded-lg bg-elevated border border-border">
                  {AREA_ICONS[area] ?? <Terminal className="h-4 w-4 text-accent" />}
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-fg font-medium">
                  {area}
                </span>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
