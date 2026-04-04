import type { TaskDto } from "../../shared/task-dto.js";
import { TaskRepository } from "../repositories/task-repository.js";

export class TaskService {
  public constructor(private readonly taskRepository: TaskRepository) {}

  public listTasks(): readonly TaskDto[] {
    return this.taskRepository.list().map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      createdAt: task.createdAt,
    }));
  }

  public createTask(title: string): TaskDto {
    if (title.trim().length < 3) {
      throw new Error("Task title must be at least 3 characters long.");
    }

    const task = this.taskRepository.create({
      title: title.trim(),
    });

    return {
      id: task.id,
      title: task.title,
      status: task.status,
      createdAt: task.createdAt,
    };
  }
}
