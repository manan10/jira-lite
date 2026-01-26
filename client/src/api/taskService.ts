import { type Task } from '../types/types'; 
import { api } from './api';

export const taskService = {
  fetchAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  create: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  update: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, updates); 
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};