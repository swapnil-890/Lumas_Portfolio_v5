// src/data/systems.ts
// Primary engineering proof layer — software systems
import type { SystemEntity } from './types';
import type { StackId } from './stack';

export const systems = [
  {
    id: 'vovera',
    code: 'SYS-01',
    name: 'VOVERA™',
    tagline: 'Real-Time Voice Attack Detection Pipeline',
    status: 'EXPERIMENTAL',
    visibility: 'PRIVATE', // Private repository — no external GitHub link per operator requirement
    caseStudySlug: '/work/vovera',
    domains: ['AI Security', 'Audio DSP', 'Voice Synthesis Analysis', 'Scam Mitigation'],
    summary:
      'Edge-oriented security pipeline exploring real-time detection of AI-synthesized and deepfake voice-cloning scam calls. Ingests streaming audio, extracts spectral acoustic features, and executes low-latency classification.',
    stackIds: ['python', 'fastapi', 'sqlite', 'librosa', 'pytorch'],
    capabilities: [
      'Sub-500ms audio stream processing window',
      'Spectral feature extraction and artifact profiling',
      'Deterministic risk scoring engine with confidence thresholds',
      'Tamper-evident local SQLite audit logging',
    ],
    architecture: [
      { id: 'ingest', label: 'Audio Ingestion & Chunking' },
      { id: 'dsp', label: 'Librosa DSP Feature Extraction' },
      { id: 'eval', label: 'Synthetic Artifact Classifier' },
      { id: 'score', label: 'Risk Scoring & Policy Dispatch' },
      { id: 'log', label: 'Tamper-Evident Audit Ledger' },
    ],
  },
  {
    id: 'core7',
    code: 'SYS-02',
    name: 'Core-7',
    tagline: 'Mini RAG Pipeline with Guardrail Middleware',
    status: 'EXPERIMENTAL',
    visibility: 'PRIVATE', // Private repository — no external GitHub link per operator requirement
    caseStudySlug: '/work/core7',
    domains: ['Retrieval-Augmented Generation', 'Vector Databases', 'Semantic Search', 'AI Guardrails'],
    summary:
      'Deterministic Mini RAG system combining context-preserving document chunking, dense vector similarity retrieval via ChromaDB, and defensive guardrail middleware to prevent prompt extraction and out-of-scope halluncinations.',
    stackIds: ['python', 'fastapi', 'chromadb', 'sentence-transformers', 'sqlite'],
    capabilities: [
      'Structural sliding-window chunking with metadata preservation',
      'Dense embedding generation using local sentence-transformers',
      'Policy-enforced guardrail middleware before generation dispatch',
      'Sub-150ms P99 retrieval latency over technical corpora',
    ],
    architecture: [
      { id: 'chunk', label: 'Document Tokenization & Chunking' },
      { id: 'embed', label: 'Dense Vector Embedding' },
      { id: 'store', label: 'ChromaDB Proximity Indexing' },
      { id: 'guard', label: 'Guardrail Policy Verification' },
      { id: 'dispatch', label: 'Deterministic Context Assembly' },
    ],
  },
] as const satisfies readonly SystemEntity<StackId>[];
