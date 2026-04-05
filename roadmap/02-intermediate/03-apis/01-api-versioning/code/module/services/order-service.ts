import type { CreateOrderInput, OrderRecord } from "../../shared/order-contracts.js";
import type { InMemoryOrderStore } from "../infrastructure/in-memory-order-store.js";

export class OrderService {
  public constructor(private readonly orderStore: InMemoryOrderStore) {}

  public listOrders(): readonly OrderRecord[] {
    return this.orderStore.list();
  }

  public createOrder(input: CreateOrderInput): OrderRecord {
    if (input.customerId.trim().length === 0) {
      throw new Error("customerId is required.");
    }

    if (input.amountInCents <= 0) {
      throw new Error("amountInCents must be greater than zero.");
    }

    return this.orderStore.create(input);
  }
}
