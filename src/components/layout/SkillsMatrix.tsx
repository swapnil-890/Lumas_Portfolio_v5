import Link from 'next/link';

type Skill = { name: string; context: string; href: string | null };

const skills = {
  build: [
    { name: "Python", context: "VOVERA, Core-7", href: "/work/vovera" },
    { name: "FastAPI", context: "VOVERA backend", href: "/work/vovera" },
    { name: "SQLite", context: "VOVERA audit log", href: "/work/vovera" },
    { name: "C / C++", context: "Systems coursework", href: null },
    { name: "React / TypeScript", context: "This portfolio", href: null },
    { name: "Tailwind CSS", context: "This portfolio", href: null },
  ],
  learning: [
    { name: "Vector Databases", context: "Core-7 retrieval", href: "/work/core7" },
    { name: "Guardrail Middleware", context: "Core-7 security", href: "/work/core7" },
    { name: "Biomimetic Design", context: "Steel Raven", href: "/work/steel-raven" },
    { name: "CFRP Fabrication", context: "Steel Raven", href: "/work/steel-raven" },
  ],
  exposure: [
    { name: "n8n", context: "Workflow automation", href: null },
    { name: "Linux Scripting", context: "Development environment", href: null },
    { name: "Fusion 360", context: "Steel Raven CAD", href: "/work/steel-raven" },
    { name: "GitHub Actions", context: "CI/CD for this portfolio", href: null },
  ]
};

function SkillCard({ skill }: { skill: Skill }) {
  const content = (
    <>
      <p className="text-sm font-semibold text-slate-100 group-hover:text-amber-500 transition-colors">{skill.name}</p>
      <p className="text-xs text-slate-400 mt-1">{skill.context}</p>
    </>
  );

  if (skill.href) {
    return (
      <Link href={skill.href} className="p-3 border border-slate-800 rounded-lg hover:border-amber-500/50 group transition-colors block">
        {content}
      </Link>
    );
  }

  return (
    <div className="p-3 border border-slate-800 rounded-lg group">
      {content}
    </div>
  );
}

export function SkillsMatrix() {
  return (
    <section className="space-y-12">
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Can Build With</h3>
        <p className="text-sm text-slate-400 mb-4">Proven in production or substantial projects</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skills.build.map(skill => <SkillCard key={skill.name} skill={skill} />)}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Currently Learning</h3>
        <p className="text-sm text-slate-400 mb-4">Active exploration, not yet production-grade</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skills.learning.map(skill => <SkillCard key={skill.name} skill={skill} />)}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Exposure</h3>
        <p className="text-sm text-slate-400 mb-4">Used, but not claiming expertise</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skills.exposure.map(skill => <SkillCard key={skill.name} skill={skill} />)}
        </div>
      </div>
    </section>
  );
}
