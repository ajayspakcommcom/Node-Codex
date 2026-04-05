import type { AuditLogDocument, EnvironmentConfig, OrderDocument } from "./test-db-types.js";

export const seededOrders: readonly OrderDocument[] = [
  {
    orderId: "ord_100",
    tenantId: "tenant_acme",
    customerId: "customer_1",
    totalCents: 25_000,
    status: "submitted",
  },
  {
    orderId: "ord_101",
    tenantId: "tenant_acme",
    customerId: "customer_2",
    totalCents: 18_000,
    status: "draft",
  },
];

export const seededAuditLogs: readonly AuditLogDocument[] = [
  {
    logId: "log_100",
    orderId: "ord_100",
    action: "seeded",
  },
];

export const inMemoryEnvironment: EnvironmentConfig = {
  kind: "in-memory",
  connectionString: "memory://test-db/orders",
  resetStrategy: "reset",
};

export const containerizedEnvironment: EnvironmentConfig = {
  kind: "containerized",
  connectionString: "mongodb://localhost:27017/node_codex_test",
  resetStrategy: "truncate",
};
