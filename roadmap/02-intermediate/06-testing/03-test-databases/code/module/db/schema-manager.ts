import { TestDatabaseHarness } from "./test-database-harness.js";

export class SchemaManager {
  public constructor(private readonly harness: TestDatabaseHarness) {}

  public ensureSchema(version: number): void {
    const existingSchema = this.harness.getSchema();

    if (existingSchema?.version === version) {
      return;
    }

    this.harness.applyMigration(version);
  }
}
