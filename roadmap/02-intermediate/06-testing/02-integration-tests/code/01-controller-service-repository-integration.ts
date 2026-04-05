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

  describe("controller + service + repository integration", () => {
    it("creates an order through the request pipeline and persists it", async () => {
      publishedEvents.length = 0;

      const app = new Application(new InMemoryDatabase(seededOrders), publisher);
      const response = await app.handle(buildCreateOrderRequest());

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        orderId: "ord_102",
        status: "submitted",
        totalCents: 15_000,
      });
      expect(publishedEvents).toHaveLength(1);
    });
  });

  await run();
}

void main();
