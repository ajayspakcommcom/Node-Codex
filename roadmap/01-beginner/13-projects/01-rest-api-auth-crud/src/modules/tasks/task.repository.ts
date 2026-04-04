import type { TaskRecord } from "../../infrastructure/persistence/in-memory-database";
import { generateId, inMemoryDatabase } from "../../infrastructure/persistence/in-memory-database";

interface CreateTaskRecordInput {
  readonly ownerId: string;
  readonly title: string;
  readonly description: string;
}

interface UpdateTaskRecordInput {
  readonly title?: string;
  readonly description?: string;
  readonly status?: TaskRecord["status"];
}

export class TaskRepository {
  public create(input: CreateTaskRecordInput): TaskRecord {
    const now = new Date().toISOString();
    const task: TaskRecord = {
      id: generateId("task"),
      ownerId: input.ownerId,
      title: input.title,
      description: input.description,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    inMemoryDatabase.tasks.push(task);
    return task;
  }

  public findById(taskId: string): TaskRecord | undefined {
    return inMemoryDatabase.tasks.find((task) => task.id === taskId);
  }

  public listByOwner(ownerId: string): readonly TaskRecord[] {
    return inMemoryDatabase.tasks.filter((task) => task.ownerId === ownerId);
  }

  public update(taskId: string, input: UpdateTaskRecordInput): TaskRecord | undefined {
    const task = this.findById(taskId);

    if (!task) {
      return undefined;
    }

    const updatedTask: TaskRecord = {
      ...task,
      ...input,
      updatedAt: new Date().toISOString(),
    };

    const taskIndex = inMemoryDatabase.tasks.findIndex((currentTask) => currentTask.id === taskId);
    inMemoryDatabase.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  public delete(taskId: string): void {
    inMemoryDatabase.tasks = inMemoryDatabase.tasks.filter((task) => task.id !== taskId);
  }
}
