export interface TaskRecord {
  readonly id: string;
  readonly title: string;
  readonly status: "todo" | "done";
  readonly createdAt: string;
  readonly internalNotes: string;
}

const taskStore: TaskRecord[] = [
  {
    id: "task_1",
    title: "Review architecture boundaries",
    status: "todo",
    createdAt: "2026-04-04T10:00:00.000Z",
    internalNotes: "Used to demonstrate repository-to-DTO mapping.",
  },
];

export function listTaskRecords(): readonly TaskRecord[] {
  return taskStore;
}

export function insertTaskRecord(record: TaskRecord): TaskRecord {
  taskStore.push(record);
  return record;
}
