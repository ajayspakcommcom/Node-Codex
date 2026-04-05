export interface OrderDocument {
  readonly orderId: string;
  readonly tenantId: string;
  readonly customerId: string;
  readonly totalCents: number;
  readonly status: "draft" | "submitted";
}

export interface AuditLogDocument {
  readonly logId: string;
  readonly orderId: string;
  readonly action: "seeded" | "created" | "verified";
}

export interface SchemaState {
  readonly version: number;
  readonly initializedAt: string;
}

export interface DatabaseSnapshot {
  readonly orders: readonly OrderDocument[];
  readonly auditLogs: readonly AuditLogDocument[];
  readonly schema: SchemaState | undefined;
}

export interface EnvironmentConfig {
  readonly kind: "in-memory" | "containerized";
  readonly connectionString: string;
  readonly resetStrategy: "reset" | "truncate" | "transaction";
}
