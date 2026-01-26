import { useCallback } from "react";
import { type DropResult } from "@hello-pangea/dnd";
import { type Task } from "../types/types";

interface UseTaskDragAndDropProps {
  tasks: Task[];
  updateTask: (id: string, updates: Partial<Task>) => Promise<void> | void;
}

export const useTaskDragAndDrop = ({
  tasks,
  updateTask,
}: UseTaskDragAndDropProps) => {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const newStatus = destination.droppableId as Task["status"];
      updateTask(draggableId, { status: newStatus });
    },
    [tasks, updateTask],
  ); // Dependencies prevent stale closures

  return { onDragEnd };
};
