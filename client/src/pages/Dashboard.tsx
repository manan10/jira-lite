import { Link } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Moon,
  Sun,
  LogOut,
  User as UserIcon,
} from "lucide-react"; // <--- Added Icons

import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../store/hooks"; // <--- Added Hooks
import { logout } from "../store/authSlice"; // <--- Added Action

import { TaskColumn } from "../components/TaskColumn";
import { TaskModal } from "../components/TaskModal";
import { useTaskManager } from "../hooks/useTaskManager";
import { FilterBar } from "../components/FilterBar";
import { AuditLogFooter } from "../components/AuditLogFooter";
import { StatsBar } from "../components/StatsBar";
import { boardColumns } from "../types/constants";
import { DragDropContext } from "@hello-pangea/dnd";

export const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch(); // <--- Init Dispatch

  // Get User Info from Redux
  const { user } = useAppSelector((state) => state.auth);

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
    editingTask,
    isLoading,
    error,
    onDragEnd,
  } = useTaskManager();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition-colors">
        <Loader2 className="animate-spin mb-4 text-blue-600" size={48} />
        <p className="font-medium">Loading your workspace...</p>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
            >
              <CheckCircle className="text-blue-600" /> Jira-Lite
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <UserIcon size={14} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {user?.name || "Guest"}
                </span>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Toggle Theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <StatsBar stats={stats} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onNewTask={openModalForAdd}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-auto md:h-[calc(100vh-300px)]">
            {boardColumns.map((column) => {
              return (
                <TaskColumn
                  key={column.status}
                  title={column.title}
                  status={column.status}
                  color={column.color}
                  tasks={filteredTasks.filter(
                    (t) => t.status === column.status,
                  )}
                  onEdit={(id) => openModalForEdit(id)}
                  onDelete={(id) => handleDeleteTask(id)}
                />
              );
            })}
          </div>
        </DragDropContext>
      </main>

      <AuditLogFooter logs={auditLogs} />

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={(formData) => {
            handleSaveTask({
              ...formData,
              status: editingTask ? editingTask.status : 'Todo', 
            });
          }}
          initialData={editingTask}
          key={editingTask ? editingTask.id : "create-new"}
        />
      )}
    </div>
  );
};
