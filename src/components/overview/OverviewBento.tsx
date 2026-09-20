// src/components/overview/OverviewBento.tsx
// Section 01 — Overview / Telemetry Core Bento Grid (§15.6, §17.1)
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardTitle, ChipRow, Chip } from '@/components/ui/Card';
import { IstClock } from './IstClock';

export function OverviewBento() {
  return (
    <section id="overview" className="scroll-mt-24 mb-16" aria-label="Overview and telemetry">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <span className="font-mono text-xs text-accent tracking-widest" aria-hidden="true">
          01 //
        </span>
        <h2 className="font-mono text-xs uppercase tracking-widest text-fg-dim font-medium">
          OVERVIEW & TELEMETRY
        </h2>
      </div>

      {/* Bento Grid: 12-column layout on lg, 6-column on md, 1-column on sm */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {/* PRIMARY HERO CARD (lg: cols 1–7) */}
        <Card className="md:col-span-6 lg:col-span-7 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-accent uppercase">
                  SYS // IDENTITY & CONTEXT
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-fg tracking-tight">
                    Swapnil Roy
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded border border-border bg-bg/80 text-fg-dim">
                    Lumas
                  </span>
                </div>
              </div>

              {/* Verified Profile Photo with explicit dimensions & high priority */}
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border border-border shrink-0">
                <Image
                  src="/images/pfp/main-01.jpg"
                  alt="Swapnil Roy profile portrait"
                  width={64}
                  height={64}
                  priority
                  className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* The single <h1> on the entire page (§17.1, Decision D3) */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-fg tracking-tight leading-snug mt-2">
              EXPLORING AI/ML, ROBOTICS, AND PHYSICAL COMPUTING AT FIRST PRINCIPLES.
            </h1>

            <p className="text-sm text-fg-dim leading-relaxed mt-3">
              AI & Data Science student focusing on secure intelligent architectures, high-performance
              retrieval pipelines, and biomimetic mechanical systems. Connecting computational logic with
              physical engineering.
            </p>
          </div>

          <div className="pt-4 mt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-fg-muted">
            <div>
              <span className="text-fg-dim">AFFILIATION:</span> RCCIIT · Kolkata
            </div>
            <div>
              <span className="text-fg-dim">LOCATION:</span> India (IST)
            </div>
          </div>
        </Card>

        {/* TELEMETRY CARD (lg: cols 8–12) */}
        <Card className="md:col-span-3 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                LUMAS LOCAL TIME · IST
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-signal uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" aria-hidden="true" />
                NOMINAL
              </span>
            </div>

            <div className="py-2">
              <IstClock />
            </div>

            <div className="space-y-2 mt-3 pt-3 border-t border-border/60 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-fg-muted">CURRENT STATE</span>
                <span className="text-fg">EXPLORING</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">METHODOLOGY</span>
                <span className="text-fg">FIRST PRINCIPLES</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">PRIMARY FOCUS</span>
                <span className="text-fg truncate max-w-[170px] text-right">
                  AI Security · Robotics
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-fg-muted mt-4 pt-2 border-t border-border/40">
            Telemetry represents local profile state, not infrastructure health.
          </p>
        </Card>

        {/* CORE VECTORS CARD (lg: cols 1–7) */}
        <Card className="md:col-span-6 lg:col-span-7">
          <CardTitle as="h3" className="text-sm font-mono uppercase tracking-wider text-fg-dim mb-3">
            Core Inquiry Vectors
          </CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <Link
              href="#systems"
              className="p-3 rounded border border-border bg-bg/40 hover:border-accent/40 transition-colors group block"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-accent">01 // AI / ML</span>
                <span className="text-fg-muted group-hover:text-accent">→</span>
              </div>
              <p className="text-xs text-fg-dim leading-relaxed">
                Voice synthesis attack detection (VOVERA) and guardrailed document retrieval (Core-7).
              </p>
            </Link>

            <Link
              href="#lab"
              className="p-3 rounded border border-border bg-bg/40 hover:border-accent/40 transition-colors group block"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-accent">02 // ROBOTICS</span>
                <span className="text-fg-muted group-hover:text-accent">→</span>
              </div>
              <p className="text-xs text-fg-dim leading-relaxed">
                Biomimetic kinematics, avian wing articulation, and lightweight composite UAV frames (Steel Raven).
              </p>
            </Link>

            <div className="p-3 rounded border border-border bg-bg/40">
              <span className="text-xs font-mono text-accent block mb-1">03 // COMPUTATION</span>
              <p className="text-xs text-fg-dim leading-relaxed">
                Scientific algorithms, symbolic calculus exploration, and environmental microclimate sensor arrays.
              </p>
            </div>

            <Link
              href="#stack"
              className="p-3 rounded border border-border bg-bg/40 hover:border-accent/40 transition-colors group block"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-accent">04 // SYSTEMS</span>
                <span className="text-fg-muted group-hover:text-accent">→</span>
              </div>
              <p className="text-xs text-fg-dim leading-relaxed">
                Linux kernel environments, reproducible Docker pipelines, and low-latency asynchronous microservices.
              </p>
            </Link>
          </div>
        </Card>

        {/* OPERATING PHILOSOPHY & DISCIPLINE (lg: cols 8–12) */}
        <Card className="md:col-span-3 lg:col-span-5 flex flex-col justify-between">
          <div>
            <CardTitle as="h3" className="text-sm font-mono uppercase tracking-wider text-fg-dim mb-3">
              Operating Principles
            </CardTitle>
            <blockquote className="text-xs sm:text-sm text-fg-dim leading-relaxed italic border-l-2 border-accent pl-3 py-1 bg-bg/30 rounded-r">
              &ldquo;Understanding systems deeply rather than blindly copying tutorials. Depth over breadth;
              empirical verification over ungrounded claims.&rdquo;
            </blockquote>

            <div className="mt-4 pt-3 border-t border-border">
              <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider block mb-2">
                Discipline & Game Analysis
              </span>
              <ChipRow>
                <Chip label="Tekken 8 (Frame Data)" />
                <Chip label="Shadow Fight 3" />
                <Chip label="Mortal Kombat" />
                <Chip label="Genshin Impact (Action RPG)" />
              </ChipRow>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/40 text-right">
            <Link
              href="/off-duty"
              className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Non-Engineering Profile</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
