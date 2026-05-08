// src/pages/FinalTest.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { wordPairs } from '../data/wordPairs';

const EXAM_LENGTH = 10;

export default function FinalTest() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const[score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Генерируем 10 случайных вопросов
  useEffect(() => {
    const mixed = [...wordPairs].sort(() => 0.5 - Math.random()).slice(0, EXAM_LENGTH);
    const generated = mixed.map(word => {
      // 50/50 - Спросить про эвфемизм или дисфемизм
      const isEuph = Math.random() > 0.5;
      const correctAnswer = isEuph ? word.euphemism : word.dysphemism;
      
      // Генерируем неправильные ответы (берем из других слов)
      const wrongWords = wordPairs.filter(w => w.id !== word.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      const wrongAnswers = wrongWords.map(w => isEuph ? w.euphemism : w.dysphemism);
      
      return {
        question: `Какое слово является ${isEuph ? 'эвфемизмом' : 'дисфемизмом'} (оттенок: ${isEuph ? 'мягко' : 'грубо'}) для слова "${word.neutral}"?`,
        options:[...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random()),
        correct: correctAnswer
      };
    });
    setQuestions(generated);
  },[]);

  const handleSelect = async (opt: string) => {
    const isCorrect = opt === questions[currentIdx].correct;
    if (isCorrect) setScore(prev => prev + 1);

    if (currentIdx + 1 < EXAM_LENGTH) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      if (user) {
        await supabase.from('progress').insert([{
          user_id: user.id, module: 'diploma', exercise_type: 'final_test',
          score: score + (isCorrect ? 1 : 0), total_questions: EXAM_LENGTH
        }]);
      }
    }
  };

  if (questions.length === 0) return <div>Загрузка экзамена...</div>;

  if (isFinished) {
    const passed = score >= 7;
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in zoom-in">
        <div className="bg-white border border-slate-200 p-10 rounded-[2rem] text-center max-w-lg w-full shadow-2xl relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-3 ${passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <Award className={`w-20 h-20 mx-auto mb-6 ${passed ? 'text-green-500' : 'text-red-500'}`} />
          <h2 className="text-4xl font-black text-slate-800 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {passed ? 'Экзамен сдан!' : 'Нужно еще потренироваться'}
          </h2>
          <p className="text-slate-500 font-medium mb-8">
            {passed ? 'Ты доказал, что отлично чувствуешь оттенки английского языка.' : 'Повтори теорию в разделе Vocabulary и возвращайся.'}
          </p>
          
          <div className={`p-6 rounded-2xl mb-8 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-sm uppercase tracking-widest font-bold mb-1 opacity-50">Оценка</div>
            <div className={`text-6xl font-black ${passed ? 'text-green-600' : 'text-red-600'}`}>{score}<span className="text-3xl opacity-50">/10</span></div>
          </div>

          <Link to="/" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            В главное меню <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold text-sm mb-4">
          <ShieldCheck className="w-4 h-4" /> Финальный экзамен (Без подсказок!)
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-orange-500 transition-all" style={{ width: `${(currentIdx / EXAM_LENGTH) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200 mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{q.question}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {q.options.map((opt: string, idx: number) => (
          <button key={idx} onClick={() => handleSelect(opt)} className="p-6 bg-white border-2 border-slate-200 rounded-2xl font-bold text-lg text-slate-700 hover:border-orange-400 hover:bg-orange-50 transition-all text-left">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}