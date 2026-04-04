import type { Request, Response } from "express";

import { successResponse } from "../../shared/http/api-response";
import type { ListTasksQuery } from "./task.schemas";
import { TaskService } from "./task.service";

export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  public list = (request: Request, response: Response): void => {
    const result = this.taskService.list(request.auth!.userId, request.query as unknown as ListTasksQuery);
    response.status(200).json(successResponse(result.items, result.meta));
  };

  public create = (request: Request, response: Response): void => {
    const task = this.taskService.create({
      ownerId: request.auth!.userId,
      title: request.body.title,
      description: request.body.description,
    });

    response.status(201).json(successResponse(task));
  };

  public getById = (request: Request, response: Response): void => {
    const { taskId } = request.params as { taskId: string };
    const task = this.taskService.getById(request.auth!.userId, taskId);
    response.status(200).json(successResponse(task));
  };

  public update = (request: Request, response: Response): void => {
    const { taskId } = request.params as { taskId: string };
    const task = this.taskService.update({
      ownerId: request.auth!.userId,
      taskId,
      title: request.body.title,
      description: request.body.description,
      status: request.body.status,
    });

    response.status(200).json(successResponse(task));
  };

  public delete = (request: Request, response: Response): void => {
    const { taskId } = request.params as { taskId: string };
    this.taskService.delete(request.auth!.userId, taskId);
    response.status(204).send();
  };
}
