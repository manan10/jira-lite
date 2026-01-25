import { Navigate } from "react-router-dom";
import { useAppSelector } from '../store/hooks';
import { CheckCircle, Layout, List, Users } from "lucide-react";
import { AuthCard } from '../components/AuthCard';
import { FeatureRow } from '../components/FeatureRow';

export const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex flex-col">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
            <CheckCircle className="text-blue-600" />
            <span>Jira-Lite</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-6 w-full flex items-center justify-center py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8 hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now with Redux Toolkit
            </div>
            
            <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Move fast, <br />
              <span className="text-blue-600">break nothing.</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              The issue tracker that doesn't feel like work. Manage tasks, collaborate with your team, and ship faster.
            </p>

            <div className="space-y-4 pt-4">
              <FeatureRow icon={<Layout size={24} />} text="Kanban boards that actually work" />
              <FeatureRow icon={<List size={24} />} text="Smart filtering & search" />
              <FeatureRow icon={<Users size={24} />} text="Real-time team updates" />
            </div>
          </div>

          <AuthCard />
        </div>
      </div>
      
      <footer className="py-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Jira-Lite. Built with React & Redux.
      </footer>
    </div>
  );
};