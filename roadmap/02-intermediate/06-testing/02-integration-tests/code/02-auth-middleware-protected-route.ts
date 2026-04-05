import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { Application } from "./module/http/application.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { buildAuthHeader, seededOrders, supportIdentity } from "./shared/integration-runtime.js";
import type { DomainEventPublisher } from "./shared/integration-types.js";

const silentPublisher: DomainEventPublisher = {
  async publish(): Promise<void> {},
};

async function main(): Promise<void> {
  reset();

  describe("auth middleware and protected routes", () => {
    it("returns 401 when the request has no bearer token", async () => {
      const app = new Application(new InMemoryDatabase(seededOrders), silentPublisher);
      const response = await app.handle({
        method: "GET",
        path: "/orders",
        headers: {},
      });

      expect(response.statusCode).toBe(401);
    });

    it("returns 403 when the authenticated user lacks the required role", async () => {
      const app = new Application(new InMemoryDatabase(seededOrders), silentPublisher);
      const response = await app.handle({
        method: "POST",
        path: "/orders",
        headers: {
          authorization: `Bearer ${buildAuthHeader(supportIdentity)}`,
        },
        body: {
          sku: "plan_support",
          quantity: 1,
          unitPriceCents: 5_000,
        },
      });

      expect(response.statusCode).toBe(403);
      expect(response.body).toEqual({ message: "User is not allowed to create orders" });
    });
  });

  await run();
}

void main();
