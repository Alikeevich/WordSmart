// src/pages/FillInTheGaps.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Trophy, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FILL_IN_GAPS_QUESTIONS } from '../lib/content';

export default function FillInTheGaps() {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const[score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const[isFinished, setIsFinished] = useState(false);

  const question = FILL_IN_GAPS_QUESTIONS[currentIdx];

  const handleWordClick = (word: string) => {
    if (isChecked) return;
    setSelectedWord(prev => prev === word ? null : word);
  };

  const handleCheck = () => {
    if (!selectedWord) return;
    setIsChecked(true);
    if (selectedWord === question.correctAnswer) setScore(prev => prev + 1);
  };

  const handleNext = async () => {
    if (currentIdx + 1 < FILL_IN_GAPS_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedWord(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
      if (user) {
        await supabase.from('progress').insert([{
          user_id: user.id, module: 'writing', exercise_type: 'fill_gaps',
          score: score + (selectedWord === question.correctAnswer ? 1 : 0),
          total_questions: FILL_IN_GAPS_QUESTIONS.length
        }]);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-200 text-center max-w-lg w-full">
          <Trophy className="w-16 h-16 text-slate-800 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Отличная работа!</h2>
          <p className="text-lg text-slate-500 mb-8 font-medium">Ты учишься чувствовать контекст.</p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mb-8">
            <span className="text-5xl font-black text-slate-900">{score}</span>
            <span className="text-2xl text-slate-400 font-bold"> / {FILL_IN_GAPS_QUESTIONS.length}</span>
          </div>
          <Link to="/" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            В главное меню <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const isCorrect = selectedWord === question.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-slate-800 transition-all duration-500" style={{ width: `${((currentIdx) / FILL_IN_GAPS_QUESTIONS.length) * 100}%` }}></div>
        </div>
        <span className="font-bold text-slate-400 text-sm tracking-widest uppercase">{currentIdx + 1} / {FILL_IN_GAPS_QUESTIONS.length}</span>
      </div>

      <div className="mb-12">
        <h3 className="text-lg font-bold text-slate-500 mb-2 uppercase tracking-wide">Задание</h3>
        <p className="text-2xl font-medium text-slate-800">{question.task}</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 mb-10">
        <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700 flex flex-wrap items-baseline gap-y-4">
          <span>{question.textBefore}</span>
          <div className={`inline-flex items-center justify-center min-w-[140px] h-[50px] md:h-[60px] px-6 mx-3 rounded-xl border-b-4 transition-all duration-300 ${!selectedWord ? 'border-slate-200 bg-slate-50' : isChecked ? (isCorrect ? 'border-green-500 bg-green-50 text-green-700 font-bold' : 'border-red-500 bg-red-50 text-red-700 font-bold line-through') : 'border-slate-800 bg-slate-100 text-slate-900 font-bold shadow-inner'}`}>
            {selectedWord ? selectedWord : <span className="text-slate-300">...</span>}
          </div>
          <span>{question.textAfter}</span>
        </div>
      </div>

      {!isChecked && (
        <div className="mb-10 animate-in fade-in duration-300">
          <div className="flex flex-wrap justify-center gap-4">
            {question.options.map((word, idx) => (
              <button key={idx} onClick={() => handleWordClick(word)} className={`px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-200 border-2 ${selectedWord === word ? 'border-slate-900 bg-slate-900 text-white shadow-lg scale-105' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50'}`}>
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {isChecked && (
        <div className="mb-10 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className={`p-6 rounded-2xl border flex gap-4 items-start ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />}
            <div>
              <h4 className={`font-bold text-lg mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Абсолютно верно!' : `Ошибка. Правильный ответ: ${question.correctAnswer}`}</h4>
              <p className={isCorrect ? 'text-green-700/80' : 'text-red-700/80'}>{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {!isChecked ? (
          <button onClick={handleCheck} disabled={!selectedWord} className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${selectedWord ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>Проверить</button>
        ) : (
          <button onClick={handleNext} className="px-10 py-4 rounded-xl font-bold text-lg bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg">Дальше <ArrowRight className="w-5 h-5" /></button>
        )}
      </div>
    </div>
  );
}