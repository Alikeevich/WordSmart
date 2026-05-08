// src/pages/TopicSelection.tsx
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { topics, colorClasses } from '../data/topicContent';

interface TopicSelectionProps {
  title: string;
  basePath: string;
}

export default function TopicSelection({ title, basePath }: TopicSelectionProps) {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-10 text-center md:text-left">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent font-bold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Назад в Дашборд
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          {title} <span className="text-accent italic">— Выбор темы</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          Выбери тему, чтобы начать задание.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {topics.map(t => {
          const colors = colorClasses[t.color];
          return (
            <Link 
              key={t.id} 
              to={`${basePath}/${t.id}`} 
              className={`group p-6 rounded-[2rem] border ${colors.border} ${colors.bgLight} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                {t.emoji}
              </div>
              <h3 className={`font-bold text-xl mb-1 ${colors.text}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {t.nameEn}
              </h3>
              <p className="text-sm font-bold text-slate-600 mb-3">{t.nameRu}</p>
              <p className="text-xs font-medium text-slate-500/80 mt-auto leading-relaxed">
                {t.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
