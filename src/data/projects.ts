export type ProjectStatus =
  | 'BUILDING / EXPERIMENTAL'
  | 'PLANNING / EXPERIMENTAL'
  | 'IDEA'
  | 'ARCHIVED'

export interface Project {
  readonly id: string
  readonly name: string
  readonly shortName?: string
  readonly category: string
  readonly status: ProjectStatus
  readonly description: string
  readonly areas: readonly string[]
  readonly context?: string
  readonly disclaimer?: string
}

export const projects: readonly Project[] = [
  {
    id: 'vovera',
    name: 'VOVERA™',
    category: 'AI / Security / Android / Experimental',
    status: 'BUILDING / EXPERIMENTAL',
    description:
      'An experimental edge-oriented security system exploring real-time detection of AI-generated voice cloning and deepfake scam calls.',
    areas: [
      'Audio analysis',
      'DSP concepts',
      'AI voice detection',
      'Scam-language analysis',
      'Risk scoring',
      'Android',
      'Backend architecture',
    ],
    context: 'Explored as a Smart India Hackathon 2026 project.',
    disclaimer:
      'No claims of accuracy, deployment, validation, awards, or production readiness.',
  },
  {
    id: 'mini-rag',
    name: 'Research-Grade PDF Question Answering System',
    shortName: 'Mini RAG',
    category: 'AI / Retrieval / Experimental',
    status: 'PLANNING / EXPERIMENTAL',
    description:
      'An experimental research direction exploring document processing, retrieval, embeddings, and question answering.',
    areas: [
      'Python',
      'RAG',
      'Document processing',
      'Embeddings',
      'Retrieval',
      'Question answering',
      'APIs',
      'Linux',
      'Git / GitHub',
    ],
    disclaimer: 'In planning. No completion, accuracy, or deployment claims.',
  },
]
