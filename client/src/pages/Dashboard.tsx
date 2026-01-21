import { Link } from "react-router-dom"; // <--- Import Link
import { AlertCircle, CheckCircle, Loader2, Moon, Sun, Home } from "lucide-react"; // <--- Import Home Icon
import { useTheme } from '../context/ThemeContext'; 

import { TaskColumn } from "../components/TaskColumn";
import { TaskModal } from "../components/TaskModal";
import { useTaskManager } from "../hooks/useTaskManager";
import { FilterBar } from "../components/FilterBar";
import { AuditLogFooter } from "../components/AuditLogFooter";
import { StatsBar } from "../components/StatsBar";
import { boardColumns } from "../types/constants";

export const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  
  const {
    tasks: filteredTasks,
    stats,
    auditLogs,
    isModalOpen,
    searchQuery,
    priorityFilter,
    openModalForAdd,
    openModalForEdit,
    closeModal,
    setSearchQuery,
    setPriorityFilter,
    handleSaveTask,
    handleDeleteTask,
    handleMoveTask,
    editingTask,
    isLoading,
    error,
  } = useTaskManager();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition-colors">
        <Loader2 className="animate-spin mb-4 text-blue-600" size={48} />
        <p className="font-medium">Loading your workspace...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-slate-900 text-red-600 dark:text-red-400 transition-colors">
        <AlertCircle size={48} className="mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // 3. Main Dashboard
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          
          {/* Title Row */}
          <div className="flex items-center justify-between mb-4">
            
            {/* CLICKABLE LOGO */}
            <Link 
              to="/" 
              className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
              title="Back to Home"
            >
              <CheckCircle className="text-blue-600" /> Jira-Lite Dashboard
            </Link>

            <div className="flex items-center gap-2">
              {/* HOME ICON BUTTON */}
              <Link
                to="/"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Go to Home"
              >
                <Home size={24} />
              </Link>

              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
              </button>
            </div>
          </div>

          <StatsBar stats={stats} />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onNewTask={openModalForAdd}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-auto md:h-[calc(100vh-300px)]">
          {boardColumns.map((column) => {
            return (
              <TaskColumn
                key={column.status}
                title={column.title}
                status={column.status}
                color={column.color}
                tasks={filteredTasks.filter((t) => t.status === column.status)}
                onEdit={(id) => openModalForEdit(id)}
                onDelete={(id) => handleDeleteTask(id)}
                onMove={(id, direction) => handleMoveTask(id, direction)}
              />
            );
          })}
        </div>
      </main>

      <AuditLogFooter logs={auditLogs} />

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSaveTask}
          initialData={editingTask}
          key={editingTask ? editingTask.id : "create-new"}
        />
      )}
    </div>
  );
};