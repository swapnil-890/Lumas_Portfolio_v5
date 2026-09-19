import SectionShell from '../components/SectionShell'
import { personal } from '../data/personal'

interface NodePoint {
  readonly x: number
  readonly y: number
}

// 4-tuple anchor constants guaranteeing 1:1 mapping with the 4 focus areas
const CORE: NodePoint = { x: 50, y: 2 }
const PILL_ANCHORS_ROW: readonly [NodePoint, NodePoint, NodePoint, NodePoint] = [
  { x: 12.5, y: 28 },
  { x: 37.5, y: 28 },
  { x: 62.5, y: 28 },
  { x: 87.5, y: 28 },
]

export default function SectionWhoAmI() {
  return (
    <SectionShell id="who-am-i" number="03" eyebrow="Who Am I" title="On understanding systems">
      <p className="max-w-3xl text-balance text-lg leading-relaxed text-fg sm:text-xl font-medium">
        &ldquo;{personal.mindset}&rdquo;
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <p className="text-sm leading-relaxed text-muted text-pretty">
          My work sits at the intersection of computing and the physical sciences. Rather than settling for surface-level familiarity, I aim to open the black box: how memory moves, how signals propagate, how a model reaches its answer, and how a physical process can be modelled and reproduced.
        </p>
        <p className="text-sm leading-relaxed text-muted text-pretty">
          That curiosity is hands-on. It takes the form of experiments — on Linux, with locally run models, and in small scripts written to answer a single question directly. Some grow into projects; many remain as working notes. The common thread is a preference for depth over breadth, systems thinking, and building over claiming.
        </p>
      </div>

      {/* 03-A: Data-cluster constellation */}
      <div className="pt-2">
        <div className="flex flex-col items-center">
          {/* Static AI_CORE Hub Node */}
          <div className="inline-flex items-center gap-1.5 rounded border border-accent/40 bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>AI_CORE</span>
          </div>

          {/* Precomputed SVG connector lines (sm and up) */}
          <div className="hidden sm:block w-full h-8 max-w-4xl" aria-hidden="true">
            <svg
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {PILL_ANCHORS_ROW.map((anchor, idx) => (
                <line
                  key={idx}
                  x1={CORE.x}
                  y1={CORE.y}
                  x2={anchor.x}
                  y2={anchor.y}
                  className="stroke-accent/30"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          {/* Mobile vertical trunk line (< sm) */}
          <div
            className="sm:hidden w-px h-5 bg-accent/35 my-1"
            aria-hidden="true"
          />
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
      </div>
    </SectionShell>
  )
}
