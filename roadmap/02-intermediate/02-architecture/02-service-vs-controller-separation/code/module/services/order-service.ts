import type { OrderDto } from "../../shared/order-dto.js";
import { OrderRepository } from "../repositories/order-repository.js";

export interface CreateOrderInput {
  readonly customerId: string;
  readonly itemCount: number;
  readonly totalInCents: number;
}

export class OrderService {
  public constructor(private readonly orderRepository: OrderRepository) {}

  public listOrders(): readonly OrderDto[] {
    return this.orderRepository.list().map((order) => ({
      id: order.id,
      customerId: order.customerId,
      itemCount: order.itemCount,
      totalInCents: order.totalInCents,
      status: order.status,
      createdAt: order.createdAt,
    }));
  }

  public createOrder(input: CreateOrderInput): OrderDto {
    if (input.itemCount <= 0) {
      throw new Error("itemCount must be greater than zero.");
    }

    if (input.totalInCents <= 0) {
      throw new Error("totalInCents must be greater than zero.");
    }

    const order = this.orderRepository.create(input);

    return {
      id: order.id,
      customerId: order.customerId,
      itemCount: order.itemCount,
      totalInCents: order.totalInCents,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
