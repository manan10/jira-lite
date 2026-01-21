import { Link } from "react-router-dom";
import {
  Layout,
  CheckCircle,
  BarChart3,
  Filter,
  ArrowRight,
  Github,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <nav className="flex justify-between items-center max-w-7xl mx-auto w-full p-6">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
          <CheckCircle className="text-blue-600" />
          <span>Jira-Lite</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            <a
              href="#"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              About
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10 mb-20">
        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100 dark:border-blue-800 inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          v1.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 max-w-4xl">
          Project management <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            simplified for devs.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Stop wrestling with complex tools. Jira-Lite provides a streamlined
          Kanban experience with powerful analytics, strict workflows, and zero
          clutter.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-blue-900/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Launch Dashboard <ArrowRight size={20} />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-lg font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Github size={20} /> Star on GitHub
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl text-left">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Kanban Workflow
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Visualize your work with our intuitive drag-and-drop board. Move
              tasks seamlessly from Todo to Done.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Real-time Analytics
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Track velocity and bottlenecks instantly. Our dashboard calculates
              metrics on the fly—no refresh needed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
              <Filter size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Smart Filtering
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Find exactly what you need with compound filters for priority,
              search terms, and status.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
        © 2026 Jira-Lite Inc. Built with React & Tailwind.
      </footer>
    </div>
  );
};
