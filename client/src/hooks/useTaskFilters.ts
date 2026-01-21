import { useState, useMemo } from "react";
import { type Task } from "../types/types";

export const useTaskFilters = (tasks: Task[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

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

  return {
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    filteredTasks,
  };
};
