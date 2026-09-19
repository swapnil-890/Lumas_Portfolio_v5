import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectContent } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata = {
  title: 'Core-7',
  description: 'Mini RAG pipeline with guardrail middleware — chunking strategy, architecture, and benchmarks.',
};

export default function Core7Page() {
  let project;
  try {
    project = getProjectContent('core7');
  } catch {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-amber-500 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-semibold text-slate-100">
            {frontmatter.title}
          </h1>
          <span className="px-2 py-0.5 text-xs font-mono bg-slate-800 text-slate-400 rounded">
            {frontmatter.status}
          </span>
        </div>
        <p className="text-lg text-slate-400">{frontmatter.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-slate-800/50 text-slate-400 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {frontmatter.repo && (
          <a
            href={frontmatter.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-mono text-amber-500 hover:text-amber-400 transition-colors"
          >
            View Source
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </header>

      <article className="prose-technical">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
