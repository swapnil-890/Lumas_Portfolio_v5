import { useState, useRef, useEffect, type FormEvent } from 'react'
import { CloseIcon, ExternalLinkIcon } from './Icons'
import {
  findKnowledgeEntity,
  TOPIC_ENTITIES,
  LANGUAGE_ENTITIES,
  GAME_ENTITIES,
  PROJECT_ENTITIES,
  type KnowledgeEntity,
} from '../data/knowledge'

interface ChatResponse {
  readonly query: string
  readonly text: string
  readonly relatedEntities: readonly KnowledgeEntity[]
}

const STARTER_PROMPTS = [
  'Who is Lumas?',
  'What does he build?',
  'What does he study?',
  'What languages does he use?',
  'What games does he play?',
] as const

function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveQuery(rawQuery: string): ChatResponse {
  const norm = normalizeQuery(rawQuery)

  if (!norm) {
    return {
      query: rawQuery,
      text: 'Please enter a question about Lumas, his studies, technical stack, projects, or interests.',
      relatedEntities: [],
    }
  }

  // 1. Who are you
  if (norm.includes('who are you') || norm.includes('who is lumas') || norm === 'who' || norm.includes('tell me about yourself')) {
    return {
      query: rawQuery,
      text: 'Lumas (Swapnil Roy) is an AI & Data Science student. He approaches computing from first principles, focusing on how memory moves, signals propagate, and models compute rather than surface-level tutorials.',
      relatedEntities: [
        findKnowledgeEntity('ai-ml')!,
        findKnowledgeEntity('scientific-computing')!,
      ].filter(Boolean),
    }
  }

  // 2. What do you study
  if (norm.includes('study') || norm.includes('education') || norm.includes('degree') || norm.includes('college')) {
    return {
      query: rawQuery,
      text: 'Lumas is an AI & Data Science student. His academic and personal inquiry focuses on machine learning, scientific computing, robotics, and aerospace.',
      relatedEntities: TOPIC_ENTITIES.slice(0, 4),
    }
  }

  // 3. What are your interests / topics / exploration
  if (norm.includes('topic') || norm.includes('interest') || norm.includes('read') || norm.includes('curiosity') || norm.includes('explore')) {
    return {
      query: rawQuery,
      text: 'Lumas reads deeply across computing and the physical sciences, with particular attention to machine learning architectures, robotics, aerospace dynamics, quantum physics, and cosmology. You can explore these topics directly via the constellation and verified reference links.',
      relatedEntities: TOPIC_ENTITIES,
    }
  }

  // 4. Learning approach
  if (norm.includes('learning') || norm.includes('approach') || norm.includes('philosophy') || norm.includes('mindset') || norm.includes('first principle')) {
    return {
      query: rawQuery,
      text: 'His philosophy is building over claiming and depth over breadth. He aims to understand systems from first principles rather than reproduce pre-packaged recipes.',
      relatedEntities: [
        findKnowledgeEntity('tool-linux')!,
        findKnowledgeEntity('lang-c')!,
      ].filter(Boolean),
    }
  }

  // 5. Languages
  if (norm.includes('language') || norm.includes('programming') || norm.includes('code in') || norm.includes('coding')) {
    return {
      query: rawQuery,
      text: 'Lumas programs primarily in C, C++, Python, and SQL, spanning systems fundamentals, numerical experimentation, and data modeling.',
      relatedEntities: LANGUAGE_ENTITIES,
    }
  }

  // 6. Tools & Technologies
  if (norm.includes('tool') || norm.includes('tech') || norm.includes('stack') || norm.includes('ecosystem') || norm.includes('software')) {
    return {
      query: rawQuery,
      text: 'His working environment is Linux/Kali based, utilizing Docker, Git/GitHub, VS Code, Android Studio, PyTorch, Ollama for local model execution, Anaconda, ADB, and PowerShell.',
      relatedEntities: [
        findKnowledgeEntity('tool-linux')!,
        findKnowledgeEntity('tool-pytorch')!,
        findKnowledgeEntity('tool-ollama')!,
        findKnowledgeEntity('tool-docker')!,
      ].filter(Boolean),
    }
  }

  // 6b. Project Concepts
  if (norm.includes('concept') || norm.includes('idea')) {
    return {
      query: rawQuery,
      text: 'Lumas explores four early project concepts in Section 05: Bio-Inspired Ornithopter, Offline Crop-Disease Detection, River Water-Level Early Warning, and an Orbital Mechanics Simulator.',
      relatedEntities: [findKnowledgeEntity('proj-vovera')!, findKnowledgeEntity('proj-mini-rag')!].filter(Boolean),
    }
  }

  // 7. Projects (General)
  if (
    norm.includes('project') ||
    norm.includes('what do you build') ||
    norm.includes('what does he build') ||
    norm.includes('what are you building') ||
    norm.includes('what is he building') ||
    norm.includes('what do you work on') ||
    norm.includes('what does he work on') ||
    norm.includes('portfolio')
  ) {
    return {
      query: rawQuery,
      text: 'Lumas works on experimental projects: VOVERA™ (an edge voice-deepfake detection concept) and Mini RAG (a research-grade PDF question-answering retrieval system).',
      relatedEntities: PROJECT_ENTITIES,
    }
  }

  // 8. Specific Project: VOVERA
  if (norm.includes('vovera') || norm.includes('deepfake') || norm.includes('voice clone') || norm.includes('scam')) {
    return {
      query: rawQuery,
      text: 'VOVERA™ is an experimental edge-oriented security project exploring real-time detection of AI-generated voice cloning and deepfake scam calls (explored as a Smart India Hackathon 2026 concept).',
      relatedEntities: [findKnowledgeEntity('proj-vovera')!].filter(Boolean),
    }
  }

  // 9. Specific Project: Mini RAG
  if (norm.includes('rag') || norm.includes('mini rag') || norm.includes('pdf') || norm.includes('retrieval')) {
    return {
      query: rawQuery,
      text: 'Mini RAG is an experimental research direction exploring document chunking, embeddings, vector retrieval, and question-answering pipelines.',
      relatedEntities: [findKnowledgeEntity('proj-mini-rag')!].filter(Boolean),
    }
  }

  // 10. Specific Game: Tekken 8
  if (norm.includes('tekken')) {
    return {
      query: rawQuery,
      text: 'Tekken 8 is a premier 3D competitive fighting game Lumas plays. He values its frame-data depth, neutral movement, spacing, and the Heat offensive mechanics.',
      relatedEntities: [findKnowledgeEntity('game-tekken-8')!].filter(Boolean),
    }
  }

  // 11. Specific Game: Shadow Fight 3
  if (norm.includes('shadow fight')) {
    return {
      query: rawQuery,
      text: 'Shadow Fight 3 is a tactical fighting/action game featuring precision weapon combat, distinct martial factions, and timing-based execution.',
      relatedEntities: [findKnowledgeEntity('game-shadow-fight-3')!].filter(Boolean),
    }
  }

  // 12. Specific Game: Mortal Kombat
  if (norm.includes('mortal kombat') || norm.includes('mk')) {
    return {
      query: rawQuery,
      text: 'The Mortal Kombat series represents 2D competitive fighting built around high/low mixups, special move cancels, and neutral spacing.',
      relatedEntities: [findKnowledgeEntity('game-mortal-kombat')!].filter(Boolean),
    }
  }

  // 13. Specific Game: Injustice
  if (norm.includes('injustice')) {
    return {
      query: rawQuery,
      text: 'Injustice 1 & 2 are fighting games featuring DC Universe characters with unique character traits, stage interaction elements, and clash mechanics.',
      relatedEntities: [findKnowledgeEntity('game-injustice')!].filter(Boolean),
    }
  }

  // 14. Specific Game: Genshin Impact
  if (norm.includes('genshin')) {
    return {
      query: rawQuery,
      text: 'Genshin Impact is an Action RPG (not a fighting game) that Lumas explores for its elemental reaction synergies, team rotation mechanics, and world design.',
      relatedEntities: [findKnowledgeEntity('game-genshin')!].filter(Boolean),
    }
  }

  // 14b. Why Fighting Games
  if (norm.includes('why') && (norm.includes('fighting') || norm.includes('game') || norm.includes('like'))) {
    return {
      query: rawQuery,
      text: 'Lumas values fighting games for their deterministic frame data, immediate execution feedback, and neutral spacing—disciplines where timing and decision-making matter more than surface visuals.',
      relatedEntities: GAME_ENTITIES.filter((g) => g.subcategory?.includes('Fighting')),
    }
  }

  // 15. Fighting Games (General)
  if (norm.includes('fighting game') || norm.includes('fighting')) {
    return {
      query: rawQuery,
      text: 'Lumas focuses on fighting games: Tekken 8, Shadow Fight 3, Mortal Kombat series, and Injustice 1 & 2. He is drawn to the execution discipline, frame data, and neutral decision-making.',
      relatedEntities: GAME_ENTITIES.filter((g) => g.subcategory?.includes('Fighting')),
    }
  }

  // 16. All Games
  if (norm.includes('game') || norm.includes('gaming') || norm.includes('play')) {
    return {
      query: rawQuery,
      text: 'His gaming interests encompass fighting games (Tekken 8, Shadow Fight 3, Mortal Kombat, Injustice) as well as Action RPG mechanics (Genshin Impact).',
      relatedEntities: GAME_ENTITIES,
    }
  }

  // 17. Contact / Reaching out
  if (norm.includes('contact') || norm.includes('email') || norm.includes('reach') || norm.includes('message')) {
    return {
      query: rawQuery,
      text: 'You can reach Lumas via direct email (swapnilroymldt@gmail.com or cseai2026015@rcciit.edu.in), phone, WhatsApp, or through his public GitHub and LinkedIn profiles in Section 05.',
      relatedEntities: [],
    }
  }

  // 18. Default Honest Fallback
  return {
    query: rawQuery,
    text: "I only know what is included in Lumas' public profile data. Try asking about his studies, interests, stack, projects, topics, or games.",
    relatedEntities: [
      findKnowledgeEntity('ai-ml')!,
      findKnowledgeEntity('lang-python')!,
      findKnowledgeEntity('game-tekken-8')!,
    ].filter(Boolean),
  }
}

export default function AskLumas() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<readonly ChatResponse[]>([])
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', onGlobalKeyDown)
    return () => window.removeEventListener('keydown', onGlobalKeyDown)
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    triggerButtonRef.current?.focus()
  }

  const submitQuery = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    const res = resolveQuery(trimmed)
    setHistory((prev) => [...prev, res])
    setInputVal('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submitQuery(inputVal)
  }

  return (
    <div className="mt-6 border-t border-border pt-6">
      {!isOpen ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border bg-surface/80 p-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-accent">
              LOCAL QUERY INTERFACE
            </span>
            <p className="text-xs text-muted mt-1">
              Ask questions about Lumas&apos; studies, technical stack, projects, or interests.
            </p>
          </div>
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center justify-center gap-2 rounded border border-accent/40 bg-accent/10 px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest2 text-accent transition-all duration-150 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
            aria-label="Open Ask Lumas query console"
          >
            <span>Ask Lumas</span>
            <span aria-hidden="true" className="font-mono text-xs text-subtle">
              [CSR]
            </span>
          </button>
        </div>
      ) : (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Ask Lumas profile console"
          className="rounded-lg border border-border bg-surface p-4 sm:p-6 transition-opacity duration-150 motion-reduce:transition-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-fg font-medium">
                ASK LUMAS // QUERY CONSOLE
              </span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-7 w-7 items-center justify-center rounded border border-border bg-elevated text-subtle hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              aria-label="Close Ask Lumas console"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Starter Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => submitQuery(prompt)}
                className="rounded border border-border bg-elevated/70 px-2 py-1 font-mono text-[10px] text-muted hover:border-accent-dim hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* History / Messages */}
          <div
            className="mt-4 max-h-[320px] space-y-3.5 overflow-y-auto pr-1"
            tabIndex={0}
            role="log"
            aria-live="polite"
            aria-label="Query responses"
          >
            {history.length === 0 ? (
              <p className="font-mono text-xs text-subtle py-2">
                &gt; Deterministic local interface. Type a question or select a starter above.
              </p>
            ) : null}

            {history.map((item, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-accent/40 pl-3">
                <div className="font-mono text-xs text-accent">
                  &gt; {item.query}
                </div>
                <p className="text-xs leading-relaxed text-fg">
                  {item.text}
                </p>
                {item.relatedEntities.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.relatedEntities.map((ent) => (
                      ent.href ? (
                        <a
                          key={ent.id}
                          href={ent.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${ent.label} reference`}
                          className="inline-flex items-center gap-1 rounded border border-border/80 bg-elevated px-2 py-0.5 font-mono text-[10px] text-accent hover:border-accent-dim transition-colors"
                        >
                          <span>{ent.label}</span>
                          <ExternalLinkIcon className="h-2.5 w-2.5 opacity-70" />
                        </a>
                      ) : (
                        <span
                          key={ent.id}
                          className="rounded border border-border/60 bg-elevated/50 px-2 py-0.5 font-mono text-[10px] text-subtle"
                        >
                          {ent.label}
                        </span>
                      )
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2 border-t border-border pt-3">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about Lumas..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Ask about Lumas"
              className="w-full rounded border border-border bg-elevated px-3 py-1.5 font-mono text-xs text-fg placeholder:text-subtle focus:border-accent-dim focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              className="shrink-0 rounded border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              aria-label="Submit query"
            >
              ↵
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
