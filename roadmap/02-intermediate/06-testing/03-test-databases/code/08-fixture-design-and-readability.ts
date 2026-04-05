import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { FixtureLoader } from "./module/fixtures/fixture-loader.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";
import { AuditLogRepository } from "./module/repositories/audit-log-repository.js";
import { seededAuditLogs, seededOrders } from "./shared/test-db-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("fixture design and readability", () => {
    it("keeps fixtures small enough that the intent stays obvious", async () => {
      const harness = new TestDatabaseHarness();
      new FixtureLoader(harness).load({
        orders: seededOrders.slice(0, 1),
        auditLogs: seededAuditLogs,
      });

      const logs = await new AuditLogRepository(harness).list();

      expect(harness.listOrders()).toHaveLength(1);
      expect(logs[0]?.action).toBe("seeded");
    });
  });

  await run();
}

void main();
