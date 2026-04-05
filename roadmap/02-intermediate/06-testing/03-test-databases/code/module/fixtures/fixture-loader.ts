import type { AuditLogDocument, OrderDocument } from "../../shared/test-db-types.js";
import { TestDatabaseHarness } from "../db/test-database-harness.js";

export class FixtureLoader {
  public constructor(private readonly harness: TestDatabaseHarness) {}

  public load(
    input: {
      readonly orders?: readonly OrderDocument[];
      readonly auditLogs?: readonly AuditLogDocument[];
      readonly schemaVersion?: number;
    } = {},
  ): void {
    this.harness.initializeBaseline({
      orders: input.orders ?? [],
      auditLogs: input.auditLogs ?? [],
      schema: input.schemaVersion
        ? {
            version: input.schemaVersion,
            initializedAt: new Date("2026-04-05T08:00:00.000Z").toISOString(),
          }
        : undefined,
    });
  }
}
