import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { Application } from "./module/http/application.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { buildCreateOrderRequest, seededOrders } from "./shared/integration-runtime.js";
import type { DomainEventPublisher, OutboxEvent } from "./shared/integration-types.js";

const publishedEvents: OutboxEvent[] = [];

const publisher: DomainEventPublisher = {
  async publish(event): Promise<void> {
    publishedEvents.push(event);
  },
};

async function main(): Promise<void> {
  reset();

  describe("transaction workflow integration", () => {
    it("commits order state and outbox state as one workflow", async () => {
      publishedEvents.length = 0;
      const database = new InMemoryDatabase(seededOrders);
      const app = new Application(database, publisher);

      await app.handle(buildCreateOrderRequest());

      const snapshot = database.snapshot();

      expect(snapshot.orders.size).toBe(2);
      expect(snapshot.outbox).toHaveLength(1);
      expect(publishedEvents).toHaveLength(1);
    });
  });

  await run();
}

void main();
