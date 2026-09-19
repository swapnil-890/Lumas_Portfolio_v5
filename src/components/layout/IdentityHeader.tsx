import Link from 'next/link';

export function IdentityHeader() {
  return (
    <header className="border-b border-slate-800 pb-8 mb-12">
      <h1 className="text-4xl font-semibold text-slate-100">Swapnil Roy</h1>
      <p className="mt-2 text-lg font-mono text-slate-400">AI & Systems Engineer</p>
      <div className="mt-4 flex gap-4 text-sm font-mono text-slate-400">
        <a href="https://github.com/swapnil-890" className="hover:text-amber-500 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:swapnilroymldt@gmail.com" className="hover:text-amber-500 transition-colors">Contact</a>
      </div>
      <p className="mt-6 text-slate-300 max-w-2xl leading-relaxed">
        I engineer intelligent systems and physical architectures. Currently focused on AI security (
        <Link href="/work/vovera" className="text-amber-500 hover:underline">VOVERA</Link>), retrieval-augmented systems (
        <Link href="/work/core7" className="text-amber-500 hover:underline">Core-7</Link>), and biomimetic robotics (
        <Link href="/work/steel-raven" className="text-amber-500 hover:underline">Steel Raven</Link>).
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {['Python', 'FastAPI', 'C++', 'SQLite', 'React'].map((tech) => (
          <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-slate-800 text-slate-400 rounded">
            {tech}
          </span>
        ))}
      </div>
    </header>
  );
}
