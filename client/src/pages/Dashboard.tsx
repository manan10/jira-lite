import { CheckCircle } from "lucide-react";
import { TaskColumn } from "../components/TaskColumn";
import { TaskModal } from "../components/TaskModal";
import { useTaskManager } from "../hooks/useTaskManager";
import { FilterBar } from "../components/FilterBar";
import { AuditLogFooter } from "../components/AuditLogFooter";
import { StatsBar } from "../components/StatsBar";
import { boardColumns } from "../types/constants";

export const Dashboard = () => {
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
  } = useTaskManager();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <CheckCircle className="text-blue-600" /> Jira-Lite Dashboard
          </h1>
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

        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-300px)]">
        {
            boardColumns.map(column => {
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
            })              
        }                  
        </div>
      </main>

      <AuditLogFooter logs={auditLogs} />
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
};
