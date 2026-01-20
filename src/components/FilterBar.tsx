// src/components/FilterBar.tsx
import { Plus, Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  onNewTask: () => void;
}

export const FilterBar = ({ 
  searchQuery, setSearchQuery, 
  priorityFilter, setPriorityFilter, 
  onNewTask 
}: FilterBarProps) => {
  return (
    <div className="flex justify-between items-center mb-8 gap-4">
      <div className="flex gap-4 flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border border-slate-300 rounded-md py-2 w-64 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select 
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Priorities</option>
          <option value="P0">High (P0)</option>
          <option value="P1">Medium (P1)</option>
          <option value="P2">Low (P2)</option>
        </select>
      </div>
      <button 
        onClick={onNewTask}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 shadow-sm transition-colors"
      >
        <Plus size={18} /> New Task
      </button>
    </div>
  );
};