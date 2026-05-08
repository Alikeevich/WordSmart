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
}

const learningNav: NavItem[] = [
  { path: '/vocab',    label: 'Vocabulary',   icon: <BookOpen className="w-[18px] h-[18px]" /> },
  { path: '/writing',  label: 'Fill in Gaps', icon: <PenTool className="w-[18px] h-[18px]" /> },
  { path: '/sorting',  label: 'Sorting Game', icon: <Target className="w-[18px] h-[18px]" /> },
  { path: '/matching', label: 'Matching',     icon: <Puzzle className="w-[18px] h-[18px]" /> },
  { path: '/quiz',     label: 'Quiz',         icon: <BrainCircuit className="w-[18px] h-[18px]" /> },
];

const finalTestItem: NavItem = {
  path: '/test', label: 'Final Test', icon: <Award className="w-[18px] h-[18px]" />,
};

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

  // Базовые классы для NavLink — единые для всех пунктов
  const navLinkClass = (isActive: boolean, special = false) => {
    if (isActive) {
      return 'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm bg-accent text-white transition-colors';
    }
    if (special) {
      return 'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors';
    }
    return 'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:bg-blue-50 hover:text-accent transition-colors';
  };

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-3.5 mb-2">
      {children}
    </p>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* ── BRAND ─────────────────────────────────────────── */}
      <div className="px-5 pt-7 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-accent text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-accent/20 shrink-0">
            <GraduationCap className="w-[22px] h-[22px]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-black text-slate-900 leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Word<span className="text-accent">Smart</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-[0.15em] uppercase">
              English Trainer
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 italic font-medium leading-snug mt-3 pl-[52px]">
          Expanding vocabulary<br />in a smart way.
        </p>
      </div>

      {/* ── NAV (scrollable) ──────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {/* Group 1: Home */}
        <div className="py-2 border-t border-slate-100">
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <Home className="w-[18px] h-[18px]" />
            {role === 'teacher' ? 'Дашборд' : 'Главная'}
          </NavLink>
        </div>

        {/* Group 2: Teacher tools (only for teachers) */}
        {role === 'teacher' && (
          <div className="py-3 border-t border-slate-100">
            <SectionLabel>Преподавание</SectionLabel>
            <NavLink
              to="/teacher/students"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <BookUser className="w-[18px] h-[18px]" />
              Мои ученики
            </NavLink>
          </div>
        )}

        {/* Group 3: Learning modules */}
        <div className="py-3 border-t border-slate-100">
          <SectionLabel>{role === 'teacher' ? 'Просмотр заданий' : 'Модули'}</SectionLabel>
          <div className="space-y-1">
            {learningNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Group 4: Final Test (special, separated) */}
        <div className="py-3 border-t border-slate-100">
          <SectionLabel>Экзамен</SectionLabel>
          <NavLink
            to={finalTestItem.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => navLinkClass(isActive, !isActive)}
          >
            {finalTestItem.icon}
            {finalTestItem.label}
          </NavLink>
        </div>
      </nav>

      {/* ── USER FOOTER (sticky bottom) ────────────────────── */}
      <div className="px-3 py-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl mb-2">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
              role === 'teacher' ? 'bg-orange-100 text-orange-600' : 'bg-accent/10 text-accent'
            }`}
            title={user?.email || ''}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 truncate" title={user?.email || ''}>
              {user?.email}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {role === 'teacher' ? 'Учитель' : 'Ученик'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Выйти
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed top-0 left-0 h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-100 z-50 flex flex-col transition-transform duration-300 lg:hidden shadow-2xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg bg-blue-50 text-accent">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-black text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Word<span className="text-accent">Smart</span>
        </h1>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
          role === 'teacher' ? 'bg-orange-100 text-orange-600' : 'bg-accent/10 text-accent'
        }`}>
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-[60px] lg:pt-0">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}