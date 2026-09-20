// src/data/stack.ts
// Source-backed technical stack and classified ecosystem
import type { StackItem } from './types';

export const stack = [
  // Languages (Linked to verified GeeksforGeeks resources per datasheet)
  {
    id: 'python',
    name: 'Python',
    category: 'LANGUAGES',
    context: 'Core research language: VOVERA, Core-7',
    resource: {
      label: 'Python Documentation',
      href: 'https://www.geeksforgeeks.org/python-programming-language-tutorial/',
      kind: 'reference',
    },
  },
  {
    id: 'c',
    name: 'C',
    category: 'LANGUAGES',
    context: 'Low-level systems and embedded computing',
    resource: {
      label: 'C Reference',
      href: 'https://www.geeksforgeeks.org/c-programming-language/',
      kind: 'reference',
    },
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'LANGUAGES',
    context: 'High-performance computing and robotics control',
    resource: {
      label: 'C++ Reference',
      href: 'https://www.geeksforgeeks.org/c-plus-plus/',
      kind: 'reference',
    },
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'LANGUAGES',
    context: 'Relational data modeling and analytics',
    resource: {
      label: 'SQL Tutorial',
      href: 'https://www.geeksforgeeks.org/sql-tutorial/',
      kind: 'reference',
    },
  },

  // AI / ML
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI_ML',
    context: 'Deep learning model experimentation and neural audio pipelines',
    resource: {
      label: 'PyTorch Docs',
      href: 'https://pytorch.org/docs/',
      kind: 'docs',
    },
  },
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'AI_ML',
    context: 'Local model orchestration and inference runtime',
    resource: {
      label: 'Ollama Portal',
      href: 'https://ollama.com/',
      kind: 'docs',
    },
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    category: 'AI_ML',
    context: 'Vector embedding storage for Core-7 retrieval pipeline',
  },
  {
    id: 'sentence-transformers',
    name: 'sentence-transformers',
    category: 'AI_ML',
    context: 'Dense semantic document embeddings and similarity calculation',
  },
  {
    id: 'librosa',
    name: 'Librosa',
    category: 'AI_ML',
    context: 'Digital signal processing and audio feature extraction in VOVERA',
  },

  // Frameworks
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'FRAMEWORKS',
    context: 'High-throughput asynchronous microservices for VOVERA and Core-7',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'FRAMEWORKS',
    context: 'Embedded ACID-compliant event storage and audit logs',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'FRAMEWORKS',
    context: 'App Router architecture and static MDX rendering',
  },

  // Systems & Tooling (Linked to official developer documentation)
  {
    id: 'linux',
    name: 'Linux / Kali',
    category: 'SYSTEMS',
    context: 'Primary development and security analysis environment',
    resource: {
      label: 'Kali Linux Docs',
      href: 'https://www.kali.org/docs/',
      kind: 'docs',
    },
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'TOOLING',
    context: 'Containerization and reproducible pipeline deployment',
    resource: {
      label: 'Docker Docs',
      href: 'https://docs.docker.com/',
      kind: 'docs',
    },
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'TOOLING',
    context: 'Version control and distributed collaboration',
    resource: {
      label: 'Git Documentation',
      href: 'https://git-scm.com/doc',
      kind: 'docs',
    },
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'TOOLING',
    context: 'Primary development editor and debug environment',
    resource: {
      label: 'VS Code Documentation',
      href: 'https://code.visualstudio.com/docs',
      kind: 'docs',
    },
  },
  {
    id: 'android-studio',
    name: 'Android Studio',
    category: 'TOOLING',
    context: 'Mobile client development and edge deployment testing',
    resource: {
      label: 'Android Studio Developers',
      href: 'https://developer.android.com/studio',
      kind: 'docs',
    },
  },
  {
    id: 'adb',
    name: 'ADB',
    category: 'TOOLING',
    context: 'Android Debug Bridge for device telemetry and inspection',
    resource: {
      label: 'ADB Reference',
      href: 'https://developer.android.com/tools/adb',
      kind: 'docs',
    },
  },
  {
    id: 'powershell',
    name: 'PowerShell',
    category: 'TOOLING',
    context: 'Windows automation and system administration',
    resource: {
      label: 'PowerShell Documentation',
      href: 'https://learn.microsoft.com/powershell/',
      kind: 'docs',
    },
  },
  {
    id: 'anaconda',
    name: 'Anaconda',
    category: 'TOOLING',
    context: 'Isolated scientific computing environments and package control',
    resource: {
      label: 'Anaconda Docs',
      href: 'https://docs.anaconda.com/',
      kind: 'docs',
    },
  },

  // Hardware & Design
  {
    id: 'fusion360',
    name: 'Fusion 360',
    category: 'HARDWARE_GPU',
    context: 'Parametric CAD modeling for Steel Raven airframe and brackets',
  },
  {
    id: 'cfrp',
    name: 'CFRP Fabrication',
    category: 'HARDWARE_GPU',
    context: 'Carbon-fiber reinforced polymer structural design for UAVs',
  },
  {
    id: '3dprinting',
    name: '3D Prototyping',
    category: 'HARDWARE_GPU',
    context: 'Rapid iterative additive manufacturing for mechanical joints',
  },
] as const satisfies readonly StackItem[];

export type StackId = (typeof stack)[number]['id'];
