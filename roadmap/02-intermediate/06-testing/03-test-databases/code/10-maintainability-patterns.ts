import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { FixtureLoader } from "./module/fixtures/fixture-loader.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";
import { OrderReadRepository } from "./module/repositories/order-read-repository.js";
import { seededOrders } from "./shared/test-db-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("maintainable test database setup", () => {
    const cases = [
      {
        name: "tenant_acme has two seeded orders",
        tenantId: "tenant_acme",
        expectedCount: 2,
      },
      {
        name: "unknown tenant has no orders",
        tenantId: "tenant_unknown",
        expectedCount: 0,
      },
    ] as const;

    for (const testCase of cases) {
      it(testCase.name, async () => {
        const harness = new TestDatabaseHarness();
        new FixtureLoader(harness).load({ orders: seededOrders });

        const repository = new OrderReadRepository(harness);
        const orders = await repository.listByTenant(testCase.tenantId);

        expect(orders).toHaveLength(testCase.expectedCount);
      });
    }
  });

  await run();
}

void main();
