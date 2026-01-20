import { useState, useEffect, useMemo } from "react";
import {
  Status,
  Priority,
  previousStatus,
  nextStatus,
  type Task,
} from "../types/types"; 

export const useTaskManager = () => {
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

  return {
    tasks: filteredTasks,
    stats: taskCounts,
    auditLogs: auditLogs,
    isModalOpen: isModalOpen,
    openModalForAdd: newTaskClick,
    openModalForEdit: (id: number) => handleEdit(id),
    closeModal: () => setIsModalOpen(false),
    handleSaveTask: handleAddTask,
    handleMoveTask: handleMove,
    handleDeleteTask,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    editingTask,
  };
};
