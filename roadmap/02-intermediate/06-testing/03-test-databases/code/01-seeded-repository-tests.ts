import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { FixtureLoader } from "./module/fixtures/fixture-loader.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";
import { OrderReadRepository } from "./module/repositories/order-read-repository.js";
import { seededAuditLogs, seededOrders } from "./shared/test-db-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("seeded repository tests", () => {
    it("uses intentional fixture data for repository verification", async () => {
      const harness = new TestDatabaseHarness();
      new FixtureLoader(harness).load({
        orders: seededOrders,
        auditLogs: seededAuditLogs,
        schemaVersion: 1,
      });

      const repository = new OrderReadRepository(harness);
      const orders = await repository.listByTenant("tenant_acme");

      expect(orders).toHaveLength(2);
      expect(orders[0]?.orderId).toBe("ord_100");
      expect(orders[1]?.status).toBe("draft");
    });
  });

  await run();
}

void main();
