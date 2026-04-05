import type { OrderRepository, StoredOrder } from "../../shared/testing-types.js";

export class FakeOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, StoredOrder>();

  public async save(order: StoredOrder): Promise<void> {
    this.orders.set(order.orderId, order);
  }

  public async findById(orderId: string): Promise<StoredOrder | undefined> {
    return this.orders.get(orderId);
  }

  public async list(): Promise<readonly StoredOrder[]> {
    return [...this.orders.values()];
  }
}
