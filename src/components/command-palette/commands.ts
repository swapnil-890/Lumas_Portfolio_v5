import {
  Compass,
  Cpu,
  Bot,
  Plane,
  Layers,
  Terminal,
  Send,
  Gamepad2,
  Github,
  Mail,
  HelpCircle,
} from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface Command {
  readonly id: string;
  readonly name: string;
  readonly category: 'NAVIGATION' | 'SYSTEMS' | 'LAB' | 'INTERACTION' | 'EXTERNAL';
  readonly icon: React.ElementType;
  readonly keywords: readonly string[];
  readonly action: (router: AppRouterInstance) => void;
  readonly description?: string;
}

function navigateToAnchor(router: AppRouterInstance, anchorId: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === '/') {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }
  router.push(`/#${anchorId}`);
}

export function createCommands(router: AppRouterInstance): readonly Command[] {
  return [
    // Navigation Anchors (§16.2)
    {
      id: 'nav-overview',
      name: '01 // Overview & Telemetry',
      category: 'NAVIGATION',
      icon: Compass,
      keywords: ['overview', 'hero', 'home', 'ist', 'clock', 'start', 'top'],
      action: (r) => navigateToAnchor(r, 'overview'),
      description: 'Identity headline, bio, and operational IST telemetry',
    },
    {
      id: 'nav-systems',
      name: '02 // Systems & Architecture',
      category: 'NAVIGATION',
      icon: Bot,
      keywords: ['systems', 'vovera', 'core-7', 'architecture', 'software', 'projects'],
      action: (r) => navigateToAnchor(r, 'systems'),
      description: 'Primary engineering proof layer (SYS-01, SYS-02)',
    },
    {
      id: 'nav-lab',
      name: '03 // Hardware & Robotics Lab',
      category: 'NAVIGATION',
      icon: Plane,
      keywords: ['lab', 'steel raven', 'uav', 'robotics', 'hardware', 'drones', 'bench'],
      action: (r) => navigateToAnchor(r, 'lab'),
      description: 'Physical computing and UAV kinematics bench (LAB-01)',
    },
    {
      id: 'nav-stack',
      name: '04 // Classified Technical Stack',
      category: 'NAVIGATION',
      icon: Layers,
      keywords: ['stack', 'technologies', 'languages', 'tools', 'python', 'c', 'cpp', 'pytorch'],
      action: (r) => navigateToAnchor(r, 'stack'),
      description: 'Relational knowledge graph of engineering tools',
    },
    {
      id: 'nav-dispatch',
      name: '05 // Dispatch & Profiles',
      category: 'NAVIGATION',
      icon: Send,
      keywords: ['dispatch', 'contact', 'channels', 'email', 'whatsapp', 'reach', 'comms'],
      action: (r) => navigateToAnchor(r, 'dispatch'),
      description: 'Direct communication channels and verified endpoints',
    },

    // Systems Case Studies
    {
      id: 'vovera-case-study',
      name: 'VOVERA™ Case Study',
      category: 'SYSTEMS',
      icon: Bot,
      keywords: ['voice', 'security', 'fastapi', 'audio', 'dsp', 'librosa', 'sys-01'],
      action: (r) => r.push('/work/vovera'),
      description: 'Real-time voice attack & deepfake detection pipeline',
    },
    {
      id: 'core7-case-study',
      name: 'Core-7 Case Study',
      category: 'SYSTEMS',
      icon: Cpu,
      keywords: ['rag', 'retrieval', 'chromadb', 'guardrail', 'embedding', 'sys-02'],
      action: (r) => r.push('/work/core7'),
      description: 'Mini RAG pipeline with policy-enforced guardrail middleware',
    },
    {
      id: 'steel-raven-case-study',
      name: 'Steel Raven Case Study',
      category: 'LAB',
      icon: Plane,
      keywords: ['drone', 'uav', 'hardware', 'carbon fiber', 'robotics', 'lab-01'],
      action: (r) => r.push('/work/steel-raven'),
      description: 'Biomimetic autonomous UAV airframe and control architecture',
    },

    // Interaction & Off-Duty
    {
      id: 'ask-lumas',
      name: 'Ask Lumas Query Terminal',
      category: 'INTERACTION',
      icon: Terminal,
      keywords: ['ask', 'query', 'chat', 'bot', 'offline', 'terminal', 'lumas'],
      action: (r) => {
        navigateToAnchor(r, 'ask-lumas');
        setTimeout(() => {
          document.getElementById('ask-lumas-input')?.focus();
        }, 150);
      },
      description: 'Query profile graph via deterministic local engine',
    },
    {
      id: 'help-intent',
      name: 'Help & Supported Queries',
      category: 'INTERACTION',
      icon: HelpCircle,
      keywords: ['help', 'usage', 'intents', 'vectors', 'commands', 'guide'],
      action: (r) => {
        navigateToAnchor(r, 'ask-lumas');
        setTimeout(() => {
          const input = document.getElementById('ask-lumas-input') as HTMLInputElement | null;
          if (input) {
            input.value = 'help';
            input.focus();
          }
        }, 150);
      },
      description: 'Inspect supported query vectors in Ask Lumas',
    },
    {
      id: 'off-duty',
      name: 'Off-Duty Exploration',
      category: 'INTERACTION',
      icon: Gamepad2,
      keywords: ['gaming', 'cinema', 'dislikes', 'principles', 'personal', 'genshin', 'wuthering waves'],
      action: (r) => r.push('/off-duty'),
      description: 'Personal disciplines, gaming, cinematography, and operating principles',
    },

    // External Endpoints (Source-backed)
    {
      id: 'github',
      name: 'GitHub Profile',
      category: 'EXTERNAL',
      icon: Github,
      keywords: ['code', 'repository', 'source', 'git', 'github'],
      action: () => window.open('https://github.com/swapnil-890', '_blank', 'noopener,noreferrer'),
      description: 'Source code repositories and public commits (@swapnil-890)',
    },
    {
      id: 'contact-email',
      name: 'Send Direct Email',
      category: 'EXTERNAL',
      icon: Mail,
      keywords: ['email', 'reach', 'message', 'mail'],
      action: () => { window.location.href = 'mailto:swapnilroymldt@gmail.com'; },
      description: 'swapnilroymldt@gmail.com',
    },
  ];
}
