import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { FixtureLoader } from "./module/fixtures/fixture-loader.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";
import { seededOrders } from "./shared/test-db-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("isolated database state", () => {
    it("keeps each harness independent so tests do not contaminate each other", () => {
      const firstHarness = new TestDatabaseHarness();
      const secondHarness = new TestDatabaseHarness();

      new FixtureLoader(firstHarness).load({ orders: seededOrders });
      new FixtureLoader(secondHarness).load({ orders: seededOrders });

      firstHarness.insertOrder({
        orderId: "ord_999",
        tenantId: "tenant_acme",
        customerId: "customer_9",
        totalCents: 999,
        status: "submitted",
      });

      expect(firstHarness.listOrders()).toHaveLength(3);
      expect(secondHarness.listOrders()).toHaveLength(2);
    });
  });

  await run();
}

void main();
