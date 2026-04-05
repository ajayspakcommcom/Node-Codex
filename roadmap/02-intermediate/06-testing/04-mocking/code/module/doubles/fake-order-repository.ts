import type { OrderRecord, OrderRepository } from "../../shared/mocking-types.js";

export class FakeOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, OrderRecord>();

  public constructor(seedOrders: readonly OrderRecord[] = []) {
    for (const order of seedOrders) {
      this.orders.set(order.orderId, { ...order });
    }
  }

  public async save(order: OrderRecord): Promise<void> {
    this.orders.set(order.orderId, { ...order });
  }

  public async findById(orderId: string): Promise<OrderRecord | undefined> {
    const order = this.orders.get(orderId);
    return order ? { ...order } : undefined;
  }

  public list(): readonly OrderRecord[] {
    return [...this.orders.values()].map((order) => ({ ...order }));
  }
}
