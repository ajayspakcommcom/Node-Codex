import { Order } from "./order.js";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | undefined>;
}
