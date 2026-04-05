import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { FixtureLoader } from "./module/fixtures/fixture-loader.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";
import { TransactionSession } from "./module/db/transaction-session.js";
import { seededOrders } from "./shared/test-db-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("transaction rollback isolation", () => {
    it("discards working writes when the session rolls back", () => {
      const harness = new TestDatabaseHarness();
      new FixtureLoader(harness).load({ orders: seededOrders });

      const session = new TransactionSession(harness);
      session.insertOrder({
        orderId: "ord_rollback",
        tenantId: "tenant_acme",
        customerId: "customer_rollback",
        totalCents: 12_000,
        status: "submitted",
      });
      session.rollback();

      expect(harness.listOrders()).toHaveLength(2);
    });

    it("commits when the workflow succeeds", () => {
      const harness = new TestDatabaseHarness();
      new FixtureLoader(harness).load({ orders: seededOrders });

      const session = new TransactionSession(harness);
      session.insertOrder({
        orderId: "ord_commit",
        tenantId: "tenant_acme",
        customerId: "customer_commit",
        totalCents: 22_000,
        status: "submitted",
      });
      session.commit();

      expect(harness.listOrders()).toHaveLength(3);
    });
  });

  await run();
}

void main();
