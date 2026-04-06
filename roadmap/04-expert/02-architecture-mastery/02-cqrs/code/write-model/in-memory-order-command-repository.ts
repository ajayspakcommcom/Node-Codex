import { OrderAggregate } from "./order-aggregate.js";
import { type OrderCommandRepository } from "./order-command-repository.js";

export class InMemoryOrderCommandRepository implements OrderCommandRepository {
  private readonly store = new Map<string, OrderAggregate>();

  save(order: OrderAggregate): void {
    this.store.set(order.orderId, order);
  }

  findById(orderId: string): OrderAggregate | undefined {
    return this.store.get(orderId);
  }
}
