import { describe, expect, it, reset, run } from "./shared/test-db-lite.js";
import { SchemaManager } from "./module/db/schema-manager.js";
import { TestDatabaseHarness } from "./module/db/test-database-harness.js";

async function main(): Promise<void> {
  reset();

  describe("schema alignment and migrations", () => {
    it("ensures the expected schema version before tests rely on persistence behavior", () => {
      const harness = new TestDatabaseHarness();
      const schemaManager = new SchemaManager(harness);

      schemaManager.ensureSchema(2);

      expect(harness.getSchema()).toEqual({
        version: 2,
        initializedAt: "2026-04-05T08:00:00.000Z",
      });
    });

    it("does not re-run work when the schema is already aligned", () => {
      const harness = new TestDatabaseHarness();
      const schemaManager = new SchemaManager(harness);

      schemaManager.ensureSchema(2);
      schemaManager.ensureSchema(2);

      expect(harness.getSchema()?.version).toBe(2);
    });
  });

  await run();
}

void main();
