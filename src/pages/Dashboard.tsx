// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  Trophy, ArrowRight, Activity, Star, Zap, CheckCircle, Sparkles, Layers,
} from 'lucide-react';
import { modules, colorClasses } from '../data/modules';

const calculateLevel = (xp: number) => {
  if (xp < 20) return { name: 'Новичок', color: 'text-slate-500', bg: 'bg-slate-100' };
  if (xp < 50) return { name: 'Исследователь', color: 'text-blue-600', bg: 'bg-blue-100' };
  if (xp < 100) return { name: 'Мастер нюансов', color: 'text-purple-600', bg: 'bg-purple-100' };
  return { name: 'Лингвистический ниндзя', color: 'text-orange-600', bg: 'bg-orange-100' };
};

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null; role: string } | null>(null);
  const [stats, setStats] = useState({ totalXP: 0, exercises: 0, streak: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const { data: p } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .maybeSingle();
      setProfile(p ?? { full_name: 'Студент', role: 'student' });

      const { data: prog } = await supabase
        .from('progress')
        .select('score')
        .eq('user_id', user.id);

      if (prog) {
        setStats({
          totalXP: prog.reduce((acc, curr) => acc + (curr.score || 0), 0),
          exercises: prog.length,
          streak: Math.min(prog.length, 7),
        });
      }
      setLoading(false);
    }
    loadData();
  }, [user]);

  const firstName = profile?.full_name?.split(' ')[0] || 'Студент';
  const level = calculateLevel(stats.totalXP);

  // Featured модули: Word Shades + первые 2 обычных
  const featuredModules = [
    modules.find(m => m.id === 'word-shades')!,
    modules[0], // Our World
    modules[1], // Daily Life
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero greeting */}
      <div className="relative bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-sky-50 rounded-full blur-2xl opacity-50" />

        <div className="relative z-10 p-8 md:p-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100">
            <Star className="w-3.5 h-3.5 fill-blue-600" /> Дашборд
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Привет, {loading ? '...' : firstName}!
          </h1>
          <p className="text-slate-500 italic font-medium mb-5">Expanding vocabulary in a smart way.</p>

          <div className={`inline-block px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-widest mb-6 ${level.bg} ${level.color}`}>
            Ранг: {level.name}
          </div>

          <div className="flex flex-wrap gap-4">
            <StatCard icon={<Trophy className="w-5 h-5" />} iconBg="bg-orange-100" iconColor="text-orange-600" value={stats.totalXP} label="Очков XP" />
            <StatCard icon={<Activity className="w-5 h-5" />} iconBg="bg-blue-100" iconColor="text-blue-600" value={stats.exercises} label="Заданий" />
            <StatCard icon={<Zap className="w-5 h-5" />} iconBg="bg-amber-100" iconColor="text-amber-500" value={stats.streak} label="Серия дней" />
          </div>
        </div>
      </div>

      {/* Featured modules */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Featured Modules</h2>
          <Link to="/modules" className="text-xs font-bold text-accent flex items-center gap-1 hover:gap-2 transition-all">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredModules.map(mod => {
            const colors = colorClasses[mod.color];
            return (
              <Link
                key={mod.id}
                to={`/modules/${mod.id}`}
                className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 relative overflow-hidden"
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bgLight} rounded-full opacity-60 blur-2xl`} />
                <div className="relative z-10 flex items-center justify-between">
                  <div className={`${colors.bgLight} ${colors.border} border w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {mod.emoji}
                  </div>
                  {mod.isSpecial && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full border border-cyan-200 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Special
                    </span>
                  )}
                </div>
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">{mod.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Big CTA */}
      <Link
        to="/modules"
        className="block bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 border border-blue-100 rounded-[2rem] p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-white border border-blue-200 p-3 rounded-2xl shadow-sm">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold text-lg" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Explore all 10 modules
              </h3>
              <p className="text-slate-500 text-sm font-medium">9 thematic units + Word Shades special module on euphemisms.</p>
            </div>
          </div>
          <span className="shrink-0 bg-accent text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-accent/30 flex items-center gap-2">
            Open library <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Recent activity placeholder */}
      <div className="bg-white border border-blue-100 rounded-[2.5rem] p-8 shadow-sm">
        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Recent activity</h3>
        {stats.exercises === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-sm">Здесь появится история твоих заданий</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500 font-medium">
            Ты выполнил <strong className="text-accent">{stats.exercises}</strong> заданий. Подробная история — в Этапе 3.
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, iconColor, value, label }: {
  icon: React.ReactNode; iconBg: string; iconColor: string; value: number; label: string;
}) {
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