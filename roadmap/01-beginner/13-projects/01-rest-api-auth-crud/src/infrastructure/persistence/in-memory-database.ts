import { randomUUID } from "node:crypto";

export interface UserRecord {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly passwordHash: string;
  readonly createdAt: string;
}

export interface TaskRecord {
  readonly id: string;
  readonly ownerId: string;
  readonly title: string;
  readonly description: string;
  readonly status: "todo" | "in_progress" | "done";
  readonly createdAt: string;
  readonly updatedAt: string;
}

export const inMemoryDatabase = {
  users: [] as UserRecord[],
  tasks: [] as TaskRecord[],
};

export function generateId(prefix: string): string {
  return `${prefix}_${randomUUID()}`;
}
