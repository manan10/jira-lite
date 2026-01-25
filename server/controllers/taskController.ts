import { Request, Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/authMiddleware';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {

    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const tasks = await Task.find({ user: req.user?._id as any }).sort({ createdAt: -1 });
    
    const formattedTasks = tasks.map((t) => ({
      id: t._id,
      title: t.title,
      priority: t.priority,
      status: t.status,
      deadline: t.deadline.toISOString().split('T')[0]
    }));
    
    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, priority, deadline } = req.body;
    
    const newTask = new Task({ title, priority, deadline, user: req.user?._id });
    const savedTask = await newTask.save();

    res.status(201).json({
      id: savedTask._id,
      title: savedTask.title,
      priority: savedTask.priority,
      status: savedTask.status,
      deadline: savedTask.deadline.toISOString().split('T')[0]
    });
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedTask) {
       res.status(404).json({ error: 'Task not found' });
       return;
    }

    if (updatedTask.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    res.json({
      id: updatedTask._id,
      title: updatedTask.title,
      priority: updatedTask.priority,
      status: updatedTask.status,
      deadline: updatedTask.deadline.toISOString().split('T')[0]
    });
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};