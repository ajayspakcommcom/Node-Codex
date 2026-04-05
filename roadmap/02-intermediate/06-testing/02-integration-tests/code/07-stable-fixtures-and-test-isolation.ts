import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { Application } from "./module/http/application.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { buildCreateOrderRequest, seededOrders } from "./shared/integration-runtime.js";
import type { DomainEventPublisher } from "./shared/integration-types.js";

const silentPublisher: DomainEventPublisher = {
  async publish(): Promise<void> {},
};

async function main(): Promise<void> {
  reset();

  describe("fixture stability and test isolation", () => {
    it("starts each integration test from a predictable seed", async () => {
      const firstDatabase = new InMemoryDatabase(seededOrders);
      const secondDatabase = new InMemoryDatabase(seededOrders);

      const firstApp = new Application(firstDatabase, silentPublisher);
      const secondApp = new Application(secondDatabase, silentPublisher);

      await firstApp.handle(buildCreateOrderRequest());

      expect(firstDatabase.snapshot().orders.size).toBe(2);
      expect(secondDatabase.snapshot().orders.size).toBe(1);
      await secondApp.handle(buildCreateOrderRequest());
      expect(secondDatabase.snapshot().orders.size).toBe(2);
    });
  });

  await run();
}

void main();
