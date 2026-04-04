import { AuthorizationError, NotFoundError } from "../../shared/errors/app-error";
import type { PaginationMeta } from "../../shared/http/api-response";
import type { ListTasksQuery } from "./task.schemas";
import { TaskRepository } from "./task.repository";

interface TaskDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: "todo" | "in_progress" | "done";
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface PaginatedTasksResult {
  readonly items: readonly TaskDto[];
  readonly meta: PaginationMeta;
}

interface CreateTaskInput {
  readonly ownerId: string;
  readonly title: string;
  readonly description: string;
}

interface UpdateTaskInput {
  readonly ownerId: string;
  readonly taskId: string;
  readonly title?: string;
  readonly description?: string;
  readonly status?: "todo" | "in_progress" | "done";
}

export class TaskService {
  public constructor(private readonly taskRepository: TaskRepository) {}

  public create(input: CreateTaskInput): TaskDto {
    return this.toDto(this.taskRepository.create(input));
  }

  public list(ownerId: string, query: ListTasksQuery): PaginatedTasksResult {
    const filteredTasks = this.taskRepository
      .listByOwner(ownerId)
      .filter((task) => (query.status ? task.status === query.status : true))
      .filter((task) =>
        query.search
          ? task.title.toLowerCase().includes(query.search.toLowerCase()) ||
            task.description.toLowerCase().includes(query.search.toLowerCase())
          : true,
      )
      .sort((leftTask, rightTask) => rightTask.createdAt.localeCompare(leftTask.createdAt));

    const startIndex = (query.page - 1) * query.pageSize;
    const items = filteredTasks.slice(startIndex, startIndex + query.pageSize).map(this.toDto);

    return {
      items,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        totalCount: filteredTasks.length,
      },
    };
  }

  public getById(ownerId: string, taskId: string): TaskDto {
    const task = this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError("Task was not found.");
    }

    if (task.ownerId !== ownerId) {
      throw new AuthorizationError();
    }

    return this.toDto(task);
  }

  public update(input: UpdateTaskInput): TaskDto {
    const task = this.taskRepository.findById(input.taskId);

    if (!task) {
      throw new NotFoundError("Task was not found.");
    }

    if (task.ownerId !== input.ownerId) {
      throw new AuthorizationError();
    }

    const updatedTask = this.taskRepository.update(input.taskId, {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    });

    if (!updatedTask) {
      throw new NotFoundError("Task was not found.");
    }

    return this.toDto(updatedTask);
  }

  public delete(ownerId: string, taskId: string): void {
    const task = this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError("Task was not found.");
    }

    if (task.ownerId !== ownerId) {
      throw new AuthorizationError();
    }

    this.taskRepository.delete(taskId);
  }

  private toDto = (task: {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly status: "todo" | "in_progress" | "done";
    readonly createdAt: string;
    readonly updatedAt: string;
  }): TaskDto => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });
}
