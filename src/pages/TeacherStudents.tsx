// src/pages/TeacherStudents.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BookUser, Trophy, Activity, Clock, Search, ArrowUpDown, GraduationCap } from 'lucide-react';

interface StudentRow {
  id: string;
  email: string;
  full_name: string;
  totalXP: number;
  exercises: number;
  lastActivity: string | null;
}

type SortBy = 'name' | 'xp' | 'exercises' | 'recent';

export default function TeacherStudents() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('xp');

  useEffect(() => {
    async function loadStudents() {
      // 1. Все профили с ролью student (благодаря RLS, учитель видит всех студентов)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('role', 'student');

      if (!profiles) {
        setLoading(false);
        return;
      }

      // 2. Прогресс всех студентов
      const ids = profiles.map(p => p.id);
      const { data: progress } = await supabase
        .from('progress')
        .select('user_id, score, created_at')
        .in('user_id', ids);

      // 3. Агрегируем
      const rows: StudentRow[] = profiles.map(p => {
        const userProgress = (progress || []).filter(pr => pr.user_id === p.id);
        const totalXP = userProgress.reduce((sum, pr) => sum + (pr.score || 0), 0);
        const exercises = userProgress.length;
        const lastActivity = userProgress.length > 0
          ? userProgress.map(pr => pr.created_at).sort().reverse()[0]
          : null;
        return {
          id: p.id,
          email: p.email,
          full_name: p.full_name || '—',
          totalXP,
          exercises,
          lastActivity,
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
        case 'recent':
          if (!a.lastActivity) return 1;
          if (!b.lastActivity) return -1;
          return b.lastActivity.localeCompare(a.lastActivity);
      }
    });

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'сегодня';
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative bg-white border border-orange-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 p-8 md:p-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border border-orange-100">
            <BookUser className="w-3.5 h-3.5" /> Мои ученики
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Прогресс класса
          </h1>
          <p className="text-slate-500 font-medium">
            {loading ? 'Загрузка...' : `Всего учеников: ${students.length}`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Найти ученика по имени или email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-sm font-medium"
          />
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="pl-11 pr-8 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm font-bold appearance-none cursor-pointer min-w-[180px]"
          >
            <option value="xp">По очкам XP</option>
            <option value="exercises">По заданиям</option>
            <option value="recent">По активности</option>
            <option value="name">По имени (A-Я)</option>
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white p-10 rounded-[2rem] border border-slate-100 text-center">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {search ? 'Никого не нашли' : 'Пока нет учеников'}
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            {search ? 'Попробуйте другой запрос.' : 'Когда ученики зарегистрируются, они появятся здесь.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100">
              <div className="col-span-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ученик</div>
              <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">XP</div>
              <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Заданий</div>
              <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Активность</div>
            </div>
            {filteredAndSorted.map((s, idx) => (
              <div key={s.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-orange-50/30 transition-colors ${idx > 0 ? 'border-t border-slate-100' : ''}`}>
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black text-sm shrink-0">
                    {s.full_name.charAt(0).toUpperCase() || s.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{s.full_name}</p>
                    <p className="text-xs text-slate-400 truncate">{s.email}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-black text-sm">
                    <Trophy className="w-3 h-3" /> {s.totalXP}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="inline-flex items-center gap-1 text-slate-600 font-bold text-sm">
                    <Activity className="w-3 h-3 text-blue-500" /> {s.exercises}
                  </span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium text-sm">
                    <Clock className="w-3 h-3" /> {formatDate(s.lastActivity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredAndSorted.map(s => (
              <div key={s.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black shrink-0">
                    {s.full_name.charAt(0).toUpperCase() || s.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{s.full_name}</p>
                    <p className="text-xs text-slate-400 truncate">{s.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> {s.totalXP} XP
                  </span>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {s.exercises} заданий
                  </span>
                  <span className="text-xs font-bold bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {formatDate(s.lastActivity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}