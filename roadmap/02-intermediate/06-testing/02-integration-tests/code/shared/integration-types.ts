export interface OrderRecord {
  readonly orderId: string;
  readonly tenantId: string;
  readonly ownerUserId: string;
  readonly sku: string;
  readonly quantity: number;
  readonly unitPriceCents: number;
  readonly totalCents: number;
  readonly status: "submitted" | "payment_pending";
}

export interface OutboxEvent {
  readonly type: "order.created";
  readonly orderId: string;
  readonly tenantId: string;
}

export interface UserIdentity {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly string[];
}

export interface HttpRequest {
  readonly method: "GET" | "POST";
  readonly path: string;
  readonly headers: Readonly<Record<string, string | undefined>>;
  readonly body?: unknown;
}

export interface HttpResponse {
  readonly statusCode: number;
  readonly body: unknown;
}

export interface CreateOrderRequestBody {
  readonly sku: string;
  readonly quantity: number;
  readonly unitPriceCents: number;
}

export interface DomainEventPublisher {
  publish(event: OutboxEvent): Promise<void>;
}

export interface DatabaseState {
  readonly orders: Map<string, OrderRecord>;
  readonly outbox: OutboxEvent[];
}
