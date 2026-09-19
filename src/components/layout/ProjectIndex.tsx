import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  href: string;
  repoUrl?: string;
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Engineering Work</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="border border-border-soft bg-glass hover:bg-glass-hover hover:border-border-strong hover:shadow-cyan-glow backdrop-blur-xl rounded-lg p-6 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
                  <span className="px-2 py-0.5 text-xs font-mono bg-slate-900 border border-border-soft text-cyan rounded">
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-400">{project.subtitle}</p>
              </div>
              <Link
                href={project.href}
                className="flex items-center gap-1 text-cyan hover:text-cyan-400 font-medium transition-colors"
              >
                Deep Dive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-xs font-mono bg-slate-900/60 border border-border-soft text-slate-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-xs font-mono text-slate-500">{metric.label}</p>
                  <p className="text-lg font-semibold text-slate-100 mt-1">{metric.value}</p>
                </div>
              ))}
            </div>
            
            {project.repoUrl && (
              <div className="mt-6 pt-4 border-t border-border-soft">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan transition-colors"
                >
                  <Github className="w-4 h-4" /> View Repository
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
