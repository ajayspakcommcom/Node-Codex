export interface OrderReadProjection {
  readonly orderId: string;
  readonly customerId: string;
  readonly totalInCents: number;
  readonly status: "pending" | "confirmed";
}

export class OrderProjectionStore {
  private readonly store = new Map<string, OrderReadProjection>();

  upsert(projection: OrderReadProjection): void {
    this.store.set(projection.orderId, projection);
  }

  findById(orderId: string): OrderReadProjection | undefined {
    return this.store.get(orderId);
  }
}
