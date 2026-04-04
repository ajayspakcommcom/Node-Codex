import { FakeDatabase } from "./shared/fake-database";

const database = new FakeDatabase();

database.insertOrder({
  id: "order_1",
  userId: "user_1",
  status: "confirmed",
  totalInCents: 9000,
  createdAt: "2026-04-04T10:00:00.000Z",
});

database.insertOrderItem({
  id: "item_1",
  orderId: "order_1",
  productId: "prod_1",
  quantity: 2,
  unitPriceInCents: 4500,
});

console.log("Orders table:", database.getOrders());
console.log("Order items table:", database.getOrderItems());
console.log("Enterprise rule: store relationships explicitly and avoid duplicating mutable product data.");
