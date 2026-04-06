export interface OrderItem {
  readonly sku: string;
  readonly quantity: number;
}

export interface CreateOrderCommand {
  readonly customerId: string;
  readonly items: readonly OrderItem[];
  readonly paymentMethodId: string;
  readonly idempotencyKey: string;
}
