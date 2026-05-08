// src/pages/MatchingGame.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getTopic } from '../data/topicContent';

interface AnswerRecord {
  questionId: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export default function MatchingGame() {
  const { user } = useAuth();
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topicId ? getTopic(topicId) : null;

  const [leftItems, setLeftItems]   = useState<{ id: number; text: string }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: number; text: string }[]>([]);

  const [selectedLeft, setSelectedLeft]   = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const[matchedIds, setMatchedIds]       = useState<number[]>([]);

  const [errors, setErrors]                       = useState(0);
  const [pairsWithErrors, setPairsWithErrors]     = useState<Set<number>>(new Set());
  const [isFinished, setIsFinished]               = useState(false);
  const [isSaving, setIsSaving]                   = useState(false);

  if (!topic) return <Navigate to="/matching" replace />;

  const pairsCount = leftItems.length;

  useEffect(() => {
    if (!topic) return;
    const randomPairs =[...topic.matchingPairs].sort(() => 0.5 - Math.random());
    setLeftItems(randomPairs.map(p => ({ id: p.id, text: p.left })));
    setRightItems(randomPairs.map(p => ({ id: p.id, text: p.right })).sort(() => 0.5 - Math.random()));
  }, [topic]);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      if (selectedLeft === selectedRight) {
        setTimeout(() => {
          setMatchedIds(prev => [...prev, selectedLeft]);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 300);
      } else {
        setErrors(prev => prev + 1);
        setPairsWithErrors(prev => {
          const next = new Set(prev);
          next.add(selectedLeft);
          next.add(selectedRight);
          return next;
        });
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
      }
    }
  },[selectedLeft, selectedRight]);

  useEffect(() => {
    if (pairsCount > 0 && matchedIds.length === pairsCount) {
      setIsFinished(true);
      saveProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedIds, pairsCount]);

  const finalScore = Math.max(0, pairsCount - errors);

  const saveProgress = async () => {
    if (!user) return;
    setIsSaving(true);

    const answers: AnswerRecord[] = leftItems.map(left => {
      const right = rightItems.find(r => r.id === left.id);
      const hadErrors = pairsWithErrors.has(left.id);
      return {
        questionId: left.id,
        question: `Match: "${left.text}" ↔ "${right?.text || '?'}"`,
        userAnswer: hadErrors ? 'matched with mistakes' : 'matched on first try',
        correctAnswer: 'matched on first try',
        isCorrect: !hadErrors,
      };
    });

    try {
      await supabase.from('progress').insert([{
        user_id: user.id,
        module: `vocab - ${topic.nameEn}`,
        exercise_type: 'matching',
        score: finalScore,
        total_questions: pairsCount,
        answers,
      }]);
    } catch (err) {
      console.error('Failed to save matching progress', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (pairsCount === 0) return <div className="p-10 text-center">В этой теме пока нет пар для сопоставления.</div>;

  if (isFinished) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center animate-in zoom-in duration-500 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-accent" />
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-black mb-2 text-slate-800" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Отлично!
          </h2>
          <p className="text-slate-500 font-medium mb-6">Ты нашёл все пары.</p>
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Идеальные пары</div>
            <div className="text-5xl font-black text-accent">{finalScore} <span className="text-2xl text-slate-400">/ {pairsCount}</span></div>
            <div className="text-sm text-slate-500 mt-2">
              {errors === 0 ? 'Без единой ошибки!' : `Ошибок: ${errors}`}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" /> Заново
            </button>
            <Link to="/matching" className="flex-1 bg-accent text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              К выбору темы <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {isSaving && <p className="text-xs text-slate-400 mt-4">Сохраняем результат...</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Тема: <span className="text-accent italic">{topic.nameRu}</span>
        </h1>
        <p className="text-slate-600 font-medium text-lg">
          Соедини нейтральное слово слева с его эвфемизмом справа.
        </p>
        {errors > 0 && (
          <p className="text-xs text-slate-400 mt-2 font-medium">Ошибок: {errors}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-12 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
        <div className="space-y-4">
          <h3 className="text-center font-bold text-slate-400 uppercase tracking-widest text-sm mb-6">Нейтрально</h3>
          {leftItems.map(item => {
            const isSelected = selectedLeft === item.id;
            const isMatched = matchedIds.includes(item.id);
            const isError = selectedLeft === item.id && selectedRight !== null && selectedLeft !== selectedRight;
            return (
              <div
                key={`left-${item.id}`}
                onClick={() => !isMatched && setSelectedLeft(item.id)}
                className={`match-card ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''} ${isError ? 'animate-shake animate-flash-red' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.text}</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-4">
          <h3 className="text-center font-bold text-green-600 uppercase tracking-widest text-sm mb-6">Эвфемизм</h3>
          {rightItems.map(item => {
            const isSelected = selectedRight === item.id;
            const isMatched = matchedIds.includes(item.id);
            const isError = selectedRight === item.id && selectedLeft !== null && selectedLeft !== selectedRight;
            return (
              <div
                key={`right-${item.id}`}
                onClick={() => !isMatched && setSelectedRight(item.id)}
                className={`match-card ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''} ${isError ? 'animate-shake animate-flash-red' : ''}`}
              >
                <div className="flex items-center justify-between">
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  <span>{item.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
