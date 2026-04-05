export type CustomerTier = "standard" | "gold" | "enterprise";

export interface QuoteLineItem {
  readonly sku: string;
  readonly quantity: number;
  readonly unitPriceCents: number;
}

export interface QuoteRequest {
  readonly customerTier: CustomerTier;
  readonly couponCode?: string;
  readonly tenantId: string;
  readonly lines: readonly QuoteLineItem[];
}

export interface OrderQuote {
  readonly subtotalCents: number;
  readonly discountCents: number;
  readonly taxCents: number;
  readonly totalCents: number;
}

export interface StoredOrder {
  readonly orderId: string;
  readonly tenantId: string;
  readonly ownerUserId: string;
  readonly status: "draft" | "submitted" | "payment_pending" | "fulfilled";
  readonly quote: OrderQuote;
}

export interface UserContext {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly string[];
}

export interface Clock {
  now(): Date;
}

export interface NotificationGateway {
  sendRenewalReminder(input: {
    readonly tenantId: string;
    readonly subscriptionId: string;
    readonly daysUntilRenewal: number;
  }): Promise<void>;
}

export interface Subscription {
  readonly subscriptionId: string;
  readonly tenantId: string;
  readonly renewsAt: Date;
  readonly reminderSentAt?: Date;
}

export interface IdGenerator {
  nextId(): string;
}

export interface OrderRepository {
  save(order: StoredOrder): Promise<void>;
  findById(orderId: string): Promise<StoredOrder | undefined>;
  list(): Promise<readonly StoredOrder[]>;
}
