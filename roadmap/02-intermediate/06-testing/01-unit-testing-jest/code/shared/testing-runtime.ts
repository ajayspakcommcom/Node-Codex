import type {
  Clock,
  IdGenerator,
  QuoteRequest,
  StoredOrder,
  Subscription,
  UserContext,
} from "./testing-types.js";

export class FixedClock implements Clock {
  public constructor(private readonly currentTime: Date) {}

  public now(): Date {
    return new Date(this.currentTime);
  }
}

export class SequenceIdGenerator implements IdGenerator {
  private current = 0;

  public constructor(private readonly prefix: string) {}

  public nextId(): string {
    this.current += 1;
    return `${this.prefix}_${String(this.current).padStart(3, "0")}`;
  }
}

export const standardQuoteRequest: QuoteRequest = {
  customerTier: "gold",
  couponCode: "SAVE10",
  tenantId: "tenant_acme",
  lines: [
    { sku: "plan_core", quantity: 2, unitPriceCents: 20_000 },
    { sku: "plan_support", quantity: 1, unitPriceCents: 5_000 },
  ],
};

export const sampleOrder: StoredOrder = {
  orderId: "ord_100",
  tenantId: "tenant_acme",
  ownerUserId: "user_1",
  status: "submitted",
  quote: {
    subtotalCents: 45_000,
    discountCents: 6_750,
    taxCents: 6_885,
    totalCents: 45_135,
  },
};

export const managerUser: UserContext = {
  userId: "manager_1",
  tenantId: "tenant_acme",
  roles: ["manager"],
};

export const supportUser: UserContext = {
  userId: "support_1",
  tenantId: "tenant_acme",
  roles: ["support"],
};

export const foreignTenantUser: UserContext = {
  userId: "foreign_1",
  tenantId: "tenant_other",
  roles: ["admin"],
};

export const sampleSubscription: Subscription = {
  subscriptionId: "sub_100",
  tenantId: "tenant_acme",
  renewsAt: new Date("2026-04-08T09:00:00.000Z"),
};
