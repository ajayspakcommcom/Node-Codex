import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { FixtureLoader } from "./module/fixtures/fixture-loader.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";
import { seededAuditLogs, seededOrders } from "./shared/test-db-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("cleanup strategy choices", () => {
    it("reset restores the whole seeded baseline", () => {
      const harness = new TestDatabaseHarness();
      new FixtureLoader(harness).load({
        orders: seededOrders,
        auditLogs: seededAuditLogs,
        schemaVersion: 1,
      });

      harness.insertOrder({
        orderId: "ord_200",
        tenantId: "tenant_acme",
        customerId: "customer_2",
        totalCents: 9_999,
        status: "draft",
      });

      harness.resetToBaseline();

      expect(harness.snapshot().orders).toHaveLength(2);
      expect(harness.snapshot().auditLogs).toHaveLength(1);
    });

    it("truncate clears collections but does not restore fixture state", () => {
      const harness = new TestDatabaseHarness();
      new FixtureLoader(harness).load({ orders: seededOrders });

      harness.truncateCollections();

      expect(harness.snapshot().orders).toHaveLength(0);
    });
  });

  await run();
}

void main();
