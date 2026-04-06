export interface OrderItem {
  readonly sku: string;
  readonly quantity: number;
}

export interface CreateOrderRequest {
  readonly customerId: string;
  readonly items: readonly OrderItem[];
  readonly paymentMethodId: string;
}

export interface OrderCreatedResponse {
  readonly orderId: string;
  readonly status: "confirmed";
}
