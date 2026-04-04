export interface OrderRecord {
  readonly id: string;
  readonly customerId: string;
  readonly itemCount: number;
  readonly totalInCents: number;
  readonly status: "pending" | "confirmed";
  readonly createdAt: string;
  readonly internalAuditLabel: string;
}

const orderStore: OrderRecord[] = [
  {
    id: "order_1",
    customerId: "customer_1",
    itemCount: 2,
    totalInCents: 5000,
    status: "confirmed",
    createdAt: "2026-04-04T11:00:00.000Z",
    internalAuditLabel: "seed-order",
  },
];

export function listOrderRecords(): readonly OrderRecord[] {
  return orderStore;
}

export function insertOrderRecord(record: OrderRecord): OrderRecord {
  orderStore.push(record);
  return record;
}
