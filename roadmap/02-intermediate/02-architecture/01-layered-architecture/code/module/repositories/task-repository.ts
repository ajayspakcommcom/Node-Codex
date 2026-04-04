import { randomUUID } from "node:crypto";

import { insertTaskRecord, listTaskRecords, type TaskRecord } from "../infrastructure/in-memory-task-store.js";

export interface CreateTaskInput {
  readonly title: string;
}

export class TaskRepository {
  public list(): readonly TaskRecord[] {
    return listTaskRecords();
  }

  public create(input: CreateTaskInput): TaskRecord {
    return insertTaskRecord({
      id: `task_${randomUUID()}`,
      title: input.title,
      status: "todo",
      createdAt: new Date().toISOString(),
      internalNotes: "Generated through repository boundary.",
    });
  }
}
