import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { validate } from "../middleware/validate";
import { createTaskSchema } from "../schemas/task.schema";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", protect, getTasks);
router.post("/", protect, validate(createTaskSchema), createTask);
router.put("/:id", protect, validate(createTaskSchema), updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
