import Link from 'next/link';

export function CurrentFocus() {
  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Current Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Building", value: "VOVERA", detail: "Real-time voice attack detection pipeline", href: "/work/vovera" },
          { label: "Optimizing", value: "Core-7 RAG", detail: "Chunking strategy & guardrail middleware", href: "/work/core7" },
          { label: "Designing", value: "Steel Raven", detail: "Biomimetic drone — carbon fiber frame v2", href: "/work/steel-raven" }
        ].map((item) => (
          <Link key={item.value} href={item.href} className="block p-4 border border-slate-800 rounded-lg hover:border-amber-500/50 group transition-colors">
            <p className="text-xs font-mono text-slate-500 mb-1">{item.label}</p>
            <p className="text-lg font-semibold text-slate-100 group-hover:text-amber-500 transition-colors">{item.value}</p>
            <p className="text-sm text-slate-400 mt-2">{item.detail}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
