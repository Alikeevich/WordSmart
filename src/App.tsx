// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';

// Существующие страницы (используются как Word Shades sections в Этапе 1)
import SortingGame from './pages/SortingGame';
import Vocab from './pages/Vocab';
import FillInTheGaps from './pages/FillInTheGaps';
import MatchingGame from './pages/MatchingGame';
import Quiz from './pages/Quiz';
import FinalTest from './pages/FinalTest';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Загрузка...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/auth" />;

  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />

      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />

        {/* Новая система модулей */}
        <Route path="modules" element={<Modules />} />
        <Route path="modules/:moduleId" element={<ModuleDetail />} />

        {/* Legacy routes — текущие страницы Word Shades.
            В Этапе 2 они переедут на /modules/word-shades/<section>
            и будут параметризованы по moduleId. */}
        <Route path="legacy/vocab" element={<Vocab />} />
        <Route path="legacy/writing" element={<FillInTheGaps />} />
        <Route path="legacy/sorting" element={<SortingGame />} />
        <Route path="legacy/matching" element={<MatchingGame />} />
        <Route path="legacy/quiz" element={<Quiz />} />
        <Route path="legacy/test" element={<FinalTest />} />

        {/* Редиректы со старых путей на legacy (на случай старых ссылок) */}
        <Route path="vocab" element={<Navigate to="/legacy/vocab" replace />} />
        <Route path="writing" element={<Navigate to="/legacy/writing" replace />} />
        <Route path="sorting" element={<Navigate to="/legacy/sorting" replace />} />
        <Route path="matching" element={<Navigate to="/legacy/matching" replace />} />
        <Route path="quiz" element={<Navigate to="/legacy/quiz" replace />} />
        <Route path="test" element={<Navigate to="/legacy/test" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}