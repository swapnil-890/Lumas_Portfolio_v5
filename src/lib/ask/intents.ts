// src/lib/ask/intents.ts
// Deterministic intent definitions and local knowledge records for Ask Lumas
import { siteMeta, contacts, socials } from '@/data/meta';
import { systems } from '@/data/systems';
import { labEntries } from '@/data/lab';

export interface QueryLink {
  readonly label: string;
  readonly href: string;
}

export interface IntentDefinition {
  readonly id: string;
  readonly label: string;
  readonly keywords: readonly string[];
  readonly exactPhrases?: readonly string[];
  readonly description: string;
  readonly responseTitle: string;
  readonly responseText: string;
  readonly links?: readonly QueryLink[];
  readonly suggestions?: readonly string[];
}

export const INTENTS: readonly IntentDefinition[] = [
  {
    id: 'help',
    label: 'Help & Supported Queries',
    keywords: ['help', 'commands', 'usage', 'options', 'query', 'what can i ask', 'menu', 'guide', 'vectors', 'how to use'],
    exactPhrases: ['help', 'what can i ask', 'commands', 'options'],
    description: 'Displays supported query vectors and usage guidance',
    responseTitle: 'QUERY ENGINE // SUPPORTED INTENTS',
    responseText:
      'Ask Lumas is a deterministic offline profile query engine operating strictly on verified repository data. Supported query vectors include:\n\n' +
      '• IDENTITY / ABOUT: "who is lumas", "education", "philosophy"\n' +
      '• SYSTEMS: "what is vovera", "core-7", "systems", "projects"\n' +
      '• LAB: "steel raven", "lab", "robotics", "hardware"\n' +
      '• STACK: "show stack", "languages", "ai ml", "technologies"\n' +
      '• CONTACT: "how to contact", "email", "whatsapp", "github"\n' +
      '• OFF-DUTY / GAMES: "what games does he play", "off duty"\n' +
      '• NAVIGATION: "navigate", "sections", "where is"\n' +
      '• STATUS: "engine status", "telemetry", "version"',
    suggestions: ['who is lumas', 'what is vovera', 'show stack', 'contact channels'],
  },
  {
    id: 'about',
    label: 'About & Identity',
    keywords: ['who is lumas', 'who is swapnil', 'about', 'identity', 'background', 'education', 'degree', 'student', 'college', 'bio', 'philosophy', 'first principles', 'who'],
    exactPhrases: ['who is lumas', 'who is swapnil', 'who is swapnil roy', 'about lumas', 'tell me about lumas', 'who are you'],
    description: 'Identity, academic focus, and first-principles philosophy',
    responseTitle: 'PROFILE RECORD // SWAPNIL ROY (LUMAS)',
    responseText:
      `${siteMeta.legalName} (${siteMeta.name}) is an AI & Data Science undergraduate student approaching computing from first principles. ` +
      `His work emphasizes understanding physical systems, signal propagation, and model architectures rather than superficial recipes.\n\n` +
      `Focus areas include machine learning architectures, real-time voice digital signal processing, retrieval pipelines with guardrails, and autonomous physical robotics.`,
    links: [
      { label: 'Overview Section', href: '#overview' },
      { label: 'Off-Duty Profile', href: '/off-duty' },
    ],
    suggestions: ['what does he build', 'show stack', 'contact channels'],
  },
  {
    id: 'systems',
    label: 'Systems Overview',
    keywords: ['systems', 'projects', 'what does he build', 'software', 'show systems', 'applications', 'portfolio work'],
    exactPhrases: ['systems', 'projects', 'show systems', 'what does he build', 'what do you build'],
    description: 'Summary of source-backed experimental software systems',
    responseTitle: 'SYSTEMS DIRECTORY // EXPERIMENTAL (PRIVATE)',
    responseText:
      'LUMAS maintains two primary source-backed software systems under active experimental development:\n\n' +
      '• SYS-01: VOVERA™ — Real-Time Voice Attack & Deepfake Detection Pipeline\n' +
      '• SYS-02: Core-7 — Mini RAG Retrieval Pipeline with Guardrail Middleware\n\n' +
      'Both systems are private research repositories. In-depth technical architecture and methodology can be inspected in their case studies.',
    links: [
      { label: 'VOVERA Case Study', href: '/work/vovera' },
      { label: 'Core-7 Case Study', href: '/work/core7' },
      { label: 'Systems Section', href: '#systems' },
    ],
    suggestions: ['what is vovera', 'what is core-7', 'show stack'],
  },
  {
    id: 'vovera',
    label: 'VOVERA™ System',
    keywords: ['vovera', 'voice', 'deepfake', 'anti spoofing', 'audio', 'dsp', 'librosa', 'sys-01', 'scam', 'voice attack'],
    exactPhrases: ['what is vovera', 'vovera', 'tell me about vovera', 'sys-01'],
    description: 'Real-time voice attack detection pipeline (SYS-01)',
    responseTitle: 'SYSTEM SYS-01 // VOVERA™',
    responseText:
      'VOVERA™ is an edge-oriented AI security pipeline exploring real-time detection of AI-synthesized and deepfake voice-cloning scam calls.\n\n' +
      '• Pipeline: Audio Stream Ingestion → Librosa Spectral DSP Feature Extraction → Synthetic Artifact Classifier → Deterministic Risk Scoring → Local SQLite Audit Logging\n' +
      '• Target Window: Sub-500ms processing threshold\n' +
      '• Status: EXPERIMENTAL · Visibility: PRIVATE\n\n' +
      'Private repository. Public URL is omitted. Inspect verified architecture in the case study.',
    links: [
      { label: 'Inspect VOVERA Case Study', href: '/work/vovera' },
      { label: 'Systems Section', href: '#systems' },
    ],
    suggestions: ['what is core-7', 'show stack', 'contact channels'],
  },
  {
    id: 'core-7',
    label: 'Core-7 / Mini RAG System',
    keywords: ['core-7', 'core7', 'rag', 'mini rag', 'guardrail', 'retrieval', 'chromadb', 'embedding', 'sys-02', 'semantic search'],
    exactPhrases: ['what is core-7', 'core 7', 'core-7', 'tell me about core 7', 'mini rag', 'sys-02'],
    description: 'Mini RAG pipeline with guardrail middleware (SYS-02)',
    responseTitle: 'SYSTEM SYS-02 // CORE-7',
    responseText:
      'Core-7 is a deterministic Mini RAG system combining context-preserving document chunking, dense vector similarity retrieval via ChromaDB, and defensive guardrail middleware to prevent prompt injection and out-of-scope hallucinations.\n\n' +
      '• Pipeline: Tokenization & Chunking → Dense Vector Embedding → ChromaDB Proximity Indexing → Guardrail Policy Verification → Context Assembly\n' +
      '• Status: EXPERIMENTAL · Visibility: PRIVATE\n\n' +
      'Private repository. Public URL is omitted. Inspect verified architecture in the case study.',
    links: [
      { label: 'Inspect Core-7 Case Study', href: '/work/core7' },
      { label: 'Systems Section', href: '#systems' },
    ],
    suggestions: ['what is vovera', 'show stack', 'who is lumas'],
  },
  {
    id: 'lab',
    label: 'Hardware Lab',
    keywords: ['lab', 'robotics', 'hardware', 'physical computing', 'drones', 'uav', 'aerospace', 'aerodynamics', 'bench'],
    exactPhrases: ['lab', 'show lab', 'hardware lab', 'robotics', 'what is in the lab'],
    description: 'Robotics and physical computing laboratory overview',
    responseTitle: 'HARDWARE LAB // PHYSICAL COMPUTING',
    responseText:
      'The Hardware Lab investigates biomimetic autonomous physical computing, embedded motor controllers, and structural dynamics.\n\n' +
      '• LAB-01: Steel Raven — Biomimetic autonomous UAV airframe and control kinematics platform\n' +
      '• Status: PROTOTYPE · Visibility: PRIVATE\n' +
      '• Zero numeric specs fabricated per strict data integrity policy.',
    links: [
      { label: 'Inspect Steel Raven Case Study', href: '/work/steel-raven' },
      { label: 'Lab Section', href: '#lab' },
    ],
    suggestions: ['what is steel raven', 'what does he build', 'show stack'],
  },
  {
    id: 'steel-raven',
    label: 'Steel Raven Lab Entry',
    keywords: ['steel raven', 'steel-raven', 'lab-01', 'drone', 'uav', 'airframe', 'wing articulation', 'carbon fiber', 'cfrp', 'fusion 360'],
    exactPhrases: ['what is steel raven', 'steel raven', 'tell me about steel raven', 'lab-01'],
    description: 'Biomimetic autonomous UAV airframe and control prototype (LAB-01)',
    responseTitle: 'LAB LAB-01 // STEEL RAVEN',
    responseText:
      'Steel Raven is an autonomous biomimetic UAV airframe and control architecture prototype. Current bench focus:\n\n' +
      '• Wing articulation mechanical linkage kinematics optimization\n' +
      '• Carbon-fiber reinforced polymer (CFRP) structural rigidity evaluation\n' +
      '• Parametric generative airframe brackets designed in Fusion 360\n' +
      '• Low-latency onboard sensor telemetry integration\n\n' +
      'Status: PROTOTYPE · Visibility: PRIVATE (0 fabricated metrics).',
    links: [
      { label: 'Inspect Steel Raven Case Study', href: '/work/steel-raven' },
      { label: 'Lab Section', href: '#lab' },
    ],
    suggestions: ['what is vovera', 'show stack', 'who is lumas'],
  },
  {
    id: 'stack',
    label: 'Technical Stack & Ecosystem',
    keywords: ['stack', 'technologies', 'tools', 'skills', 'languages', 'frameworks', 'python', 'c', 'cpp', 'sql', 'pytorch', 'fastapi', 'chromadb', 'kali linux', 'docker', 'rtx 3050'],
    exactPhrases: ['show stack', 'stack', 'technologies', 'languages', 'what languages does he use', 'what tools does he use'],
    description: 'Classified technology stack and relational systems graph',
    responseTitle: 'TECHNICAL STACK // CLASSIFIED TAXONOMY',
    responseText:
      'Authoritative source-backed technical ecosystem:\n\n' +
      '• LANGUAGES: Python (core research: VOVERA, Core-7), C (systems/embedded), C++ (robotics/performance), SQL (relational data modeling)\n' +
      '• AI & ML: PyTorch, Ollama, ChromaDB, Hugging Face\n' +
      '• SYSTEMS & INFRASTRUCTURE: Kali Linux, Docker, FastAPI, SQLite\n' +
      '• HARDWARE & GPU: NVIDIA GeForce RTX 3050 6GB Laptop GPU\n\n' +
      'Note: Bash is strictly classified as an environment shell and omitted from programming languages.',
    links: [
      { label: 'Stack Section', href: '#stack' },
    ],
    suggestions: ['what is vovera', 'who is lumas', 'contact channels'],
  },
  {
    id: 'games',
    label: 'Games & Off-Duty',
    keywords: ['games', 'gaming', 'genshin', 'genshin impact', 'wuthering waves', 'off duty', 'off-duty', 'hobbies', 'cinema', 'cinematography', 'personal'],
    exactPhrases: ['what games does he play', 'games', 'gaming', 'off duty', 'off-duty'],
    description: 'Gaming disciplines and off-duty personal interests',
    responseTitle: 'OFF-DUTY PROFILE // GAMING & DISCIPLINES',
    responseText:
      'Off-duty disciplines and personal exploration:\n\n' +
      '• Genshin Impact (Strictly classified as ACTION RPG)\n' +
      '• Wuthering Waves (Action RPG)\n' +
      '• Cinematography, visual analysis, and operating principles\n\n' +
      'View personal philosophy, concept explorations, and aesthetic studies on the dedicated Off-Duty page.',
    links: [
      { label: 'Open Off-Duty Page', href: '/off-duty' },
    ],
    suggestions: ['who is lumas', 'show stack', 'contact channels'],
  },
  {
    id: 'contact',
    label: 'Contact & Dispatch Channels',
    keywords: ['contact', 'email', 'whatsapp', 'reach', 'message', 'socials', 'github', 'hire', 'talk', 'connect', 'phone'],
    exactPhrases: ['how to contact', 'contact', 'how do i contact lumas', 'email', 'whatsapp', 'reach'],
    description: 'Verified direct communication channels and accounts',
    responseTitle: 'DISPATCH CHANNELS // VERIFIED ENDPOINTS',
    responseText:
      'Verified direct communication endpoints:\n\n' +
      '• Direct Email: swapnilroymldt@gmail.com\n' +
      '• Academic Email: cseai2026015@rcciit.edu.in\n' +
      '• WhatsApp Direct: +91 9242233053\n' +
      '• GitHub: https://github.com/swapnil-890\n\n' +
      '(LinkedIn is intentionally omitted per operator instruction until a verified URL is provided).',
    links: [
      { label: 'Dispatch Section', href: '#dispatch' },
      { label: 'Direct Email', href: 'mailto:swapnilroymldt@gmail.com' },
      { label: 'WhatsApp', href: 'https://wa.me/919242233053' },
      { label: 'GitHub Profile', href: 'https://github.com/swapnil-890' },
    ],
    suggestions: ['who is lumas', 'what does he build', 'help'],
  },
  {
    id: 'navigation',
    label: 'Navigation Map',
    keywords: ['navigate', 'navigation', 'sections', 'pages', 'routes', 'jump', 'menu', 'where is', 'sitemap'],
    exactPhrases: ['navigate', 'navigation', 'sections', 'where is', 'sitemap'],
    description: 'Sitemap and section anchors for keyboard and screen reader navigation',
    responseTitle: 'NAVIGATION MAP // SYSTEMS DASHBOARD',
    responseText:
      'LUMAS Systems Dashboard Navigation Architecture:\n\n' +
      '• #overview — Identity, Hero, and IST Telemetry\n' +
      '• #systems — Systems & Architecture (VOVERA, Core-7)\n' +
      '• #lab — Robotics & Physical Computing (Steel Raven)\n' +
      '• #stack — Classified Technical Ecosystem\n' +
      '• #dispatch — Communication & Interactive Query Console\n' +
      '• /off-duty — Personal disciplines & operating principles\n\n' +
      'Keyboard shortcut: Press ⌘K (macOS) or Ctrl+K (Windows/Linux) to open the Command Palette.',
    links: [
      { label: 'Overview', href: '#overview' },
      { label: 'Systems', href: '#systems' },
      { label: 'Lab', href: '#lab' },
      { label: 'Stack', href: '#stack' },
      { label: 'Dispatch', href: '#dispatch' },
    ],
    suggestions: ['who is lumas', 'what is vovera', 'help'],
  },
  {
    id: 'status',
    label: 'Engine Telemetry & Meta',
    keywords: ['status', 'telemetry', 'meta', 'version', 'uptime', 'timezone', 'ist', 'engine', 'health'],
    exactPhrases: ['status', 'telemetry', 'meta', 'version', 'engine status'],
    description: 'Deterministic engine telemetry and runtime operational parameters',
    responseTitle: 'SYSTEM TELEMETRY // ENGINE STATUS',
    responseText:
      `LUMAS™ Systems Dashboard v${siteMeta.version} (${siteMeta.year})\n` +
      `• Operational Status: NOMINAL\n` +
      `• Local Timezone: ${siteMeta.location}\n` +
      `• Engine: Deterministic Local Knowledge Graph (100% offline, 0 network dependencies, 0 LLM hallucination)\n` +
      `• Environment: Next.js 14 App Router · React 18.3.1 · Tailwind CSS 3.4.13`,
    links: [
      { label: 'Overview Section', href: '#overview' },
    ],
    suggestions: ['help', 'who is lumas', 'show systems'],
  },
];
