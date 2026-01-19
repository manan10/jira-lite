import { Edit2, Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import type { Task } from "../types/types";

interface TaskCardProps {
  task: Task; 
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, direction: "left" | "right") => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onMove }: TaskCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative">
      {/* HEADER: Priority & Actions */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-xs px-2 py-0.5 rounded font-bold border 
          ${
            task.priority === "P0"
              ? "bg-red-100 text-red-700 border-red-200"
              : task.priority === "P1"
                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {task.priority}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task.id)}
            className="text-slate-400 hover:text-blue-600"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-slate-400 hover:text-red-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* BODY */}
      <h3 className="font-semibold text-slate-800 mb-1 leading-tight">
        {task.title}
      </h3>
      <p
        className={`text-xs mb-3 ${new Date(task.deadline) < new Date() ? "text-red-500 font-bold" : "text-slate-500"}`}
      >
        {task.deadline}
      </p>

      {/* FOOTER: Move Controls */}
      <div className="flex justify-between pt-2 border-t border-slate-50">
        <button
          onClick={() => onMove(task.id, "left")}
          disabled={task.status === "Todo"}
          className="text-xs font-medium text-slate-400 hover:text-blue-600 flex items-center gap-1 disabled:opacity-30"
        >
          <ChevronLeft size={14} /> Prev
        </button>

        <button
          onClick={() => onMove(task.id, "right")}
          disabled={task.status === "Done"}
          className="text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1 disabled:opacity-30"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
