import { ConstraintViolationError, FakeDatabase } from "./shared/fake-database";

const database = new FakeDatabase();

console.log("Primary key example: users.id");
console.log("Foreign key example: orders.userId -> users.id");
console.log("Unique constraint example: products.sku");

database.insertProduct({
  id: "prod_3",
  sku: "redis-guide",
  name: "Redis Practical Guide",
  priceInCents: 6000,
  inventoryCount: 15,
  createdAt: "2026-04-04T09:00:00.000Z",
});

try {
  database.insertProduct({
    id: "prod_4",
    sku: "redis-guide",
    name: "Duplicate SKU",
    priceInCents: 6100,
    inventoryCount: 20,
    createdAt: "2026-04-04T09:05:00.000Z",
  });
} catch (error: unknown) {
  if (error instanceof ConstraintViolationError) {
    console.error("Constraint protected the database:", error.message);
  }
}
