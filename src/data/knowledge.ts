export type KnowledgeCategory = 'topic' | 'language' | 'tool' | 'project' | 'game'
export type ResourceType = 'wikipedia' | 'gfg' | 'docs' | 'official'

export interface KnowledgeEntity {
  readonly id: string
  readonly label: string
  readonly category: KnowledgeCategory
  readonly subcategory?: string
  readonly href?: string
  readonly resourceType?: ResourceType
  readonly summary: string
  readonly tags?: readonly string[]
}

export const KNOWLEDGE_ENTITIES: readonly KnowledgeEntity[] = [
  // Topics & Focus Areas
  {
    id: 'ai-ml',
    label: 'AI / ML',
    category: 'topic',
    subcategory: 'Core Focus',
    href: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    resourceType: 'wikipedia',
    summary: 'Artificial intelligence and machine learning architectures, statistical learning, and neural models.',
    tags: ['AI', 'Machine Learning', 'Neural Networks'],
  },
  {
    id: 'scientific-computing',
    label: 'Scientific Computing',
    category: 'topic',
    subcategory: 'Core Focus',
    href: 'https://en.wikipedia.org/wiki/Computational_science',
    resourceType: 'wikipedia',
    summary: 'Mathematical modeling, numerical simulations, and quantitative algorithms for scientific problems.',
    tags: ['Simulation', 'Math', 'Physics'],
  },
  {
    id: 'robotics',
    label: 'Robotics',
    category: 'topic',
    subcategory: 'Core Focus',
    href: 'https://en.wikipedia.org/wiki/Robotics',
    resourceType: 'wikipedia',
    summary: 'Autonomous physical systems, embedded controllers, kinematics, and sensor integration.',
    tags: ['Hardware', 'Control', 'Sensors'],
  },
  {
    id: 'aerospace',
    label: 'Aerospace',
    category: 'topic',
    subcategory: 'Core Focus',
    href: 'https://en.wikipedia.org/wiki/Aerospace',
    resourceType: 'wikipedia',
    summary: 'Flight dynamics, orbital mechanics, propulsion principles, and atmospheric flight systems.',
    tags: ['Aerodynamics', 'Orbital Mechanics', 'Flight'],
  },
  {
    id: 'quantum-physics',
    label: 'Quantum Physics',
    category: 'topic',
    subcategory: 'Physics & Cosmos',
    href: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
    resourceType: 'wikipedia',
    summary: 'Fundamental physical theory describing nature at the scale of atoms and subatomic particles.',
    tags: ['Physics', 'Quantum Mechanics'],
  },
  {
    id: 'cosmology',
    label: 'Cosmology',
    category: 'topic',
    subcategory: 'Physics & Cosmos',
    href: 'https://en.wikipedia.org/wiki/Physical_cosmology',
    resourceType: 'wikipedia',
    summary: 'The scientific study of the origin, evolution, and large-scale structures of the universe.',
    tags: ['Cosmology', 'Astrophysics'],
  },

  // Programming Languages
  {
    id: 'lang-c',
    label: 'C',
    category: 'language',
    href: 'https://www.geeksforgeeks.org/c-programming-language/',
    resourceType: 'gfg',
    summary: 'Low-level imperative systems programming, manual memory management, and hardware fundamentals.',
    tags: ['Systems', 'Procedural'],
  },
  {
    id: 'lang-cpp',
    label: 'C++',
    category: 'language',
    href: 'https://www.geeksforgeeks.org/c-plus-plus/',
    resourceType: 'gfg',
    summary: 'High-performance computing, object-oriented abstractions, templates, and low-latency algorithms.',
    tags: ['Performance', 'OOP', 'STL'],
  },
  {
    id: 'lang-python',
    label: 'Python',
    category: 'language',
    href: 'https://www.geeksforgeeks.org/python-programming-language-tutorial/',
    resourceType: 'gfg',
    summary: 'Primary language for AI/ML experimentation, data science pipelines, and mathematical modeling.',
    tags: ['AI/ML', 'Scripting', 'Data'],
  },
  {
    id: 'lang-sql',
    label: 'SQL',
    category: 'language',
    href: 'https://www.geeksforgeeks.org/sql-tutorial/',
    resourceType: 'gfg',
    summary: 'Relational data query design, structured data modeling, schema normalization, and aggregation.',
    tags: ['Database', 'Queries'],
  },

  // Tools & Technical Ecosystem
  {
    id: 'tool-linux',
    label: 'Linux / Kali',
    category: 'tool',
    href: 'https://www.kali.org/docs/',
    resourceType: 'docs',
    summary: 'Primary operating environment for development, terminal automation, and security testing.',
    tags: ['OS', 'Terminal', 'Security'],
  },
  {
    id: 'tool-docker',
    label: 'Docker',
    category: 'tool',
    href: 'https://docs.docker.com/',
    resourceType: 'docs',
    summary: 'Containerized deployment, reproducible runtime environments, and isolated micro-services.',
    tags: ['Containers', 'DevOps'],
  },
  {
    id: 'tool-git',
    label: 'Git / GitHub',
    category: 'tool',
    href: 'https://git-scm.com/doc',
    resourceType: 'docs',
    summary: 'Version control, atomic commits, branch workflows, and distributed code collaboration.',
    tags: ['VCS', 'Collaboration'],
  },
  {
    id: 'tool-vscode',
    label: 'VS Code',
    category: 'tool',
    href: 'https://code.visualstudio.com/docs',
    resourceType: 'docs',
    summary: 'Primary code editor configured for C++, Python, TypeScript, and remote container sessions.',
    tags: ['IDE', 'Editor'],
  },
  {
    id: 'tool-android-studio',
    label: 'Android Studio',
    category: 'tool',
    href: 'https://developer.android.com/studio',
    resourceType: 'docs',
    summary: 'Native Android application development, mobile SDK integration, and device profiling.',
    tags: ['Mobile', 'Android'],
  },
  {
    id: 'tool-pytorch',
    label: 'PyTorch',
    category: 'tool',
    href: 'https://pytorch.org/docs/',
    resourceType: 'docs',
    summary: 'Deep learning framework for tensor computation, model fine-tuning, and neural network research.',
    tags: ['Deep Learning', 'Tensors'],
  },
  {
    id: 'tool-ollama',
    label: 'Ollama',
    category: 'tool',
    href: 'https://ollama.com/',
    resourceType: 'docs',
    summary: 'Local LLM execution runtime enabling inference and testing completely offline on consumer hardware.',
    tags: ['Local AI', 'Inference'],
  },
  {
    id: 'tool-anaconda',
    label: 'Anaconda',
    category: 'tool',
    href: 'https://docs.anaconda.com/',
    resourceType: 'docs',
    summary: 'Scientific Python package management, Conda environment isolation, and dependency resolution.',
    tags: ['Data Science', 'Package Manager'],
  },
  {
    id: 'tool-adb',
    label: 'ADB',
    category: 'tool',
    href: 'https://developer.android.com/tools/adb',
    resourceType: 'docs',
    summary: 'Android Debug Bridge for device communication, APK sideloading, and runtime log inspection.',
    tags: ['Android', 'Debugging'],
  },
  {
    id: 'tool-powershell',
    label: 'PowerShell',
    category: 'tool',
    href: 'https://learn.microsoft.com/powershell/',
    resourceType: 'docs',
    summary: 'Task automation, command-line scripting, and Windows environment administration.',
    tags: ['CLI', 'Automation'],
  },

  // Projects
  {
    id: 'proj-vovera',
    label: 'VOVERA™',
    category: 'project',
    summary: 'Experimental edge-oriented security system exploring real-time detection of AI-generated voice cloning and deepfake scam calls.',
    tags: ['AI Voice Detection', 'DSP', 'Android', 'Security'],
  },
  {
    id: 'proj-mini-rag',
    label: 'Mini RAG',
    category: 'project',
    summary: 'Research-grade PDF question answering system exploring document retrieval, embeddings, and vector similarity.',
    tags: ['RAG', 'Retrieval', 'Embeddings', 'Python'],
  },

  // Games (Validated & strictly categorized)
  {
    id: 'game-shadow-fight-3',
    label: 'Shadow Fight 3',
    category: 'game',
    subcategory: 'Fighting / Action',
    href: 'https://shadowfight3.com/',
    resourceType: 'official',
    summary: 'Tactical fighting and action game featuring precision weapons, martial disciplines, and shadow energy combat.',
    tags: ['Fighting', 'Martial Arts', 'Action'],
  },
  {
    id: 'game-tekken-8',
    label: 'Tekken 8',
    category: 'game',
    subcategory: 'Fighting',
    href: 'https://tekken.com/',
    resourceType: 'official',
    summary: '3D competitive fighting game known for deep move lists, frame data precision, Heat mechanics, and tactical spacing.',
    tags: ['Fighting', '3D Competitive', 'Frame Data'],
  },
  {
    id: 'game-mortal-kombat',
    label: 'Mortal Kombat series',
    category: 'game',
    subcategory: 'Fighting',
    href: 'https://www.mortalkombat.com/',
    resourceType: 'official',
    summary: 'Iconic fighting game franchise built on intense neutral gameplay, special moves, combo extensions, and tactical pacing.',
    tags: ['Fighting', '2D Competitive', 'Combos'],
  },
  {
    id: 'game-injustice',
    label: 'Injustice 1 & 2',
    category: 'game',
    subcategory: 'Fighting',
    href: 'https://www.injustice.com/',
    resourceType: 'official',
    summary: 'Superhero fighting game series featuring stage transitions, trait systems, clash mechanics, and high-impact spacing.',
    tags: ['Fighting', 'DC Universe', 'Competitive'],
  },
  {
    id: 'game-genshin',
    label: 'Genshin Impact',
    category: 'game',
    subcategory: 'Action RPG',
    href: 'https://genshin.hoyoverse.com/',
    resourceType: 'official',
    summary: 'Open-world Action RPG exploring elemental reaction systems, character synergies, team rotations, and world traversal.',
    tags: ['Action RPG', 'Open World', 'Elemental Mechanics'],
  },
]

export const TOPIC_ENTITIES = KNOWLEDGE_ENTITIES.filter((e) => e.category === 'topic')
export const LANGUAGE_ENTITIES = KNOWLEDGE_ENTITIES.filter((e) => e.category === 'language')
export const TOOL_ENTITIES = KNOWLEDGE_ENTITIES.filter((e) => e.category === 'tool')
export const GAME_ENTITIES = KNOWLEDGE_ENTITIES.filter((e) => e.category === 'game')
export const PROJECT_ENTITIES = KNOWLEDGE_ENTITIES.filter((e) => e.category === 'project')

export function findKnowledgeEntity(idOrLabel: string): KnowledgeEntity | undefined {
  const norm = idOrLabel.trim().toLowerCase()
  return KNOWLEDGE_ENTITIES.find(
    (e) => e.id.toLowerCase() === norm || e.label.toLowerCase() === norm
  )
}
