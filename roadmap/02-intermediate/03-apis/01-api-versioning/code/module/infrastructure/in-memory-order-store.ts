import type { CreateOrderInput, OrderRecord } from "../../shared/order-contracts.js";

export class InMemoryOrderStore {
  private readonly orders: OrderRecord[] = [
    {
      id: "ord_1001",
      customerId: "cust_enterprise",
      amountInCents: 12500,
      currency: "USD",
      priority: "standard",
      status: "approved",
      createdAt: "2026-04-01T08:00:00.000Z",
    },
    {
      id: "ord_1002",
      customerId: "cust_growth",
      amountInCents: 42000,
      currency: "EUR",
      priority: "expedited",
      status: "pending",
      createdAt: "2026-04-02T09:30:00.000Z",
    },
  ];

  public list(): readonly OrderRecord[] {
    return this.orders;
  }

  public create(input: CreateOrderInput): OrderRecord {
    const nextOrder: OrderRecord = {
      id: `ord_${1000 + this.orders.length + 1}`,
      customerId: input.customerId,
      amountInCents: input.amountInCents,
      currency: input.currency,
      priority: input.priority,
      status: input.amountInCents >= 50000 ? "pending" : "approved",
      createdAt: new Date().toISOString(),
    };

    this.orders.push(nextOrder);

    return nextOrder;
  }
}
