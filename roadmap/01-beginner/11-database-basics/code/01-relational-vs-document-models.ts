import type { ProductDocument, ProductRow } from "./shared/database-types";

const relationalProductRow: ProductRow = {
  id: "prod_1",
  sku: "node-book",
  name: "Node Architecture Handbook",
  priceInCents: 4500,
  inventoryCount: 30,
  createdAt: "2026-04-04T08:00:00.000Z",
};

const documentProduct: ProductDocument = {
  _id: "prod_1",
  sku: "node-book",
  title: "Node Architecture Handbook",
  pricing: {
    amountInCents: 4500,
    currency: "INR",
  },
  inventory: {
    available: 30,
    warehouseCode: "blr-1",
  },
  tags: ["node", "architecture", "backend"],
};

console.log("Relational row shape:", relationalProductRow);
console.log("Document shape:", documentProduct);
console.log("Enterprise rule: choose storage shape based on access patterns and integrity needs.");
