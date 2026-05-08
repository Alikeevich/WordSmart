// src/components/Layout.tsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, PenTool, Target, Puzzle, BrainCircuit,
  LogOut, Home, GraduationCap, Menu, X, Award, BookUser,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
  special?: boolean;
}

const learningNav: NavItem[] = [
  { path: '/vocab',    label: 'Vocabulary',   icon: <BookOpen className="w-5 h-5" /> },
  { path: '/writing',  label: 'Fill in Gaps', icon: <PenTool className="w-5 h-5" /> },
  { path: '/sorting',  label: 'Sorting Game', icon: <Target className="w-5 h-5" /> },
  { path: '/matching', label: 'Matching',     icon: <Puzzle className="w-5 h-5" /> },
  { path: '/quiz',     label: 'Quiz',         icon: <BrainCircuit className="w-5 h-5" /> },
  { path: '/test',     label: 'Final Test',   icon: <Award className="w-5 h-5" />, special: true },
];

export default function Layout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.role === 'teacher') setRole('teacher');
      });
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const SidebarContent = () => (
    <>
      <div className="px-6 py-7 border-b border-blue-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-accent text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-accent/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Word<span className="text-accent">Smart</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-wider uppercase">English Trainer</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic font-medium leading-snug pl-1">
          Expanding vocabulary <br /> in a smart way.
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {/* Главная — для всех */}
        <NavLink
          to="/"
          end
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
              isActive ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-slate-600 hover:bg-blue-50 hover:text-accent'
            }`
          }
        >
          <Home className="w-5 h-5" />
          {role === 'teacher' ? 'Дашборд' : 'Главная'}
        </NavLink>

        {/* Раздел для учителя — наверху, чтобы был заметен */}
        {role === 'teacher' && (
          <>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-3 mb-2 mt-5">Преподавание</p>
            <NavLink
              to="/teacher/students"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-accent'
                }`
              }
            >
              <BookUser className="w-5 h-5" />
              Мои ученики
            </NavLink>
          </>
        )}

        {/* Учебные модули — для всех (учитель тоже хочет посмотреть упражнения) */}
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-3 mb-2 mt-5">
          {role === 'teacher' ? 'Просмотр заданий' : 'Модули'}
        </p>
        {learningNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200
              ${isActive
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'text-slate-600 hover:bg-blue-50 hover:text-accent'
              }
              ${item.special ? 'mt-3 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700' : ''}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-blue-50">
        <div className="flex items-center gap-3 mb-4 px-3">
          <div className="w-9 h-9 bg-accent/10 text-accent rounded-xl flex items-center justify-center font-black text-sm">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-700 truncate">{user?.email}</p>
            <p className="text-xs text-slate-400">{role === 'teacher' ? 'Учитель' : 'Ученик'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Выйти
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-blue-100 fixed top-0 left-0 h-full z-30 shadow-sm">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-blue-100 z-50 flex flex-col transition-transform duration-300 lg:hidden shadow-2xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute top-4 right-4">
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
        </div>
        <SidebarContent />
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-blue-100 px-4 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl bg-blue-50 text-accent">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Word<span className="text-accent">Smart</span>
        </h1>
        <div className="w-9 h-9 bg-accent/10 text-accent rounded-xl flex items-center justify-center font-black text-sm">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </header>

      <main className="flex-1 lg:ml-64 pt-[72px] lg:pt-0">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}