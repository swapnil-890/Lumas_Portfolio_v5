import SectionShell from '../components/SectionShell'
import { personal } from '../data/personal'

export default function SectionWhoAmI() {
  return (
    <SectionShell id="who-am-i" number="03" eyebrow="Who Am I" title="On understanding systems">
      <p className="max-w-3xl text-balance text-lg leading-relaxed text-fg sm:text-xl font-medium">
        &ldquo;{personal.mindset}&rdquo;
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <p className="text-sm leading-relaxed text-muted text-pretty">
          My interests sit where computing meets the physical sciences. Rather
          than collecting surface-level familiarity, I try to reach the point
          where a system&apos;s behaviour stops being a black box: how memory moves,
          how signals propagate, how a model arrives at an answer, how a
          physical process can be modelled and reproduced.
        </p>
        <p className="text-sm leading-relaxed text-muted text-pretty">
          That curiosity is practical. It shows up as experiments — on Linux,
          with local models, in small scripts that try to answer a question
          directly. Some of them become projects; most remain as notes. The
          common thread is a preference for depth over breadth, systems thinking,
          and building over claiming.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {personal.focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-md border border-border bg-surface px-3 py-3 text-center font-mono text-[11px] uppercase tracking-widest2 text-muted"
          >
            {area}
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
