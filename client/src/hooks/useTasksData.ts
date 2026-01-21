import { useState, useEffect, useCallback } from 'react';
import { type Task } from '../types/types';
import { taskService } from '../api/api';
import { useToast } from '../context/ToastContext'; 

export const useTasksData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  
  const { showToast } = useToast();

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAuditLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 50));
  };

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await taskService.fetchAll();
      setTasks(data);
      setError(null);
    } catch {
      setError('Failed to fetch tasks');
      showToast('Could not load tasks. Please check your connection.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const created = await taskService.create(task);
      setTasks(prev => [created, ...prev]);
      addLog(`Created: ${created.title}`);
      showToast('Task created successfully!', 'success'); // <--- Success Toast
    } catch {
      showToast('Failed to create task', 'error'); // <--- Error Toast
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    try {
      const updated = await taskService.update(id, updates);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      
      if (!updates.status) {
         showToast('Task updated successfully', 'success');
      } else {
         addLog(`Moved task to ${updates.status}`);
      }
    } catch {
      setTasks(previousTasks); 
      showToast('Failed to update task', 'error');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      addLog('Deleted task');
      showToast('Task deleted', 'info'); 
    } catch {
      showToast('Failed to delete task', 'error');
    }
  };

  return { tasks, isLoading, error, auditLogs, addTask, updateTask, deleteTask };
};