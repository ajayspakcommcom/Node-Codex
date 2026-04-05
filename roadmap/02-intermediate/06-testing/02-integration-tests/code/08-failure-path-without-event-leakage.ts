import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { Application } from "./module/http/application.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { buildCreateOrderRequest, seededOrders } from "./shared/integration-runtime.js";
import type { DomainEventPublisher, OutboxEvent } from "./shared/integration-types.js";

const sentEvents: OutboxEvent[] = [];

const failingPublisher: DomainEventPublisher = {
  async publish(event): Promise<void> {
    sentEvents.push(event);
    throw new Error("broker unavailable");
  },
};

async function main(): Promise<void> {
  reset();

  describe("failure paths without event leakage", () => {
    it("rolls back state when the integrated workflow fails late", async () => {
      sentEvents.length = 0;

      const database = new InMemoryDatabase(seededOrders);
      const app = new Application(database, failingPublisher);

      const response = await app.handle(buildCreateOrderRequest());

      expect(response.statusCode).toBe(500);
      expect(database.snapshot().orders.size).toBe(1);
      expect(database.snapshot().outbox).toHaveLength(0);
      expect(sentEvents).toHaveLength(1);
    });
  });

  await run();
}

void main();
