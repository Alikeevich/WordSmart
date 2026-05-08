// src/pages/ModuleDetail.tsx
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, BookText, Headphones, PenTool, Mic, Lock, ArrowRight, Sparkles,
} from 'lucide-react';
import {
  getModuleById, colorClasses, sectionLabels, sectionDescriptions, SectionType,
} from '../data/modules';

const sectionIcons: Record<SectionType, React.ReactNode> = {
  vocab: <BookOpen className="w-6 h-6" />,
  reading: <BookText className="w-6 h-6" />,
  listening: <Headphones className="w-6 h-6" />,
  writing: <PenTool className="w-6 h-6" />,
  speaking: <Mic className="w-6 h-6" />,
};

// Маппинг секций Word Shades на старые маршруты, чтобы не сломать
// существующий функционал, пока в Этапе 2 не переедем на новую систему.
const wordShadesLegacyRoutes: Partial<Record<SectionType, string>> = {
  vocab: '/legacy/vocab',
  writing: '/legacy/writing',
};

export default function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const mod = moduleId ? getModuleById(moduleId) : undefined;

  if (!mod) return <Navigate to="/modules" replace />;

  const colors = colorClasses[mod.color];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Back link */}
      <Link to="/modules" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent text-sm font-bold transition-colors">
        <ArrowLeft className="w-4 h-4" /> All modules
      </Link>

      {/* Module header */}
      <div className={`relative ${colors.bgLight} border ${colors.border} rounded-[2.5rem] overflow-hidden p-8 md:p-12`}>
        <div className={`absolute -top-20 -right-20 w-72 h-72 ${colors.bg} rounded-full blur-3xl opacity-10`} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
          <div className={`shrink-0 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-md`}>
            {mod.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              {mod.number !== null && (
                <span className={`${colors.text} text-xs font-black uppercase tracking-widest`}>
                  Module {mod.number}
                </span>
              )}
              {mod.isSpecial && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-cyan-600 bg-white px-2.5 py-1 rounded-full border border-cyan-200">
                  <Sparkles className="w-3 h-3" /> Special
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {mod.title}
            </h1>
            <p className={`${colors.text} font-bold text-lg mb-4`}>{mod.subtitle}</p>
            <p className="text-slate-600 font-medium mb-5 max-w-2xl">{mod.description}</p>

            {/* Topics */}
            <div className="flex flex-wrap gap-2">
              {mod.topics.map(topic => (
                <span key={topic} className={`text-xs font-bold ${colors.bgLight} ${colors.text} px-3 py-1.5 rounded-lg border ${colors.border}`}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div>
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">
          Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mod.sections.map(section => {
            const isAvailable = section.available;
            // Для Word Shades — линкуем на старые маршруты пока что
            const legacyPath = mod.id === 'word-shades' ? wordShadesLegacyRoutes[section.type] : null;
            const targetPath = legacyPath || `/modules/${mod.id}/${section.type}`;

            const cardContent = (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isAvailable
                      ? `${colors.bgLight} ${colors.text} ${colors.border} border`
                      : 'bg-slate-50 text-slate-300 border border-slate-200'
                  }`}>
                    {isAvailable ? sectionIcons[section.type] : <Lock className="w-5 h-5" />}
                  </div>
                  {!isAvailable && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isAvailable ? 'text-slate-800' : 'text-slate-400'}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {sectionLabels[section.type]}
                </h3>
                <p className={`text-sm font-medium leading-relaxed mb-4 ${isAvailable ? 'text-slate-500' : 'text-slate-400'}`}>
                  {sectionDescriptions[section.type]}
                </p>
                {isAvailable && (
                  <span className={`${colors.text} font-bold text-sm flex items-center gap-1`}>
                    Start <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </>
            );

            return isAvailable ? (
              <Link
                key={section.type}
                to={targetPath}
                className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={section.type}
                className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 cursor-not-allowed opacity-70"
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}