export interface OrderResponse {
  readonly id: string;
  readonly customerId: string;
  readonly totalInCents: number;
}

export function createOrderResponse(input: OrderResponse): OrderResponse {
  return input;
}
