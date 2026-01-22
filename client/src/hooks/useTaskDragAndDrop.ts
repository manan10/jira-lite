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

      // 1. Dropped outside?
      if (!destination) return;

      // 2. Dropped in same spot?
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // 3. Calculate new status
      const newStatus = destination.droppableId as Task["status"];

      // 4. Trigger Update (Optimistic UI handled by parent's state update)
      // We don't need to check "if (task)" here because if draggableId exists, the task exists.
      updateTask(draggableId, { status: newStatus });
    },
    [tasks, updateTask],
  ); // Dependencies prevent stale closures

  return { onDragEnd };
};
