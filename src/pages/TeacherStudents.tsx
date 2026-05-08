// src/pages/TeacherStudentDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft, Trophy, Activity, Clock, TrendingUp, ChevronDown, ChevronUp,
  CheckCircle2, XCircle, BrainCircuit, PenTool, Target, Puzzle, Award,
} from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface ProgressRow {
  id: string;
  exercise_type: string;
  module: string;
  score: number;
  total_questions: number;
  answers: AnswerRecord[] | null;
  created_at: string;
}

interface AnswerRecord {
  questionId: number;
  question?: string;
  topic?: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const exerciseIcons: Record<string, React.ReactNode> = {
  multiple_choice: <BrainCircuit className="w-4 h-4" />,
  fill_gaps:       <PenTool className="w-4 h-4" />,
  sorting:         <Target className="w-4 h-4" />,
  matching:        <Puzzle className="w-4 h-4" />,
  final_test:      <Award className="w-4 h-4" />,
};

const exerciseLabels: Record<string, string> = {
  multiple_choice: 'Quiz',
  fill_gaps:       'Fill in Gaps',
  sorting:         'Sorting Game',
  matching:        'Matching',
  final_test:      'Final Test',
};

export default function TeacherStudentDetail() {
  const { studentId } = useParams<{ studentId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!studentId) return;

      const { data: p } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', studentId)
        .maybeSingle();
      setProfile(p);

      const { data: prog } = await supabase
        .from('progress')
        .select('id, exercise_type, module, score, total_questions, answers, created_at')
        .eq('user_id', studentId)
        .order('created_at', { ascending: false });

      setProgress((prog || []) as ProgressRow[]);
      setLoading(false);
    }
    load();
  }, [studentId]);

  if (!studentId) return <Navigate to="/teacher/students" replace />;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white p-10 rounded-[2rem] border border-slate-100 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Ученик не найден</h2>
        <Link to="/teacher/students" className="text-sm font-bold text-accent inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> К списку
        </Link>
      </div>
    );
  }

  // ── Агрегация ────────────────────────────────────────────────────────────
  const totalXP = progress.reduce((sum, p) => sum + (p.score || 0), 0);
  const totalQuestions = progress.reduce((sum, p) => sum + (p.total_questions || 0), 0);
  const totalCorrect = progress.reduce((sum, p) => sum + (p.score || 0), 0);
  const totalIncorrect = totalQuestions - totalCorrect;
  const avgPercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // По типам упражнений
  const byExerciseType: Record<string, { correct: number; total: number }> = {};
  progress.forEach(p => {
    const key = p.exercise_type;
    if (!byExerciseType[key]) byExerciseType[key] = { correct: 0, total: 0 };
    byExerciseType[key].correct += p.score;
    byExerciseType[key].total += p.total_questions;
  });

  // Часто-ошибочные вопросы (по answers)
  const wrongAnswers: AnswerRecord[] = [];
  progress.forEach(p => {
    if (Array.isArray(p.answers)) {
      p.answers.forEach(a => {
        if (a && a.isCorrect === false) wrongAnswers.push(a);
      });
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Link to="/teacher/students" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent text-sm font-bold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Все ученики
      </Link>

      {/* Header */}
      <div className="bg-white border border-blue-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-black text-2xl shrink-0">
            {(profile.full_name?.charAt(0) || profile.email.charAt(0)).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 truncate" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {profile.full_name || 'Без имени'}
            </h1>
            <p className="text-sm text-slate-400 truncate">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <BigStat icon={<Trophy className="w-4 h-4" />}     iconColor="text-orange-500" iconBg="bg-orange-50" value={totalXP}        label="Очков XP" />
          <BigStat icon={<Activity className="w-4 h-4" />}   iconColor="text-blue-500"   iconBg="bg-blue-50"   value={progress.length} label="Заданий" />
          <BigStat icon={<TrendingUp className="w-4 h-4" />} iconColor="text-emerald-500" iconBg="bg-emerald-50" value={`${avgPercent}%`} label="Средний %" />
          <BigStat icon={<XCircle className="w-4 h-4" />}    iconColor="text-red-500"    iconBg="bg-red-50"    value={totalIncorrect} label="Ошибок всего" />
        </div>
      </div>

      {progress.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center shadow-sm">
          <p className="text-slate-500 font-medium">Этот ученик ещё не выполнял заданий.</p>
        </div>
      ) : (
        <>
          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Donut: правильные / неправильные */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Соотношение ответов</h3>
              <div className="flex items-center gap-6">
                <DonutChart correct={totalCorrect} incorrect={totalIncorrect} />
                <div className="space-y-3 flex-1">
                  <LegendItem color="bg-emerald-500" label="Правильные" value={totalCorrect} percent={avgPercent} />
                  <LegendItem color="bg-red-400"     label="Неправильные" value={totalIncorrect} percent={100 - avgPercent} />
                </div>
              </div>
            </div>

            {/* Bar chart: успехи по типам упражнений */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Результаты по типам заданий</h3>
              <div className="space-y-3">
                {Object.entries(byExerciseType).map(([type, data]) => {
                  const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          {exerciseIcons[type]}
                          {exerciseLabels[type] || type}
                        </span>
                        <span className="text-slate-500">{data.correct}/{data.total} · {pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pct >= 80 ? 'bg-emerald-500' :
                            pct >= 60 ? 'bg-blue-500' :
                            pct >= 40 ? 'bg-amber-500' : 'bg-red-400'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Часто-ошибочные ответы */}
          {wrongAnswers.length > 0 && (
            <div className="bg-white border border-red-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5" /> Где ученик ошибается
              </h3>
              <div className="space-y-2">
                {wrongAnswers.slice(0, 8).map((a, i) => (
                  <div key={i} className="bg-red-50/50 border border-red-100 rounded-xl p-3 text-sm">
                    <div className="flex items-start gap-2 mb-1.5">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="font-bold text-slate-800 text-sm flex-1">
                        {a.question || `Вопрос #${a.questionId}`}
                      </p>
                    </div>
                    <div className="ml-6 text-xs space-y-0.5">
                      <p className="text-red-600">
                        <span className="font-bold">Ответил:</span> {a.userAnswer}
                      </p>
                      <p className="text-emerald-700">
                        <span className="font-bold">Верно:</span> {a.correctAnswer}
                      </p>
                      {a.topic && <p className="text-slate-400">Тема: {a.topic}</p>}
                    </div>
                  </div>
                ))}
                {wrongAnswers.length > 8 && (
                  <p className="text-xs text-slate-400 font-medium text-center pt-2">
                    + ещё {wrongAnswers.length - 8} ошибок (показаны последние)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* История заданий */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">История заданий</h3>
            <div className="space-y-2">
              {progress.map(p => {
                const pct = p.total_questions > 0 ? Math.round((p.score / p.total_questions) * 100) : 0;
                const isExpanded = expandedRow === p.id;
                const hasDetails = Array.isArray(p.answers) && p.answers.length > 0;

                return (
                  <div key={p.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => hasDetails && setExpandedRow(isExpanded ? null : p.id)}
                      disabled={!hasDetails}
                      className={`w-full p-4 flex items-center gap-3 text-left ${hasDetails ? 'hover:bg-slate-50 cursor-pointer' : 'cursor-default'} transition-colors`}
                    >
                      <div className="w-9 h-9 bg-blue-50 text-accent rounded-xl flex items-center justify-center shrink-0">
                        {exerciseIcons[p.exercise_type] || <Activity className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm">{exerciseLabels[p.exercise_type] || p.exercise_type}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3" /> {new Date(p.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-black text-sm text-slate-800">{p.score}/{p.total_questions || '?'}</p>
                          <p className={`text-[10px] font-bold ${
                            pct >= 80 ? 'text-emerald-600' :
                            pct >= 60 ? 'text-blue-600' :
                            pct >= 40 ? 'text-amber-600' : 'text-red-500'
                          }`}>
                            {pct}%
                          </p>
                        </div>
                        {hasDetails && (isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />)}
                      </div>
                    </button>

                    {isExpanded && hasDetails && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-2">
                        {p.answers!.map((a, idx) => (
                          <div key={idx} className={`flex gap-3 p-3 rounded-xl text-sm ${
                            a.isCorrect ? 'bg-emerald-50/60' : 'bg-red-50/60'
                          }`}>
                            {a.isCorrect ?
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> :
                              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            }
                            <div className="flex-1 min-w-0">
                              {a.question && <p className="font-bold text-slate-700 mb-1">{a.question}</p>}
                              <p className="text-xs">
                                <span className={a.isCorrect ? 'text-emerald-700' : 'text-red-600'}>
                                  Ответил: <strong>{a.userAnswer}</strong>
                                </span>
                                {!a.isCorrect && (
                                  <span className="text-emerald-700 ml-2">→ верно: <strong>{a.correctAnswer}</strong></span>
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!hasDetails && (
                      <p className="px-4 pb-3 text-[11px] text-slate-400 italic">
                        Детальные ответы для этого задания не сохранены (старая запись).
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BigStat({ icon, iconColor, iconBg, value, label }: {
  icon: React.ReactNode; iconColor: string; iconBg: string; value: string | number; label: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
      <div className={`w-8 h-8 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-2xl font-black text-slate-800">{value}</p>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-0.5">{label}</p>
    </div>
  );
}

function LegendItem({ color, label, value, percent }: { color: string; label: string; value: number; percent: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 ${color} rounded-sm shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{value} · {percent}%</p>
      </div>
    </div>
  );
}

// SVG donut chart — без библиотек.
function DonutChart({ correct, incorrect }: { correct: number; incorrect: number }) {
  const total = correct + incorrect;
  const correctPct = total > 0 ? (correct / total) : 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashCorrect = correctPct * circumference;

  return (
    <div className="relative shrink-0">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Bg ring */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#fecaca" strokeWidth="14" />
        {/* Correct arc */}
        {total > 0 && (
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="14"
            strokeDasharray={`${strokeDashCorrect} ${circumference}`}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-black text-slate-800 leading-none">{total > 0 ? Math.round(correctPct * 100) : 0}%</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">верно</p>
      </div>
    </div>
  );
}