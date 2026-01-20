import type { Task } from "../types/types";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[]; 
  status: string; 
  color: "slate" | "blue" | "orange" | "green";
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, direction: "left" | "right") => void;
}

export const TaskColumn = ({
  title,
  tasks,
  color,
  onEdit,
  onDelete,
  onMove,
}: TaskColumnProps) => {
  const colorMap = {
    slate: "text-slate-500 bg-slate-200 text-slate-600",
    blue: "text-blue-500 bg-blue-100 text-blue-600",
    orange: "text-orange-500 bg-orange-100 text-orange-600",
    green: "text-green-500 bg-green-100 text-green-600",
  };

  const titleColor = colorMap[color].split(" ")[0];
  const badgeColor = colorMap[color].split(" ").slice(1).join(" ");

  return (
    <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3 min-h-[500px]">
      <h2
        className={`font-bold uppercase text-xs tracking-wider mb-2 flex justify-between ${titleColor}`}
      >
        {title}{" "}
        <span className={`${badgeColor} px-2 rounded-full`}>
          {tasks.length}
        </span>
      </h2>

      <div className="flex flex-col gap-3 h-full overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
};
