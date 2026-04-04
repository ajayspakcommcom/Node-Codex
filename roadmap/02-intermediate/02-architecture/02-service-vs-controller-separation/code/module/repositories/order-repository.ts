import { randomUUID } from "node:crypto";

import { insertOrderRecord, listOrderRecords, type OrderRecord } from "../infrastructure/in-memory-order-store.js";

export interface CreateOrderRecordInput {
  readonly customerId: string;
  readonly itemCount: number;
  readonly totalInCents: number;
}

export class OrderRepository {
  public list(): readonly OrderRecord[] {
    return listOrderRecords();
  }

  public create(input: CreateOrderRecordInput): OrderRecord {
    return insertOrderRecord({
      id: `order_${randomUUID()}`,
      customerId: input.customerId,
      itemCount: input.itemCount,
      totalInCents: input.totalInCents,
      status: "pending",
      createdAt: new Date().toISOString(),
      internalAuditLabel: "created-through-repository",
    });
  }
}
