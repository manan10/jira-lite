import { type Comment } from "../types/types";
import { api } from "./api";

export const commentService = {
  getComments: async (taskId: string): Promise<Comment[]> => {
    const response = await api.get(`/tasks/${taskId}/comments`);
    return response.data;
  },

  addComment: async (taskId: string, content: string): Promise<Comment> => {
    const response = await api.post(`/tasks/${taskId}/comments`, { content });
    return response.data;
  },
};
