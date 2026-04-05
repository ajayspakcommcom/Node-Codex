import type { HttpRequest, OrderRecord, UserIdentity } from "./integration-types.js";

export function buildAuthHeader(identity: UserIdentity): string {
  return Buffer.from(JSON.stringify(identity), "utf8").toString("base64url");
}

export const managerIdentity: UserIdentity = {
  userId: "mgr_1",
  tenantId: "tenant_acme",
  roles: ["manager"],
};

export const supportIdentity: UserIdentity = {
  userId: "support_1",
  tenantId: "tenant_acme",
  roles: ["support"],
};

export const foreignIdentity: UserIdentity = {
  userId: "foreign_1",
  tenantId: "tenant_other",
  roles: ["manager"],
};

export const seededOrders: readonly OrderRecord[] = [
  {
    orderId: "ord_100",
    tenantId: "tenant_acme",
    ownerUserId: "mgr_1",
    sku: "plan_core",
    quantity: 2,
    unitPriceCents: 15_000,
    totalCents: 30_000,
    status: "submitted",
  },
];

export function buildCreateOrderRequest(overrides?: Partial<HttpRequest>): HttpRequest {
  return {
    method: "POST",
    path: "/orders",
    headers: {
      authorization: `Bearer ${buildAuthHeader(managerIdentity)}`,
    },
    body: {
      sku: "plan_support",
      quantity: 3,
      unitPriceCents: 5_000,
    },
    ...overrides,
  };
}
