// src/pages/TeacherStudents.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  BookUser, Trophy, Activity, Clock, Search, ArrowUpDown,
  GraduationCap, ChevronRight, TrendingUp,
} from 'lucide-react';

interface StudentRow {
  id: string;
  email: string;
  full_name: string;
  totalXP: number;
  exercises: number;
  avgPercent: number;
  lastActivity: string | null;
}

type SortBy = 'name' | 'xp' | 'exercises' | 'recent' | 'percent';

export default function TeacherStudents() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('xp');

  useEffect(() => {
    async function loadStudents() {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('role', 'student');

      if (!profiles) { setLoading(false); return; }

      const ids = profiles.map(p => p.id);
      const { data: progress } = await supabase
        .from('progress')
        .select('user_id, score, total_questions, created_at')
        .in('user_id', ids);

      const rows: StudentRow[] = profiles.map(p => {
        const userProgress = (progress || []).filter(pr => pr.user_id === p.id);
        const totalXP = userProgress.reduce((sum, pr) => sum + (pr.score || 0), 0);
        const exercises = userProgress.length;
        const lastActivity = userProgress.length > 0
          ? userProgress.map(pr => pr.created_at).sort().reverse()[0]
          : null;
        const avgPercent = exercises > 0
          ? Math.round((userProgress.reduce((acc, pr) => acc + (pr.total_questions ? (pr.score / pr.total_questions) : 0), 0) / exercises) * 100)
          : 0;
        return {
          id: p.id,
          email: p.email,
          full_name: p.full_name || '—',
          totalXP, exercises, avgPercent, lastActivity,
        };
      });

      setStudents(rows);
      setLoading(false);
    }
    loadStudents();
  }, []);

  const filteredAndSorted = students
    .filter(s =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':      return a.full_name.localeCompare(b.full_name);
        case 'xp':        return b.totalXP - a.totalXP;
        case 'exercises': return b.exercises - a.exercises;
        case 'percent':   return b.avgPercent - a.avgPercent;
        case 'recent':
          if (!a.lastActivity) return 1;
          if (!b.lastActivity) return -1;
          return b.lastActivity.localeCompare(a.lastActivity);
      }
    });

  const formatDate = (iso: string | null) => {
    if (!iso) return 'нет данных';
    const date = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diffDays === 0) return 'сегодня';
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const percentColor = (p: number) => {
    if (p >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (p >= 60) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (p >= 40) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 p-8 md:p-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border border-blue-100">
            <BookUser className="w-3.5 h-3.5" /> Мои ученики
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Прогресс класса
          </h1>
          <p className="text-slate-500 font-medium">
            {loading ? 'Загрузка...' : `Всего учеников: ${students.length}. Кликни на строку, чтобы увидеть детали.`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Найти по имени или email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-sm font-medium"
          />
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="pl-11 pr-8 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm font-bold appearance-none cursor-pointer min-w-[200px]"
          >
            <option value="xp">По очкам XP</option>
            <option value="percent">По среднему %</option>
            <option value="exercises">По кол-ву заданий</option>
            <option value="recent">По активности</option>
            <option value="name">По имени (А–Я)</option>
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center shadow-sm">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-accent rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center shadow-sm">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {search ? 'Никого не нашли' : 'Пока нет учеников'}
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            {search ? 'Попробуй другой запрос.' : 'Когда ученики зарегистрируются, они появятся здесь.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSorted.map(s => (
            <Link
              key={s.id}
              to={`/teacher/students/${s.id}`}
              className="group block bg-white border border-slate-100 rounded-2xl p-4 md:p-5 hover:shadow-md hover:border-blue-200 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-black text-lg">
                  {(s.full_name.charAt(0) || s.email.charAt(0)).toUpperCase()}
                </div>

                {/* Name + Email */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-base truncate">{s.full_name}</p>
                  <p className="text-xs text-slate-400 truncate">{s.email}</p>
                </div>

                {/* Stats — на mobile stack, на desktop в ряд */}
                <div className="hidden md:flex items-center gap-6 shrink-0">
                  <Stat label="XP"        icon={<Trophy className="w-3.5 h-3.5 text-orange-500" />} value={s.totalXP} />
                  <Stat label="Заданий"   icon={<Activity className="w-3.5 h-3.5 text-blue-500" />}  value={s.exercises} />
                  <div className="text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-md border ${percentColor(s.avgPercent)}`}>
                      <TrendingUp className="w-3 h-3" /> {s.avgPercent}%
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">Средний</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 min-w-[80px] justify-end">
                    <Clock className="w-3 h-3" /> {formatDate(s.lastActivity)}
                  </div>
                </div>

                <ChevronRight className="shrink-0 w-5 h-5 text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>

              {/* Mobile stats — отдельной строкой под именем */}
              <div className="md:hidden mt-3 flex flex-wrap gap-2">
                <span className="text-xs font-bold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {s.totalXP} XP
                </span>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                  <Activity className="w-3 h-3" /> {s.exercises}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1 border ${percentColor(s.avgPercent)}`}>
                  <TrendingUp className="w-3 h-3" /> {s.avgPercent}%
                </span>
                <span className="text-xs font-medium bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {formatDate(s.lastActivity)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, icon, value }: { label: string; icon: React.ReactNode; value: number | string }) {
  return (
    <div className="text-center">
      <div className="font-black text-slate-800 text-base flex items-center gap-1 justify-center">
        {icon}{value}
      </div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</p>
    </div>
  );
}