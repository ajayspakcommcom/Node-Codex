import { describe, expect, it } from "vitest";

import { UserService } from "../modules/users/user-service";

describe("UserService", () => {
  it("returns active users", () => {
    const service = new UserService();
    const users = service.listActiveUsers();

    expect(users.length).toBeGreaterThan(0);
    expect(users.every((user) => user.isActive)).toBe(true);
  });
});
