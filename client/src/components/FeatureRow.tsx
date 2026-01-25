import React from 'react';

interface FeatureRowProps {
  icon: React.ReactNode;
  text: string;
}

export const FeatureRow = ({ icon, text }: FeatureRowProps) => {
  return (
    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium text-lg">
      <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-blue-600 border border-slate-100 dark:border-slate-700">
        {icon}
      </div>
      {text}
    </div>
  );
};