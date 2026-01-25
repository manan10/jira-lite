import axios from 'axios';
import { type Task } from '../types/types'; 

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

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