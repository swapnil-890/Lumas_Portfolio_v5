'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface TerminalLine {
  id: string;
  type: 'prompt' | 'output';
  content: string;
}

const TERMINAL_LINES: readonly TerminalLine[] = [
  { id: '1', type: 'prompt', content: 'boot --profile=lumas' },
  { id: '2', type: 'output', content: '> initializing workspace............ done' },
  { id: '3', type: 'output', content: '> loading context................... done' },
  { id: '4', type: 'output', content: '> checking systems.................. done' },
  { id: '5', type: 'output', content: '> status............................ active' },
  { id: '6', type: 'prompt', content: '' },
];

export function Terminal() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const lineVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' },
    },
  };

  return (
    <section className="mb-16" aria-label="Terminal telemetry">
      <div className="rounded-lg border border-border-soft bg-glass hover:border-border-strong hover:shadow-cyan-glow backdrop-blur-xl transition-all duration-300 overflow-hidden">
        {/* Mac-style Window Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-soft bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ef4444] inline-block opacity-85" />
            <span className="h-3 w-3 rounded-full bg-[#eab308] inline-block opacity-85" />
            <span className="h-3 w-3 rounded-full bg-[#22c55e] inline-block opacity-85" />
          </div>
          <span className="font-mono text-xs text-slate-400 select-none tracking-tight">
            lumas.sh — zsh
          </span>
          <div className="w-12" aria-hidden="true" />
        </div>

        {/* Terminal Monospace Content */}
        <motion.div
          className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {TERMINAL_LINES.map((line, idx) => (
            <motion.div
              key={line.id}
              variants={lineVariants}
              className="flex items-baseline gap-2 whitespace-pre-wrap break-words"
            >
              {line.type === 'prompt' ? (
                <>
                  <span className="text-cyan font-semibold select-none">$</span>
                  <span className="text-slate-200">{line.content}</span>
                  {idx === TERMINAL_LINES.length - 1 && (
                    <span
                      className={`inline-block h-3.5 w-1.5 bg-cyan align-middle ml-0.5 ${
                        shouldReduceMotion ? 'opacity-100' : 'animate-pulse'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </>
              ) : (
                <span className="text-slate-400 pl-3">{line.content}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
