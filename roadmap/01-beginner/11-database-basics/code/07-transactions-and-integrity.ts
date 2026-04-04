import { ConstraintViolationError, FakeDatabase } from "./shared/fake-database";

const database = new FakeDatabase();

try {
  database.transaction((transactionDatabase) => {
    transactionDatabase.insertOrder({
      id: "order_2",
      userId: "user_1",
      status: "pending",
      totalInCents: 4500,
      createdAt: "2026-04-04T10:10:00.000Z",
    });

    transactionDatabase.insertOrderItem({
      id: "item_2",
      orderId: "order_2",
      productId: "missing_product",
      quantity: 1,
      unitPriceInCents: 4500,
    });
  });
} catch (error: unknown) {
  if (error instanceof ConstraintViolationError) {
    console.error("Transaction rolled back:", error.message);
  }
}

console.log("Orders after rollback:", database.getOrders());
console.log("Enterprise rule: use transactions when related writes must succeed together.");
