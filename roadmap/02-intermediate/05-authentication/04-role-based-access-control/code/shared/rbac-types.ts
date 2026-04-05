export type Permission =
  | "orders:read"
  | "orders:update"
  | "orders:refund"
  | "users:read"
  | "users:suspend"
  | "support:impersonate-readonly";

export type Role = "member" | "support" | "manager" | "admin";

export interface Principal {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly Role[];
}

export interface OrderResource {
  readonly orderId: string;
  readonly tenantId: string;
  readonly ownerUserId: string;
  readonly status: "draft" | "placed" | "refunded";
}

export interface AuthorizationContext {
  readonly principal: Principal;
  readonly resourceTenantId?: string;
  readonly resourceOwnerUserId?: string;
  readonly orderStatus?: OrderResource["status"];
}
