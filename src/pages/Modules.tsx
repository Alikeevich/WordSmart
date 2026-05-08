// src/pages/Modules.tsx
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Sparkles, Lock } from 'lucide-react';
import { modules, colorClasses, sectionLabels } from '../data/modules';

export default function Modules() {
  const regularModules = modules.filter(m => !m.isSpecial);
  const specialModules = modules.filter(m => m.isSpecial);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-sky-50 rounded-full blur-2xl opacity-50" />

        <div className="relative z-10 p-8 md:p-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border border-blue-100">
            <Layers className="w-3.5 h-3.5" /> All Modules
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Choose your module
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl">
            9 thematic modules + 1 special unit on euphemisms &amp; dysphemisms.
          </p>
        </div>
      </div>

      {/* Special module — Word Shades */}
      <div>
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">⭐ Special Module</h2>
        <div className="grid grid-cols-1 gap-5">
          {specialModules.map(mod => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </div>

      {/* Regular textbook modules */}
      <div>
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">📚 Textbook Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularModules.map(mod => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module: mod }: { module: typeof modules[0] }) {
  const colors = colorClasses[mod.color];
  const availableCount = mod.sections.filter(s => s.available).length;
  const totalCount = mod.sections.length;
  const isSpecial = mod.isSpecial;

  return (
    <Link
      to={`/modules/${mod.id}`}
      className={`group relative bg-white p-6 rounded-[2rem] border ${
        isSpecial ? 'border-cyan-200 shadow-md' : 'border-slate-100 shadow-sm'
      } hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 overflow-hidden`}
    >
      {/* Декоративное цветовое пятно */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bgLight} rounded-full opacity-60 blur-2xl`} />

      <div className="relative z-10 flex items-start justify-between">
        <div className={`${colors.bgLight} ${colors.text} ${colors.border} border w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200`}>
          {mod.emoji}
        </div>
        {mod.number !== null && (
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Module {mod.number}
          </span>
        )}
        {isSpecial && (
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
            Special
          </span>
        )}
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          {mod.title}
        </h3>
        <p className={`text-xs ${colors.text} font-bold mb-2 uppercase tracking-wide`}>{mod.subtitle}</p>
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3">{mod.description}</p>
      </div>

      {/* Секции */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {mod.sections.map(section => (
          <span
            key={section.type}
            className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 ${
              section.available
                ? `${colors.bgLight} ${colors.text}`
                : 'bg-slate-50 text-slate-300'
            }`}
          >
            {!section.available && <Lock className="w-2.5 h-2.5" />}
            {sectionLabels[section.type]}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400">
          {availableCount} of {totalCount} sections ready
        </span>
        <span className={`${colors.text} font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all`}>
          {isSpecial && <Sparkles className="w-3.5 h-3.5" />}
          Open <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}