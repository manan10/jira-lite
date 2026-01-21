import { useState } from "react";
import { type Task } from "../types/types";

export const useTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openForAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openForEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return { isModalOpen, editingTask, openForAdd, openForEdit, closeModal };
};
