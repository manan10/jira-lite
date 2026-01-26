import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { commentService } from "../api/commentService";
import { type Comment } from "../types/types";

interface CommentsSectionProps {
  taskId: string;
}

export const CommentsSection = ({ taskId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const loadComments = async () => {
    try {
      const data = await commentService.getComments(taskId);
      setComments(data);
    } catch (error) {
      console.error("Failed to load comments", error);
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const addedComment = await commentService.addComment(taskId, newComment);
      setComments([addedComment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-6 border-t border-slate-100 dark:border-slate-700 pt-6">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        Discussion
        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </h3>

      <div className="mb-6 flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white transition-all"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !newComment.trim()}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </div>

      <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3 group">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              {comment.user?.name
                ? comment.user.name.substring(0, 2).toUpperCase()
                : "??"}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {comment.user?.name || "Unknown User"}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg rounded-tl-none">
                {comment.content}
              </p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm italic">
            No comments yet. Be the first to say something!
          </div>
        )}
      </div>
    </div>
  );
};
