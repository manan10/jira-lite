import type { Task } from "../types/types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData: Task | undefined;
}

export const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TaskModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Manage Task</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              name="title"
              defaultValue={initialData?.title}
              className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                defaultValue={initialData?.priority}
                name="priority"
                className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="P0">P0 - High</option>
                <option value="P1">P1 - Medium</option>
                <option value="P2">P2 - Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Deadline
              </label>
              <input
                defaultValue={initialData?.deadline}
                name="deadline"
                type="date"
                className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 rounded hover:bg-slate-50 text-slate-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
