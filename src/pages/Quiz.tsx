// src/pages/Quiz.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QUIZ_QUESTIONS } from '../lib/content';

export default function Quiz() {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const[score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const[isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === question.correct) setScore(prev => prev + 1);
  };

  const handleNext = async () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      if (user) {
        await supabase.from('progress').insert([{
          user_id: user.id, module: 'reading', exercise_type: 'multiple_choice',
          score: score + (selectedOption === question.correct ? 1 : 0),
          total_questions: QUIZ_QUESTIONS.length
        }]);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-white border border-slate-200 p-10 rounded-[2rem] text-center max-w-lg w-full">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-slate-800 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Тест завершен!</h2>
          <p className="text-lg text-slate-600 mb-8 font-medium">Твои знания становятся все крепче.</p>
          <div className="bg-primary/30 p-6 rounded-2xl mb-8">
            <span className="text-5xl font-black text-accent">{score}</span>
            <span className="text-2xl text-slate-400 font-bold"> / {QUIZ_QUESTIONS.length}</span>
          </div>
          <Link to="/" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            Вернуться в Дашборд <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 bg-slate-200 h-3 rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${((currentIdx) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
        </div>
        <span className="font-bold text-slate-400">Вопрос {currentIdx + 1}/{QUIZ_QUESTIONS.length}</span>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{question.question}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((opt, idx) => {
          let stateClass = "bg-white border-slate-200 text-slate-700 hover:border-accent hover:shadow-md hover:-translate-y-1";
          if (showExplanation) {
            if (idx === question.correct) stateClass = "bg-green-100 border-green-400 text-green-800 scale-[1.02] shadow-lg";
            else if (idx === selectedOption) stateClass = "bg-red-100 border-red-400 text-red-800 opacity-80 animate-shake";
            else stateClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed";
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={showExplanation} className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 text-left ${stateClass}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${showExplanation && idx === question.correct ? 'bg-green-500 text-white' : showExplanation && idx === selectedOption ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {['A', 'B', 'C', 'D'][idx]}
                </div>
                {opt}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-6 flex gap-4">
            <BookOpen className="w-6 h-6 text-accent flex-shrink-0" />
            <p className="text-blue-900 font-medium">{question.explanation}</p>
          </div>
          <button onClick={handleNext} className="w-full py-4 bg-accent text-white text-xl font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-accent/20">
            Следующий вопрос <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}