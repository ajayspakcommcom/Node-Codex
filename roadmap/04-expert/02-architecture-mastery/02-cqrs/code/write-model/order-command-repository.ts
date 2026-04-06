import { OrderAggregate } from "./order-aggregate.js";

export interface OrderCommandRepository {
  save(order: OrderAggregate): void;
  findById(orderId: string): OrderAggregate | undefined;
}
