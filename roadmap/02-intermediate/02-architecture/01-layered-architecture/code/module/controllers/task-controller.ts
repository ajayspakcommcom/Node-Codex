import type { TaskService } from "../services/task-service.js";

interface HttpRequest {
  readonly body: Record<string, unknown>;
}

interface HttpResponse {
  readonly statusCode: number;
  readonly body: unknown;
}

export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  public list(): HttpResponse {
    return {
      statusCode: 200,
      body: this.taskService.listTasks(),
    };
  }

  public create(request: HttpRequest): HttpResponse {
    const title = String(request.body.title ?? "");

    return {
      statusCode: 201,
      body: this.taskService.createTask(title),
    };
  }
}
