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

  describe("validation and serialization contracts", () => {
    it("rejects invalid payloads at the boundary", async () => {
      const app = new Application(new InMemoryDatabase(seededOrders), silentPublisher);
      const response = await app.handle(
        buildCreateOrderRequest({
          body: {
            sku: "",
            quantity: 0,
            unitPriceCents: 5_000,
          },
        }),
      );

      expect(response.statusCode).toBe(403);
      expect(response.body).toEqual({ message: "Invalid order payload" });
    });

    it("serializes the list response into a stable contract", async () => {
      const app = new Application(new InMemoryDatabase(seededOrders), silentPublisher);
      const response = await app.handle({
        method: "GET",
        path: "/orders",
        headers: buildCreateOrderRequest().headers,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        {
          orderId: "ord_100",
          sku: "plan_core",
          status: "submitted",
          totalCents: 30_000,
        },
      ]);
    });
  });

  await run();
}

void main();
