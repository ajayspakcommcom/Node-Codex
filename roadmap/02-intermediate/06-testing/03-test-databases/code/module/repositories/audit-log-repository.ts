import type { AuditLogDocument } from "../../shared/test-db-types.js";
import { TestDatabaseHarness } from "../db/test-database-harness.js";

export class AuditLogRepository {
  public constructor(private readonly harness: TestDatabaseHarness) {}

  public async list(): Promise<readonly AuditLogDocument[]> {
    return this.harness.listAuditLogs();
  }
}
