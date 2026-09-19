import Link from 'next/link';
import { Github, Mail, Command } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800 pt-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <p className="text-sm text-slate-400">
            Built with Next.js, Tailwind, and MDX. <a href="https://github.com/swapnil-890/lumas-portfolio" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">View Source</a>
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-500">
            <Command className="w-3 h-3" />
            <span>Press ⌘K to navigate</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <a href="https://github.com/swapnil-890" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-100 transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:swapnilroymldt@gmail.com" className="text-slate-400 hover:text-slate-100 transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-800 pt-4">
        <span>© 2026 Swapnil Roy</span>
        <Link href="/off-duty" className="hover:text-amber-500 transition-colors">
          Off-Duty →
        </Link>
      </div>
    </footer>
  );
}
