interface StatsBarProps {
  stats: {
    Total: number;
    Todo: number;
    InProgress: number;
    InReview: number;
    Done: number;
    OverDue: number;
  };
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  const statItems = [
    { 
      label: 'Total Tasks', 
      value: stats.Total, 
      color: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'dark:border-blue-800/30'
    },
    { 
      label: 'Pending Review', 
      value: stats.InReview, 
      color: 'text-orange-600 dark:text-orange-400', 
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'dark:border-orange-800/30'
    },
    { 
      label: 'Completed', 
      value: stats.Done, 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'dark:border-green-800/30'
    },
    { 
      label: 'Overdue', 
      value: stats.OverDue, 
      color: 'text-red-600 dark:text-red-400', 
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'dark:border-red-800/30'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`${item.bg} p-4 rounded-xl border border-transparent ${item.border} transition-colors`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${item.color} mb-1 opacity-90`}>
            {item.label}
          </p>
          <p className={`text-2xl font-bold ${item.color}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};