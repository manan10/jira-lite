import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    priority: z.enum(["P0", "P1", "P2"]),
    deadline: z.string().min(1, "Deadline is required"),
    status: z.enum(["Todo", "In Progress", "Done"]).optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: createTaskSchema.shape.body.partial(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];