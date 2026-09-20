import Link from 'next/link';
import { Github, Mail, Command } from 'lucide-react';
import { siteMeta, socials } from '@/data/meta';

export function Footer() {
  const githubProfile = socials.find((s) => s.id === 'github')?.href || 'https://github.com/swapnil-890';

  return (
    <footer className="mt-16 border-t border-border pt-8 pb-12 font-sans" aria-label="Site footer">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        <div>
          <p className="text-xs font-mono text-fg-dim">
            {siteMeta.name} — AI & Systems Architecture ({siteMeta.year})
          </p>
          <div className="flex items-center gap-2 mt-1.5 text-xs font-mono text-fg-muted">
            <Command className="w-3 h-3 text-accent" aria-hidden="true" />
            <span>Press ⌘K or Ctrl+K for Command Palette</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-fg-muted hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:swapnilroymldt@gmail.com"
            className="p-2 text-fg-muted hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-fg-muted border-t border-border/60 pt-4">
        <span>© {siteMeta.year} {siteMeta.legalName} · {siteMeta.location}</span>
        <Link href="/off-duty" className="hover:text-accent transition-colors">
          Off-Duty Exploration →
        </Link>
      </div>
    </footer>
  );
}
