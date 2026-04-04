import { beforeEach, describe, expect, it } from "vitest";

import { inMemoryDatabase } from "../src/infrastructure/persistence/in-memory-database";
import { AuthService } from "../src/modules/auth/auth.service";
import { UserRepository } from "../src/modules/users/user.repository";

describe("AuthService", () => {
  beforeEach(() => {
    inMemoryDatabase.users = [];
    inMemoryDatabase.tasks = [];
  });

  it("registers a user and returns a token", async () => {
    const authService = new AuthService(new UserRepository());

    const result = await authService.register({
      email: "ajay@example.com",
      name: "Ajay",
      password: "password123",
    });

    expect(result.user.email).toBe("ajay@example.com");
    expect(result.accessToken.length).toBeGreaterThan(10);
  });
});
