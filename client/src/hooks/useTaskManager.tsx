import { useTasksData } from './useTasksData';
import { useTaskFilters } from './useTaskFilters';
import { useTaskModal } from './useTaskModal';
import { type Task } from '../types/types';

export const useTaskManager = () => {
  // 1. Data Layer (API, Loading, Error, Audit Logs)
  const { tasks, isLoading, error, auditLogs, addTask, updateTask, deleteTask } = useTasksData();
  
  // 2. Filter Layer (Search & Priority)
  const { filteredTasks, searchQuery, setSearchQuery, priorityFilter, setPriorityFilter } 
    = useTaskFilters(tasks);

  // 3. UI Layer (Modal State)
  const modal = useTaskModal();

  // 4. Interaction Handlers (Wiring UI to Data)
  const handleSaveTask = async (taskData: Omit<Task, 'id'>) => {
    if (modal.editingTask) {
      await updateTask(modal.editingTask.id, taskData);
    } else {
      await addTask(taskData);
    }
    modal.closeModal();
  };

  const handleMoveTask = (id: string, direction: 'left' | 'right') => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const statusOrder = ['Todo', 'InProgress', 'InReview', 'Done'];
    const currentIndex = statusOrder.indexOf(task.status);
    const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < statusOrder.length) {
      const newStatus = statusOrder[newIndex] as Task['status'];
      updateTask(id, { status: newStatus });
    }
  };

  // 5. Return Everything
  return {
    tasks: filteredTasks,
    
    // FIX: Capitalized keys to match StatsBar component
    stats: {
      Todo: tasks.filter(t => t.status === 'Todo').length,
      InProgress: tasks.filter(t => t.status === 'InProgress').length,
      InReview: tasks.filter(t => t.status === 'InReview').length,
      Done: tasks.filter(t => t.status === 'Done').length,
      Total: tasks.length,
      OverDue: tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'Done').length
    },

    auditLogs,
    isLoading,
    error,

    // Filter Props
    searchQuery, setSearchQuery,
    priorityFilter, setPriorityFilter,

    // Modal Props
    isModalOpen: modal.isModalOpen,
    editingTask: modal.editingTask,
    openModalForAdd: modal.openForAdd,
    openModalForEdit: (id: string) => {
      const t = tasks.find(task => task.id === id);
      if (t) modal.openForEdit(t);
    },
    closeModal: modal.closeModal,

    // Actions
    handleSaveTask,
    handleDeleteTask: deleteTask,
    handleMoveTask
  };
};