import Link from 'next/link';

export function CurrentFocus() {
  return (
    <section className="mb-16">
      <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Current Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Building", value: "VOVERA", detail: "Real-time voice attack detection pipeline", href: "/work/vovera" },
          { label: "Optimizing", value: "Core-7 RAG", detail: "Chunking strategy & guardrail middleware", href: "/work/core7" },
          { label: "Designing", value: "Steel Raven", detail: "Biomimetic drone — carbon fiber frame v2", href: "/work/steel-raven" }
        ].map((item) => (
          <Link
            key={item.value}
            href={item.href}
            className="block p-5 border border-border-soft bg-glass hover:bg-glass-hover hover:border-border-strong hover:shadow-cyan-glow backdrop-blur-xl rounded-lg group transition-all duration-300 transform hover:-translate-y-1"
          >
            <p className="text-xs font-mono text-slate-500 mb-1">{item.label}</p>
            <p className="text-lg font-semibold text-slate-100 group-hover:text-cyan transition-colors">{item.value}</p>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{item.detail}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
