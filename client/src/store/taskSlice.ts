import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Task } from '../types/types';
import { taskService } from '../api/api';

// 1. Define the "Shape" of your global state
// This replaces: const [tasks, setTasks] = useState([])
// This replaces: const [isLoading, setIsLoading] = useState(false)
interface TasksState {
  items: Task[];
  isLoading: boolean;
  error: string | null;
  auditLogs: string[];
}

const initialState: TasksState = {
  items: [],
  isLoading: false,
  error: null,
  auditLogs: [],
};

// 2. Create Async Thunks (The API Logic)
// These replace your functions like 'fetchTasks' inside the hook.
// Redux handles the try/catch/finally logic automatically.

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await taskService.fetchAll();
  return response;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>) => {
  const response = await taskService.create(task);
  return response;
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const response = await taskService.update(id, updates);
    return response; // Return the updated task so we can swap it in the array
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await taskService.delete(id);
  return id; // Return the ID so we know which one to remove
});

// 3. The Slice (The State Manager)
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Synchronous actions (things that happen instantly without an API)
    addAuditLog: (state, action: PayloadAction<string>) => {
      const timestamp = new Date().toLocaleTimeString();
      state.auditLogs.unshift(`[${timestamp}] ${action.payload}`);
      state.auditLogs = state.auditLogs.slice(0, 50); // Keep last 50
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  // The "Extra Reducers" listen for the Async Thunks above
  extraReducers: (builder) => {
    builder
      // --- Fetch Tasks ---
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      // --- Add Task ---
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Add to top of list
        // Auto-log the action
        const timestamp = new Date().toLocaleTimeString();
        state.auditLogs.unshift(`[${timestamp}] Created: ${action.payload.title}`);
      })

      // --- Update Task ---
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // --- Delete Task ---
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
        const timestamp = new Date().toLocaleTimeString();
        state.auditLogs.unshift(`[${timestamp}] Deleted task`);
      });
  },
});

export const { addAuditLog, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;