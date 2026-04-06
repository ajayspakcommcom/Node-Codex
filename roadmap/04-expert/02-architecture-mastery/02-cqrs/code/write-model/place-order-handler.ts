import { OrderAggregate, type PlaceOrderCommand } from "./order-aggregate.js";
import { type OrderCommandRepository } from "./order-command-repository.js";

export class PlaceOrderHandler {
  constructor(private readonly repository: OrderCommandRepository) {}

  execute(command: PlaceOrderCommand): OrderAggregate {
    const order = OrderAggregate.place(command).confirm();
    this.repository.save(order);
    return order;
  }
}
