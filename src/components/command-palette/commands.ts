import { Home, Bot, Cpu, Plane, Gamepad2, Github, Mail } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface Command {
  id: string;
  name: string;
  icon: React.ElementType;
  keywords: string[];
  action: (router: AppRouterInstance) => void;
  description?: string;
}

export function createCommands(router: AppRouterInstance): Command[] {
  return [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      keywords: ['index', 'main', 'start'],
      action: (r) => r.push('/'),
      description: 'Go to home page',
    },
    {
      id: 'vovera',
      name: 'VOVERA',
      icon: Bot,
      keywords: ['voice', 'security', 'fastapi', 'audio', 'ml'],
      action: (r) => r.push('/work/vovera'),
      description: 'Voice authentication system',
    },
    {
      id: 'core-7',
      name: 'Core-7',
      icon: Cpu,
      keywords: ['rag', 'retrieval', 'llm', 'guardrail', 'embedding'],
      action: (r) => r.push('/work/core7'),
      description: 'LLM retrieval pipeline',
    },
    {
      id: 'steel-raven',
      name: 'Steel Raven',
      icon: Plane,
      keywords: ['drone', 'hardware', 'carbon fiber', 'robotics'],
      action: (r) => r.push('/work/steel-raven'),
      description: 'Autonomous drone platform',
    },
    {
      id: 'off-duty',
      name: 'Off-Duty',
      icon: Gamepad2,
      keywords: ['gaming', 'anime', 'cinema', 'personal'],
      action: (r) => r.push('/off-duty'),
      description: 'Personal interests and hobbies',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      keywords: ['code', 'repository', 'source'],
      action: () => window.open('https://github.com/swapnil-890', '_blank'),
      description: 'View my GitHub profile',
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: Mail,
      keywords: ['email', 'reach', 'message'],
      action: () => window.location.href = 'mailto:swapnilroymldt@gmail.com',
      description: 'Send me an email',
    },
  ];
}
