// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, PenTool, Target, Puzzle, BrainCircuit,
  Trophy, ArrowRight, Activity, Clock, Star, Zap, CheckCircle, Award, BookUser, Users,
} from 'lucide-react';

const modules = [
  { id: 'vocab', name: 'Vocabulary', description: 'Изучи слова и их оттенки', path: '/vocab',
    icon: <BookOpen className="w-5 h-5" />, accent: 'text-blue-600', accentBg: 'bg-blue-50', accentBorder: 'border-blue-100', tag: 'Теория' },
  { id: 'sorting', name: 'Sorting Game', description: 'Сортируй слова по типу', path: '/sorting',
    icon: <Target className="w-5 h-5" />, accent: 'text-sky-600', accentBg: 'bg-sky-50', accentBorder: 'border-sky-100', tag: 'Игра' },
  { id: 'matching', name: 'Matching', description: 'Найди правильную пару', path: '/matching',
    icon: <Puzzle className="w-5 h-5" />, accent: 'text-cyan-600', accentBg: 'bg-cyan-50', accentBorder: 'border-cyan-100', tag: 'Пары' },
  { id: 'writing', name: 'Fill in the Gaps', description: 'Вставь нужное слово в текст', path: '/writing',
    icon: <PenTool className="w-5 h-5" />, accent: 'text-indigo-600', accentBg: 'bg-indigo-50', accentBorder: 'border-indigo-100', tag: 'Письмо' },
  { id: 'quiz', name: 'Quiz', description: 'Проверь свои знания', path: '/quiz',
    icon: <BrainCircuit className="w-5 h-5" />, accent: 'text-violet-600', accentBg: 'bg-violet-50', accentBorder: 'border-violet-100', tag: 'Тест' },
];

const exerciseIcons: Record<string, React.ReactNode> = {
  fill_gaps: <PenTool className="w-4 h-4" />,
  matching: <Puzzle className="w-4 h-4" />,
  multiple_choice: <BrainCircuit className="w-4 h-4" />,
  sorting: <Target className="w-4 h-4" />,
  final_test: <Award className="w-4 h-4" />,
};

const exerciseLabels: Record<string, string> = {
  fill_gaps: 'Fill in Gaps',
  matching: 'Matching',
  multiple_choice: 'Quiz',
  sorting: 'Sorting',
  final_test: 'Final Exam',
};

const calculateLevel = (xp: number) => {
  if (xp < 20) return { name: "Новичок", color: "text-slate-500", bg: "bg-slate-100" };
  if (xp < 50) return { name: "Исследователь", color: "text-blue-600", bg: "bg-blue-100" };
  if (xp < 100) return { name: "Мастер нюансов", color: "text-purple-600", bg: "bg-purple-100" };
  return { name: "Лингвистический ниндзя", color: "text-orange-600", bg: "bg-orange-100" };
};

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null; role: string } | null>(null);
  const [stats, setStats] = useState({ totalXP: 0, exercises: 0, streak: 0, recent: [] as any[] });
  const [classStats, setClassStats] = useState({ studentCount: 0, totalExercises: 0, avgScore: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const { data: p } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).maybeSingle();
      setProfile(p ?? { full_name: 'Студент', role: 'student' });

      if (p?.role === 'teacher') {
        // Class-level stats для учителя
        const { data: students } = await supabase.from('profiles').select('id').eq('role', 'student');
        const studentIds = students?.map(s => s.id) ?? [];
        const { data: allProgress } = await supabase
          .from('progress')
          .select('score, total_questions')
          .in('user_id', studentIds);

        const totalExercises = allProgress?.length ?? 0;
        const avgScore = totalExercises > 0
          ? Math.round((allProgress!.reduce((acc, p) => acc + (p.total_questions ? (p.score / p.total_questions) : 0), 0) / totalExercises) * 100)
          : 0;

        setClassStats({
          studentCount: students?.length ?? 0,
          totalExercises,
          avgScore,
        });
      } else {
        // Personal stats для ученика
        const { data: prog } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (prog) {
          setStats({
            totalXP: prog.reduce((acc, curr) => acc + (curr.score || 0), 0),
            exercises: prog.length,
            streak: Math.min(prog.length, 7),
            recent: prog.slice(0, 4),
          });
        }
      }

      setLoading(false);
    }
    loadData();
  }, [user]);

  const firstName = profile?.full_name?.split(' ')[0] || 'Студент';
  const isTeacher = profile?.role === 'teacher';

  // ─── Дэшборд УЧИТЕЛЯ ───────────────────────────────────────────
  if (isTeacher) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="relative bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-20 w-48 h-48 bg-sky-50 rounded-full blur-2xl opacity-50" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
              <BookUser className="w-3.5 h-3.5" /> Дэшборд учителя
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Здравствуйте, {loading ? '...' : firstName}!
            </h1>
            <p className="text-slate-500 italic font-medium mb-6">Expanding vocabulary in a smart way.</p>

            <div className="flex flex-wrap gap-4">
              <StatCard icon={<Users className="w-5 h-5" />}    iconBg="bg-blue-100"    iconColor="text-blue-600"    value={classStats.studentCount}   label="Учеников" />
              <StatCard icon={<Activity className="w-5 h-5" />} iconBg="bg-emerald-100" iconColor="text-emerald-600" value={classStats.totalExercises} label="Заданий выполнено" />
              <StatCard icon={<Trophy className="w-5 h-5" />}   iconBg="bg-amber-100"   iconColor="text-amber-500"   value={`${classStats.avgScore}%`} label="Средний результат" />
            </div>
          </div>
        </div>

        {/* CTA — список учеников */}
        <Link
          to="/teacher/students"
          className="block bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 border border-blue-100 rounded-[2rem] p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-white border border-blue-200 p-3 rounded-2xl shadow-sm">
                <BookUser className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-slate-800 font-bold text-lg" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Прогресс учеников
                </h3>
                <p className="text-slate-500 text-sm font-medium">Смотри, кто с чем справляется и где нужно подтянуть.</p>
              </div>
            </div>
            <span className="shrink-0 bg-accent text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-accent/30 flex items-center gap-2">
              Открыть <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Просмотр заданий */}
        <div>
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Просмотр заданий ученика</h2>
          <p className="text-sm text-slate-500 font-medium mb-5">Открой любой модуль, чтобы пройти его как ученик и понять, что они проходят:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {modules.map((mod) => (
              <Link key={mod.id} to={mod.path} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className={`${mod.accentBg} ${mod.accent} ${mod.accentBorder} border w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    {mod.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${mod.accent} ${mod.accentBg} px-2.5 py-1 rounded-full border ${mod.accentBorder}`}>
                    {mod.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">{mod.name}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{mod.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Дэшборд УЧЕНИКА (без изменений) ───────────────────────────
  const level = calculateLevel(stats.totalXP);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="relative bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-sky-50 rounded-full blur-2xl opacity-50" />

        <div className="relative z-10 p-8 md:p-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
            <Star className="w-3.5 h-3.5 fill-blue-600" /> Дэшборд
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Привет, {loading ? '...' : firstName}!
          </h1>
          <p className="text-slate-500 italic font-medium mb-5">Expanding vocabulary in a smart way.</p>

          <div className={`inline-block px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-widest mb-6 ${level.bg} ${level.color}`}>
            Ранг: {level.name}
          </div>

          <div className="flex flex-wrap gap-4">
            <StatCard icon={<Trophy className="w-5 h-5" />}   iconBg="bg-orange-100" iconColor="text-orange-600" value={stats.totalXP}    label="Очков XP" />
            <StatCard icon={<Activity className="w-5 h-5" />} iconBg="bg-blue-100"   iconColor="text-blue-600"   value={stats.exercises}  label="Заданий" />
            <StatCard icon={<Zap className="w-5 h-5" />}      iconBg="bg-amber-100"  iconColor="text-amber-500"  value={stats.streak}     label="Серия дней" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Учебный план</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {modules.map((mod) => (
            <Link key={mod.id} to={mod.path} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`${mod.accentBg} ${mod.accent} ${mod.accentBorder} border w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  {mod.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${mod.accent} ${mod.accentBg} px-2.5 py-1 rounded-full border ${mod.accentBorder}`}>
                  {mod.tag}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">{mod.name}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{mod.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-white border border-orange-200 p-3 rounded-2xl shadow-sm">
            <Award className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-lg">Готов к испытанию?</h3>
            <p className="text-slate-500 text-sm font-medium">Пройди финальный тест, чтобы подтвердить свои знания эвфемизмов.</p>
          </div>
        </div>
        <Link to="/test" className="shrink-0 bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-orange-600/30 hover:bg-orange-700 transition-all flex items-center gap-2">
          Сдать экзамен <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="bg-white border border-blue-100 rounded-[2.5rem] p-8 shadow-sm">
        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Последние успехи
        </h3>
        <div className="space-y-3">
          {stats.recent.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Здесь появится история твоих заданий</p>
            </div>
          ) : (
            stats.recent.map((rec: any, i: number) => (
              <div key={rec.id || i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50/40 hover:border-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
                    {exerciseIcons[rec.exercise_type] || <BookOpen className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{exerciseLabels[rec.exercise_type] || rec.module}</p>
                    <p className="text-xs text-slate-400">{rec.total_questions ? `${rec.score} из ${rec.total_questions} правильно` : `Результат: ${rec.score}`}</p>
                  </div>
                </div>
                <span className="bg-white px-4 py-1.5 rounded-full font-black text-blue-600 shadow-sm text-sm border border-blue-100">
                  +{rec.score} XP
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, iconColor, value, label }: any) {
  return (
    <div className="bg-white border border-blue-50 shadow-sm p-5 rounded-3xl flex items-center gap-4 min-w-[150px]">
      <div className={`${iconBg} ${iconColor} p-3 rounded-2xl`}>{icon}</div>
      <div>
        <div className="text-2xl font-black text-slate-800">{value}</div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}