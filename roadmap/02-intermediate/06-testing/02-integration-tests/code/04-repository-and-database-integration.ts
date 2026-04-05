import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { seededOrders } from "./shared/integration-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("repository and database integration", () => {
    it("queries seeded state through the repository instead of mocks", async () => {
      const database = new InMemoryDatabase(seededOrders);

      const orders = await database.runInTransaction(async (transaction) => {
        const repository = new OrderRepository(transaction);
        return repository.listByTenant("tenant_acme");
      });

      expect(orders).toHaveLength(1);
      expect(orders[0]?.orderId).toBe("ord_100");
    });
  });

  await run();
}

void main();
