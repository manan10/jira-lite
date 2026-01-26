import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Task from '../models/Task';

// GET /api/tasks/:taskId/comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    
    // Fetch comments and "populate" the user details (so we can show their name/avatar)
    const comments = await Comment.find({ task: taskId })
      .populate('user', 'name email') 
      .sort({ createdAt: -1 }); // Newest first

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// POST /api/tasks/:taskId/comments
export const addComment = async (req: Request, res: Response) => {
  console.log("adding comment" + req.body);
  try {
    const { content } = req.body;
    const { taskId } = req.params;
    // @ts-ignore (User is attached by auth middleware)
    const userId = req.user.id; 

    // 1. Check if task exists
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    // 2. Create Comment
    const comment = await Comment.create({
      content,
      task: taskId,
      user: userId
    });

    // 3. Populate user info immediately so the UI can display it
    await comment.populate('user', 'name email');

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};