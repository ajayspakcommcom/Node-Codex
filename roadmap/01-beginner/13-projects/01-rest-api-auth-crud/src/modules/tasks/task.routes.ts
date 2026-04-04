import { Router } from "express";

import { validateBody, validateParams, validateQuery } from "../../shared/validation/validate";
import { TaskController } from "./task.controller";
import { TaskRepository } from "./task.repository";
import {
  createTaskSchema,
  listTasksQuerySchema,
  taskParamsSchema,
  updateTaskSchema,
} from "./task.schemas";
import { TaskService } from "./task.service";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export const taskRoutes = Router();

taskRoutes.get("/", validateQuery(listTasksQuerySchema), taskController.list);
taskRoutes.post("/", validateBody(createTaskSchema), taskController.create);
taskRoutes.get("/:taskId", validateParams(taskParamsSchema), taskController.getById);
taskRoutes.patch(
  "/:taskId",
  validateParams(taskParamsSchema),
  validateBody(updateTaskSchema),
  taskController.update,
);
taskRoutes.delete("/:taskId", validateParams(taskParamsSchema), taskController.delete);
