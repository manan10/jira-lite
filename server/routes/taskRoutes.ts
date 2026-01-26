import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { protect } from "../middleware/authMiddleware";
import { addComment, getComments } from "../controllers/commentController";

const router = Router();

router.get("/", protect, getTasks);
  router.post("/", protect, validate(createTaskSchema), createTask);
router.put("/:id", protect, validate(updateTaskSchema), updateTask);
router.delete("/:id", protect, deleteTask);
router.get('/:taskId/comments', protect, getComments);
router.post('/:taskId/comments', protect, addComment);

export default router;
