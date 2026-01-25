import axios from "axios";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL + "/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/register", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  login: async (userData: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("user");
  },
};
