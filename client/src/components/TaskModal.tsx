import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, AlertCircle } from "lucide-react";
import { type Task, Priority } from "../types/types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: { title: string; priority: Priority; deadline: string }) => void;
  initialData?: Task | null;
}

export const TaskModal = ({ isOpen, onClose, onSubmit, initialData }: TaskModalProps) => {
  // ✅ FIX: Initialize state directly from props.
  // Because we use a 'key' in the parent, this runs fresh every time the modal opens.
  const [title, setTitle] = useState(initialData?.title || "");
  const [priority, setPriority] = useState<Priority>(initialData?.priority || "P1");
  const [deadline, setDeadline] = useState(initialData?.deadline || "");

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {initialData ? "Edit Task" : "New Task"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form 
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ title, priority, deadline });
                onClose();
            }}
            className="p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Task Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
              placeholder="e.g., Redesign Homepage"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Priority
                </label>
                <div className="relative">
                    <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <select
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer dark:text-white"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                    >
                        <option value="P2">Low</option>
                        <option value="P1">Medium</option>
                        <option value="P0">High</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Deadline
                </label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
            >
              {initialData ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};