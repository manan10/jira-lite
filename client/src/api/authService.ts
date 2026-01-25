import axios from 'axios';

// 1. Define Types for Inputs & Outputs
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Pointing directly to /auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/register', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  login: async (userData: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('user');
  }
};