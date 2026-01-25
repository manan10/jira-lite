import { useEffect, useCallback } from 'react';
import { type Task } from '../types/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  fetchTasks, 
  addTask as addTaskAction, 
  updateTask as updateTaskAction, 
  deleteTask as deleteTaskAction 
} from '../store/taskSlice'; 
import { useToast } from '../context/ToastContext';

export const useTasksData = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  
  // 1. Select data directly from the Redux Store
  // We don't need useState anymore! Redux holds the state.
  const { items: tasks, isLoading, error, auditLogs } = useAppSelector((state) => state.tasks);

  // 2. Fetch Tasks on Mount
  const loadTasks = useCallback(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // 3. Add Task Wrapper
  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      // unwrap() allows us to catch errors from the Thunk
      await dispatch(addTaskAction(task)).unwrap();
      showToast('Task created successfully!', 'success');
    } catch {
      showToast('Failed to create task', 'error');
    }
  };

  // 4. Update Task Wrapper
  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      // Optimistic UI updates are handled automatically by Redux if the API succeeds
      await dispatch(updateTaskAction({ id, updates })).unwrap();
      
      // Only show toast for major edits, not just moving columns (optional preference)
      if (!updates.status) {
        showToast('Task updated successfully', 'success');
      }
    } catch {
      showToast('Failed to update task', 'error');
    }
  };

  // 5. Delete Task Wrapper
  const deleteTask = async (id: string) => {
    try {
      await dispatch(deleteTaskAction(id)).unwrap();
      showToast('Task deleted', 'info');
    } catch {
      showToast('Failed to delete task', 'error');
    }
  };

  return { 
    tasks, 
    isLoading, 
    error, 
    auditLogs, 
    addTask, 
    updateTask, 
    deleteTask 
  };
};