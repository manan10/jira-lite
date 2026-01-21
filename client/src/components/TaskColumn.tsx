import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";
import { type Task } from "../types/types";

interface TaskColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  color: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "left" | "right") => void;
}

export const TaskColumn = ({
  title,
  status,
  tasks,
  color,
  onEdit,
  onDelete,
  onMove,
}: TaskColumnProps) => {
  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/80">
        <h3 className={`font-bold ${color} uppercase text-xs tracking-wider`}>
          {title}
        </h3>
        <span className="bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-600">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                  task.priority === "P0"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : task.priority === "P1"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                }`}
              >
                {task.priority}
              </span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(task.id)}
                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 text-sm">
              {task.title}
            </h4>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                <Calendar size={12} className="mr-1" />
                {new Date(task.deadline).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-1">
                {status !== "Todo" && (
                  <button
                    onClick={() => onMove(task.id, "left")}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                    title="Move Left"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}
                {status !== "Done" && (
                  <button
                    onClick={() => onMove(task.id, "right")}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                    title="Move Right"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-24 text-slate-400 dark:text-slate-600 text-xs border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
            <p>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};
