import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(3).max(500),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).max(120).optional(),
  description: z.string().min(3).max(500).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
});

export const taskParamsSchema = z.object({
  taskId: z.string().min(1),
});

export const listTasksQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(10),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  search: z.string().min(1).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;
