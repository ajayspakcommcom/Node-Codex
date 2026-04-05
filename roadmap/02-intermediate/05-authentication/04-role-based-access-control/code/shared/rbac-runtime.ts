import type { OrderResource, Principal } from "./rbac-types.js";

export const principals = {
  member: {
    userId: "user_42",
    tenantId: "tenant_alpha",
    roles: ["member"],
  },
  support: {
    userId: "support_7",
    tenantId: "tenant_alpha",
    roles: ["support"],
  },
  manager: {
    userId: "manager_2",
    tenantId: "tenant_alpha",
    roles: ["manager"],
  },
  admin: {
    userId: "admin_1",
    tenantId: "tenant_alpha",
    roles: ["admin"],
  },
  externalTenantManager: {
    userId: "manager_9",
    tenantId: "tenant_beta",
    roles: ["manager"],
  },
} as const satisfies Record<string, Principal>;

export const exampleOrder: OrderResource = {
  orderId: "ord_5001",
  tenantId: "tenant_alpha",
  ownerUserId: "user_42",
  status: "placed",
};

export const refundedOrder: OrderResource = {
  orderId: "ord_5002",
  tenantId: "tenant_alpha",
  ownerUserId: "user_42",
  status: "refunded",
};
