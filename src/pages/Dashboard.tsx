import { useEffect, useMemo, useState } from "react";
import { Plus, CheckCircle } from "lucide-react";
import { StatsCard } from "../components/StatsCard";
import { TaskColumn } from "../components/TaskColumn";
import { TaskModal } from "../components/TaskModal";
import {
  nextStatus,
  previousStatus,
  Priority,
  Status,
  type Task,
} from "../types/types";

export const Dashboard = () => {
    const checkForLocalTasks = () => {
    const data = localStorage.getItem("tasks");
    if (!data) return [];
    const localData = JSON.parse(data) as Task[];
    return localData;
  };

  const checkForLocalLogs = () => {
    const data = localStorage.getItem("logs");
    if (!data) return [];
    const localData = JSON.parse(data) as string[];
    return localData;
  };

  const [tasks, setTasks] = useState<Task[]>(checkForLocalTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [auditLogs, setAuditLogs] = useState<string[]>(checkForLocalLogs);

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const editingTask = tasks.find((t) => t.id === editingId);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(auditLogs));
  }, [auditLogs]);

  const today = new Date().toISOString().split("T")[0];

  const taskCounts = tasks.reduce(
    (acc, task) => {
      const key = task.status;
      if (!acc[key]) acc[key] = 0;
      if (!acc["OverDue"]) acc["OverDue"] = 0;
      if (!acc["Total"]) acc["Total"] = 0;

      acc[key] += 1;
      if (task.deadline < today) acc["OverDue"] += 1;
      acc["Total"] += 1;
      return acc;
    },
    {} as Record<Status | "OverDue" | "Total", number>,
  );

  const newTaskClick = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as Task;

    setTasks((prevTasks) => {
      if (editingId) {
        return prevTasks.map((task) =>
          task.id !== editingId
            ? task
            : {
                ...task,
                title: data.title,
                priority: data.priority,
                deadline: data.deadline,
              },
        );
      } else {
        return [
          ...prevTasks,
          {
            id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
            status: Status.Todo,
            title: data.title,
            priority: data.priority,
            deadline: data.deadline,
          },
        ];
      }
    });

    if (!editingId) {
      setAuditLogs((prevLogs) => [
        `New task ${data.title} created`,
        ...prevLogs,
      ]);
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleMove = (id: number, direction: "left" | "right") => {
    const taskToBeMoved = tasks.find((task) => task.id === id);
    if (!taskToBeMoved) {
      alert("Something went wrong");
      return;
    }

    const targetStatus =
      direction === "left"
        ? previousStatus[taskToBeMoved?.status]
        : nextStatus[taskToBeMoved?.status];

    if (!targetStatus) return;
    if (
      targetStatus === Status.Done &&
      taskToBeMoved.priority === Priority.P2
    ) {
      alert("Can't move Low Priority Tasks to Done.");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToBeMoved.id ? { ...task, status: targetStatus } : task,
      ),
    );

    setAuditLogs((prevLogs) => [
      `Task ${taskToBeMoved.title} moved to ${targetStatus}`,
      ...prevLogs,
    ]);
  };

  const handleDeleteTask = (id: number) => {
    const taskTitle = tasks.find((task) => task.id === id)?.title;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setAuditLogs((prevLogs) => [`Task ${taskTitle} deleted`, ...prevLogs]);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <CheckCircle className="text-blue-600" /> Jira-Lite Dashboard
          </h1>

          <div className="grid grid-cols-4 gap-4">
            <StatsCard
              label="Total Tasks"
              value={taskCounts.Total || 0}
              color="blue"
            />
            <StatsCard
              label="Pending Review"
              value={taskCounts.InReview || 0}
              color="orange"
            />
            <StatsCard
              label="Completed"
              value={taskCounts.Done || 0}
              color="green"
            />
            <StatsCard
              label="Overdue"
              value={taskCounts.OverDue || 0}
              color="red"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8 gap-4">
          <div className="flex gap-4 flex-1">
            <input
              placeholder="Search tasks..."
              className="border border-slate-300 rounded-md px-3 py-2 w-64 shadow-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="border border-slate-300 rounded-md px-3 py-2 shadow-sm outline-none"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="P0">P0 (High)</option>
              <option value="P1">P1 (Medium)</option>
              <option value="P2">P2 (Low)</option>
            </select>
          </div>
          <button
            onClick={newTaskClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} /> New Task
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          <TaskColumn
            title="To Do"
            status="Todo"
            color="slate"
            tasks={filteredTasks.filter((t) => t.status === "Todo")}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDeleteTask(id)}
            onMove={(id, direction) => handleMove(id, direction)}
          />
          <TaskColumn
            title="In Progress"
            status="InProgress"
            color="blue"
            tasks={filteredTasks.filter((t) => t.status === "InProgress")}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDeleteTask(id)}
            onMove={(id, direction) => handleMove(id, direction)}
          />
          <TaskColumn
            title="Review"
            status="InReview"
            color="orange"
            tasks={filteredTasks.filter((t) => t.status === "InReview")}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDeleteTask(id)}
            onMove={(id, direction) => handleMove(id, direction)}
          />
          <TaskColumn
            title="Done"
            status="Done"
            color="green"
            tasks={filteredTasks.filter((t) => t.status === "Done")}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDeleteTask(id)}
            onMove={(id, direction) => handleMove(id, direction)}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 px-6 text-xs text-slate-500 flex gap-6 overflow-x-auto">
          <span className="font-bold uppercase text-slate-400 shrink-0">
            Activity Log:
          </span>
          {auditLogs.slice(0, 3).map((log) => (
            <span>{log}</span>
          ))}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        initialData={editingTask}
      />
    </div>
  );
}