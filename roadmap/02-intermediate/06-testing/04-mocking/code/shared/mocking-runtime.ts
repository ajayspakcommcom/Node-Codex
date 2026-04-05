import type { OrderRecord } from "./mocking-types.js";

export const pendingOrder: OrderRecord = {
  orderId: "ord_100",
  customerId: "customer_1",
  totalCents: 12_000,
  status: "pending",
};

export const secondPendingOrder: OrderRecord = {
  orderId: "ord_101",
  customerId: "customer_2",
  totalCents: 8_500,
  status: "pending",
};
