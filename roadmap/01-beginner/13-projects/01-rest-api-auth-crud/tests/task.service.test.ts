import { beforeEach, describe, expect, it } from "vitest";

import { inMemoryDatabase } from "../src/infrastructure/persistence/in-memory-database";
import { TaskRepository } from "../src/modules/tasks/task.repository";
import { TaskService } from "../src/modules/tasks/task.service";

describe("TaskService", () => {
  beforeEach(() => {
    inMemoryDatabase.users = [];
    inMemoryDatabase.tasks = [];
  });

  it("creates and lists tasks for the owner", () => {
    const taskService = new TaskService(new TaskRepository());

    taskService.create({
      ownerId: "user_1",
      title: "Create roadmap project",
      description: "Build the auth and CRUD project with enterprise structure.",
    });

    const result = taskService.list("user_1", {
      page: 1,
      pageSize: 10,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.title).toBe("Create roadmap project");
  });
});
