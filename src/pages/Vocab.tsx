// src/pages/Vocab.tsx
import { useState } from 'react';
import { Sparkles, Zap, BookOpen } from 'lucide-react';
import { wordPairs, categoryLabels, Category } from '../data/wordPairs';
import { EUPHEMISMS_THEORY } from '../lib/content';

export default function Vocab() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredWords = activeCategory === 'all' 
    ? wordPairs 
    : wordPairs.filter(w => w.category === activeCategory);

  return (
    <div className="min-h-[85vh] pb-20 animate-in fade-in duration-500">
      
      {/* Шапка */}
      <div className="pt-6 md:pt-8 pb-8 md:pb-12 px-4 md:px-0 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-slate-500 mb-4 md:mb-6 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" /> Модуль: Vocabulary
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 break-words" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Словарь оттенков
        </h1>
        <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto font-medium px-2">
          Изучи 100 реальных примеров того, как одно и то же слово может превратиться в деликатный эвфемизм или резкий дисфемизм.
        </p>
      </div>

      {/* Теория */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {EUPHEMISMS_THEORY.map((item) => (
          <div key={item.term} className={`p-5 md:p-6 rounded-2xl md:rounded-3xl border ${item.color === 'green' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            <h2 className={`text-lg md:text-xl font-bold mb-2 ${item.color === 'green' ? 'text-green-800' : 'text-red-800'}`}>{item.term}</h2>
            <p className={`text-xs md:text-sm font-medium ${item.color === 'green' ? 'text-green-700/80' : 'text-red-700/80'}`}>{item.definition}</p>
          </div>
        ))}
      </div>

      {/* Фильтр по категориям (горизонтальный скролл на мобилках) */}
      <div className="max-w-5xl mx-auto mb-6 md:mb-8">
        <div 
          className="overflow-x-auto pb-4 px-4 md:px-0 flex gap-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Прячет скроллбар в Firefox/IE
        >
          {/* Хак для Webkit: добавляем глобальный стиль прячущий скроллбар именно для этой линии */}
          <style>{`
            .overflow-x-auto::-webkit-scrollbar { display: none; }
          `}</style>
          
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-colors border shrink-0 ${
              activeCategory === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Все слова ({wordPairs.length})
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as Category)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-colors border shrink-0 ${
                activeCategory === key ? 'bg-accent text-white border-accent' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Список слов */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 space-y-4 md:space-y-6">
        {filteredWords.map((item) => (
          <div key={item.id} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
            
            {/* Заголовок карточки (Нейтральное слово) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-6 pb-5 md:pb-6 border-b border-slate-100">
              <div className="flex items-start sm:items-center gap-3 md:gap-4 w-full">
                {/* Иконка-буква */}
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold text-slate-400">
                  {item.neutral.charAt(0)}
                </div>
                
                {/* min-w-0 спасает от растягивания экрана длинными словами */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 break-words" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {item.neutral} 
                    <span className="block sm:inline text-xs md:text-sm text-slate-400 font-medium sm:ml-2 mt-0.5">({item.neutralTranslation})</span>
                  </h2>
                  <span className="inline-block mt-1.5 bg-slate-100 text-slate-500 text-[10px] md:text-xs px-2 py-1 rounded-md font-semibold uppercase tracking-wider">
                    {categoryLabels[item.category]}
                  </span>
                </div>
              </div>
            </div>

            {/* Карточки сравнения */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Эвфемизм */}
              <div className="euphemism-card p-4 md:p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Sparkles className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-bold text-green-700 text-[10px] md:text-xs uppercase tracking-wider">Эвфемизм</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-green-900 mb-1 break-words">{item.euphemism}</p>
                <p className="text-xs md:text-sm text-green-700 mb-2 md:mb-3 font-medium">{item.euphTranslation}</p>
                <p className="text-green-800/80 text-xs md:text-sm mt-auto">{item.euphDesc}</p>
              </div>

              {/* Дисфемизм */}
              <div className="dysphemism-card p-4 md:p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Zap className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-bold text-red-700 text-[10px] md:text-xs uppercase tracking-wider">Дисфемизм</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-red-950 mb-1 break-words">{item.dysphemism}</p>
                <p className="text-xs md:text-sm text-red-700 mb-2 md:mb-3 font-medium">{item.dyshTranslation}</p>
                <p className="text-red-900/80 text-xs md:text-sm mt-auto">{item.dyshDesc}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}