import { Search, Filter, Plus } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  onNewTask: () => void;
}

export const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  priorityFilter, 
  setPriorityFilter, 
  onNewTask 
}: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 transition-colors">
        <Filter className="h-4 w-4 text-slate-500" />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer outline-none"
        >
          <option value="All" className="dark:bg-slate-800">All Priorities</option>
          <option value="P0" className="dark:bg-slate-800">High (P0)</option>
          <option value="P1" className="dark:bg-slate-800">Medium (P1)</option>
          <option value="P2" className="dark:bg-slate-800">Low (P2)</option>
        </select>
      </div>

      <button
        onClick={onNewTask}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
      >
        <Plus size={18} />
        <span className="hidden sm:inline font-medium">New Task</span>
      </button>
    </div>
  );
};