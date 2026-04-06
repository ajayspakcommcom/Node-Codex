import { Order } from "../domain/order.js";
import { type OrderRepository } from "../domain/order-repository.js";

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.orders.set(order.orderId, order);
  }

  async findById(orderId: string): Promise<Order | undefined> {
    return this.orders.get(orderId);
  }
}
