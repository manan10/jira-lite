import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    
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

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, priority, deadline } = req.body;
    
    const newTask = new Task({ title, priority, deadline });
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

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedTask) {
       res.status(404).json({ error: 'Task not found' });
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

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};