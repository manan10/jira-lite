import { useState, useEffect } from 'react';
import { type Task } from '../types/types';
import { taskService } from '../api/api';

export const useTasksData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);

  // Log Helper
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAuditLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.fetchAll();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    const created = await taskService.create(task);
    setTasks(prev => [created, ...prev]);
    addLog(`Created: ${created.title}`);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    // Optimistic Update
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    try {
      const updated = await taskService.update(id, updates);
      // Confirm with server data
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      if (updates.status) addLog(`Moved to ${updates.status}`);
    } catch {
      // Rollback
      setTasks(previousTasks);
      alert('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    await taskService.delete(id);
    setTasks(prev => prev.filter(t => t.id !== id));
    addLog('Deleted task');
  };

  return { tasks, isLoading, error, auditLogs, addTask, updateTask, deleteTask };
};