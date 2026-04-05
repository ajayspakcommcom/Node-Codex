import type { AuditLogDocument, OrderDocument } from "../../shared/test-db-types.js";
import { TestDatabaseHarness } from "./test-database-harness.js";

export class TransactionSession {
  private readonly workingOrders: OrderDocument[];
  private readonly workingAuditLogs: AuditLogDocument[];

  public constructor(private readonly harness: TestDatabaseHarness) {
    const snapshot = harness.snapshot();
    this.workingOrders = snapshot.orders.map((order) => ({ ...order }));
    this.workingAuditLogs = snapshot.auditLogs.map((log) => ({ ...log }));
  }

  public insertOrder(order: OrderDocument): void {
    this.workingOrders.push({ ...order });
  }

  public insertAuditLog(log: AuditLogDocument): void {
    this.workingAuditLogs.push({ ...log });
  }

  public listOrders(): readonly OrderDocument[] {
    return this.workingOrders.map((order) => ({ ...order }));
  }

  public commit(): void {
    this.harness.truncateCollections();
    for (const order of this.workingOrders) {
      this.harness.insertOrder(order);
    }
    for (const log of this.workingAuditLogs) {
      this.harness.insertAuditLog(log);
    }
  }

  public rollback(): void {
    // Intentionally empty: the working copy is discarded.
  }
}
