import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { Application } from "./module/http/application.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { buildCreateOrderRequest, seededOrders } from "./shared/integration-runtime.js";
import type { DomainEventPublisher, OutboxEvent } from "./shared/integration-types.js";

const sentEvents: OutboxEvent[] = [];

const controlledPublisher: DomainEventPublisher = {
  async publish(event): Promise<void> {
    sentEvents.push(event);
  },
};

async function main(): Promise<void> {
  reset();

  describe("controlled external dependency boundaries", () => {
    it("verifies the app side of the event contract without a live broker", async () => {
      sentEvents.length = 0;

      const app = new Application(new InMemoryDatabase(seededOrders), controlledPublisher);
      await app.handle(buildCreateOrderRequest());

      expect(sentEvents).toEqual([
        {
          type: "order.created",
          orderId: "ord_102",
          tenantId: "tenant_acme",
        },
      ]);
    });
  });

  await run();
}

void main();
