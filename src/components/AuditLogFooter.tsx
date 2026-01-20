interface AuditLogFooterProps {
  logs: string[];
}

export const AuditLogFooter = ({ logs }: AuditLogFooterProps) => {
  if (logs.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 px-6 text-xs text-slate-500 flex gap-6 overflow-x-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <span className="font-bold uppercase text-slate-400 shrink-0 flex items-center gap-2">
        Activity Log:
      </span>
      {logs.slice(0, 3).map((log, index) => (
        <span key={index} className="flex items-center">
          • {log}
        </span>
      ))}
    </div>
  );
};