import { useCallback } from "react";
import { type DropResult } from "@hello-pangea/dnd";
import { type Task } from "../types/types";
import { useDispatch } from "react-redux"; // <--- Import Dispatch
import { updateTaskOptimistic } from "../store/taskSlice"; // <--- Import the Optimistic Action

interface UseTaskDragAndDropProps {
  updateTask: (id: string, updates: Partial<Task>) => Promise<void> | void;
}

export const useTaskDragAndDrop = ({
  updateTask,
}: UseTaskDragAndDropProps) => {
  const dispatch = useDispatch(); // <--- Initialize Dispatch

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      // 1. Basic Checks
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // 2. Calculate New Status
      const newStatus = destination.droppableId as Task["status"];

      // 3. ⚡ OPTIMISTIC UPDATE: Update Redux Store IMMEDIATELY
      // This updates the UI instantly so it doesn't "snap back" while waiting for the server.
      dispatch(updateTaskOptimistic({ id: draggableId, status: newStatus }));

      // 4. 🐢 API UPDATE: Send to server in background
      // This runs the Async Thunk to persist changes to the DB.
      updateTask(draggableId, { status: newStatus });
    },
    [updateTask, dispatch], // Dependencies
  );

  return { onDragEnd };
};