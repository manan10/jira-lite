import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(1, 'Title cannot be empty'),
    priority: z.enum(['P0', 'P1', 'P2'], { 
      required_error: 'Priority is required',
      invalid_type_error: "Priority must be 'P0', 'P1', or 'P2'" 
    }),
    deadline: z.coerce.date()
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    priority: z.enum(['P0', 'P1', 'P2']).optional(),
    status: z.enum(['Todo', 'InProgress', 'InReview', 'Done']).optional(),
    deadline: z.coerce.date().optional()
  })
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];