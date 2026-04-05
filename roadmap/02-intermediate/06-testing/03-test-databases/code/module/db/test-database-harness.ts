import type {
  AuditLogDocument,
  DatabaseSnapshot,
  OrderDocument,
  SchemaState,
} from "../../shared/test-db-types.js";

function cloneOrders(orders: readonly OrderDocument[]): OrderDocument[] {
  return orders.map((order) => ({ ...order }));
}

function cloneAuditLogs(logs: readonly AuditLogDocument[]): AuditLogDocument[] {
  return logs.map((log) => ({ ...log }));
}

export class TestDatabaseHarness {
  private baselineOrders: OrderDocument[] = [];
  private baselineAuditLogs: AuditLogDocument[] = [];
  private baselineSchema: SchemaState | undefined;

  private orders: OrderDocument[] = [];
  private auditLogs: AuditLogDocument[] = [];
  private schema: SchemaState | undefined;

  public initializeBaseline(
    input: {
      readonly orders?: readonly OrderDocument[];
      readonly auditLogs?: readonly AuditLogDocument[];
      readonly schema?: SchemaState;
    } = {},
  ): void {
    this.baselineOrders = cloneOrders(input.orders ?? []);
    this.baselineAuditLogs = cloneAuditLogs(input.auditLogs ?? []);
    this.baselineSchema = input.schema ? { ...input.schema } : undefined;
    this.resetToBaseline();
  }

  public resetToBaseline(): void {
    this.orders = cloneOrders(this.baselineOrders);
    this.auditLogs = cloneAuditLogs(this.baselineAuditLogs);
    this.schema = this.baselineSchema ? { ...this.baselineSchema } : undefined;
  }

  public truncateCollections(): void {
    this.orders = [];
    this.auditLogs = [];
  }

  public applyMigration(version: number): void {
    this.schema = {
      version,
      initializedAt: new Date("2026-04-05T08:00:00.000Z").toISOString(),
    };
  }

  public getSchema(): SchemaState | undefined {
    return this.schema ? { ...this.schema } : undefined;
  }

  public insertOrder(order: OrderDocument): void {
    this.orders.push({ ...order });
  }

  public listOrders(): readonly OrderDocument[] {
    return cloneOrders(this.orders);
  }

  public listOrdersByTenant(tenantId: string): readonly OrderDocument[] {
    return cloneOrders(this.orders.filter((order) => order.tenantId === tenantId));
  }

  public insertAuditLog(log: AuditLogDocument): void {
    this.auditLogs.push({ ...log });
  }

  public listAuditLogs(): readonly AuditLogDocument[] {
    return cloneAuditLogs(this.auditLogs);
  }

  public snapshot(): DatabaseSnapshot {
    return {
      orders: this.listOrders(),
      auditLogs: this.listAuditLogs(),
      schema: this.getSchema(),
    };
  }
}
