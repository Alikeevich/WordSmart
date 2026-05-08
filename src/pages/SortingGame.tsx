// src/pages/SortingGame.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Zap, ArrowRight, Trophy, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sortingWords } from '../data/wordPairs';

const WORDS_PER_GAME = 10;

interface AnswerRecord {
  questionId: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export default function SortingGame() {
  const { user } = useAuth();
  const [gameWords, setGameWords] = useState<typeof sortingWords>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [status, setStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [animatingState, setAnimatingState] = useState<'none' | 'success' | 'shake'>('none');

  useEffect(() => {
    if (status === 'idle') {
      const shuffled = [...sortingWords].sort(() => 0.5 - Math.random()).slice(0, WORDS_PER_GAME);
      setGameWords(shuffled);
    }
  }, [status]);

  const currentWord = gameWords[currentIndex];
  const progress = (currentIndex / WORDS_PER_GAME) * 100;

  const handleAnswer = (selectedType: 'euphemism' | 'dysphemism') => {
    if (animatingState !== 'none' || !currentWord) return;

    const isCorrect = currentWord.type === selectedType;

    // Сохраняем детальный ответ
    const newAnswer: AnswerRecord = {
      questionId: currentIndex + 1,
      question: `Is "${currentWord.word}" a euphemism or dysphemism? (neutral: ${currentWord.neutral})`,
      userAnswer: selectedType,
      correctAnswer: currentWord.type,
      isCorrect,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnimatingState('success');
    } else {
      setAnimatingState('shake');
    }

    setTimeout(() => {
      setAnimatingState('none');
      if (currentIndex + 1 < WORDS_PER_GAME) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setStatus('finished');
        if (user) {
          supabase.from('progress').insert([{
            user_id: user.id,
            module: 'vocab',
            exercise_type: 'sorting',
            score: score + (isCorrect ? 1 : 0),
            total_questions: WORDS_PER_GAME,
            answers: updatedAnswers,
          }]).then();
        }
      }
    }, 400);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setStatus('idle');
  };

  if (status === 'idle') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-noise px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full blur-2xl opacity-50" />
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Sorting <span className="text-accent italic">Words</span>
          </h1>
          <p className="text-slate-600 mb-8 font-medium">
            Раскидай случайные {WORDS_PER_GAME} слов по двум колонкам. Будь осторожен, не перепутай деликатность с грубостью!
          </p>
          <button onClick={() => setStatus('playing')} className="w-full bg-slate-900 text-white text-lg font-bold py-4 rounded-xl hover:bg-accent transition-colors flex items-center justify-center gap-2 group">
            Начать испытание <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-noise px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-xl text-center">
          <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-bold mb-2 text-slate-800" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Урок окончен!
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Твой результат: <strong className="text-accent text-2xl">{score}</strong> из {WORDS_PER_GAME}
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={restartGame} className="w-full bg-slate-100 text-slate-800 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" /> Пройти ещё раз
            </button>
            <Link to="/vocab" className="w-full bg-accent text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              Вернуться к теории
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-noise flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">
          <span>Прогресс</span><span>{currentIndex + 1} / {WORDS_PER_GAME}</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="relative w-full max-w-lg mb-16 perspective-1000">
        <div className={`w-full bg-white border-2 border-slate-200 rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 ${animatingState === 'shake' ? 'animate-shake' : ''} ${animatingState === 'success' ? 'animate-success' : ''}`}>
          <span className="text-slate-400 font-semibold uppercase tracking-widest text-sm mb-4">Что это за слово?</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{currentWord.word}</h2>
          <p className="text-lg text-slate-500 font-medium">{currentWord.translation}</p>
          <p className="text-sm text-slate-400 mt-2">(Нейтрально: {currentWord.neutral})</p>
        </div>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={() => handleAnswer('euphemism')} disabled={animatingState !== 'none'} className="group relative flex flex-col items-center justify-center p-6 bg-[#DCFCE7] border border-[#86EFAC] rounded-[2.5rem] hover:shadow-[0_10px_40px_rgb(22,163,74,0.3)] transition-all duration-300 hover:-translate-y-2 active:translate-y-0">
          <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:rotate-12 transition-transform duration-300"><Sparkles className="w-6 h-6 text-green-600" /></div>
          <span className="text-green-800 font-bold text-xl tracking-wide">Euphemism</span>
        </button>
        <button onClick={() => handleAnswer('dysphemism')} disabled={animatingState !== 'none'} className="group relative flex flex-col items-center justify-center p-6 bg-[#FEE2E2] border-4 border-[#B91C1C] rounded-none hover:shadow-[-12px_12px_0px_#B91C1C] transition-all duration-200 hover:-translate-y-2 hover:translate-x-2 active:translate-y-0 active:translate-x-0">
          <div className="bg-[#B91C1C] p-2 mb-3 group-hover:-skew-x-12 transition-transform duration-200"><Zap className="w-6 h-6 text-white" /></div>
          <span className="text-red-900 font-black text-xl uppercase tracking-widest">Dysphemism</span>
        </button>
      </div>
    </div>
  );
}