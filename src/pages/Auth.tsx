// src/pages/Auth.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Zap, AlertCircle, Loader2, GraduationCap, BookUser } from 'lucide-react';

type Role = 'student' | 'teacher';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('student');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        // Регистрация: профиль создастся автоматически триггером в БД
        // (см. migration.sql → handle_new_user). Передаём данные через user_metadata.
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            },
          },
        });
        if (signUpError) throw signUpError;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Произошла ошибка. Попробуйте ещё раз.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-noise flex">
      {/* Левая декоративная панель */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-primary/30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

        <div className="z-10 text-center max-w-md px-6">
          <div className="bg-white p-4 rounded-2xl shadow-xl inline-block mb-6 transform -rotate-3">
            <h1 className="text-5xl font-black text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Word<span className="text-accent">Smart</span> 🎓
            </h1>
          </div>
          <p className="text-2xl text-slate-700 font-bold leading-snug mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Expanding vocabulary <br /> in a smart way.
          </p>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Master English with 9 thematic modules and a special unit on
            <span className="inline-flex items-center gap-1 mx-1.5 text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-sm font-bold">
              <Sparkles className="w-3.5 h-3.5" /> euphemisms
            </span>
            &amp;
            <span className="inline-flex items-center gap-1 mx-1.5 text-red-700 bg-red-100 px-2 py-0.5 rounded-full text-sm font-bold">
              <Zap className="w-3.5 h-3.5" /> dysphemisms
            </span>
            .
          </p>
        </div>
      </div>

      {/* Правая панель с формой */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 z-10">
        <div className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
          <h2 className="text-3xl font-bold mb-2 text-slate-800" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {isLogin ? 'С возвращением!' : 'Начни своё путешествие'}
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            {isLogin ? 'Войди, чтобы продолжить тренировки.' : 'Зарегистрируйся, чтобы сохранять прогресс.'}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm font-medium">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <>
                {/* Выбор роли */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Я регистрируюсь как:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        role === 'student'
                          ? 'border-accent bg-blue-50 text-accent shadow-md'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <GraduationCap className="w-6 h-6" />
                      <span className="font-bold text-sm">Ученик</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('teacher')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        role === 'teacher'
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <BookUser className="w-6 h-6" />
                      <span className="font-bold text-sm">Учитель</span>
                    </button>
                  </div>
                </div>

                {/* Имя */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Имя и Фамилия</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder={role === 'teacher' ? 'Анна Петровна' : 'Иван Иванов'}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                placeholder="example@school.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Пароль</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-accent/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <Loader2 className="w-6 h-6 animate-spin" />
                : (isLogin ? 'Войти' : (role === 'teacher' ? 'Создать аккаунт учителя' : 'Создать аккаунт ученика'))
              }
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-slate-500 hover:text-accent font-medium text-sm transition-colors"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрируйся' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}