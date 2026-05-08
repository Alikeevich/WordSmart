// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import SortingGame from './pages/SortingGame';
import Vocab from './pages/Vocab';
import FillInTheGaps from './pages/FillInTheGaps';
import MatchingGame from './pages/MatchingGame';
import Quiz from './pages/Quiz';
import FinalTest from './pages/FinalTest';
import TeacherStudents from './pages/TeacherStudents';
import TeacherStudentDetail from './pages/TeacherStudentDetail';

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
        <Route path="vocab" element={<Vocab />} />
        <Route path="writing" element={<FillInTheGaps />} />
        <Route path="sorting" element={<SortingGame />} />
        <Route path="matching" element={<MatchingGame />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="test" element={<FinalTest />} />

        {/* Teacher only */}
        <Route path="teacher/students" element={<TeacherStudents />} />
        <Route path="teacher/students/:studentId" element={<TeacherStudentDetail />} />
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