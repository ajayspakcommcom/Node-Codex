import type { IndexDefinition, QueryPattern, TableStats } from "./indexing-types.js";

export const tableStats: readonly TableStats[] = [
  {
    tableName: "orders",
    rowCount: 4_500_000,
    writeVolume: "high",
  },
  {
    tableName: "products",
    rowCount: 420_000,
    writeVolume: "medium",
  },
  {
    tableName: "order_items",
    rowCount: 18_000_000,
    writeVolume: "high",
  },
];

export const exampleIndexes: readonly IndexDefinition[] = [
  {
    name: "idx_orders_user_created_at",
    tableName: "orders",
    columns: ["user_id", "created_at"],
    kind: "composite",
  },
  {
    name: "idx_orders_status",
    tableName: "orders",
    columns: ["status"],
    kind: "single",
  },
  {
    name: "idx_products_sku",
    tableName: "products",
    columns: ["sku"],
    kind: "single",
  },
  {
    name: "idx_products_category_price",
    tableName: "products",
    columns: ["category_id", "price_in_cents"],
    includes: ["name", "inventory_count"],
    kind: "composite",
  },
  {
    name: "idx_order_items_order_id",
    tableName: "order_items",
    columns: ["order_id"],
    kind: "single",
  },
];

export const exampleQueries: readonly QueryPattern[] = [
  {
    name: "List recent orders for one user",
    tableName: "orders",
    filterColumns: ["user_id"],
    sortColumns: ["created_at"],
    projectedColumns: ["id", "status", "created_at", "total_in_cents"],
  },
  {
    name: "Catalog page by category sorted by price",
    tableName: "products",
    filterColumns: ["category_id"],
    sortColumns: ["price_in_cents"],
    projectedColumns: ["id", "name", "price_in_cents", "inventory_count"],
  },
  {
    name: "Join order and line items",
    tableName: "order_items",
    filterColumns: ["order_id"],
    sortColumns: [],
    projectedColumns: ["order_id", "product_id", "quantity"],
    joinColumns: ["order_id"],
  },
];

export function getTableStats(tableName: string): TableStats {
  const match = tableStats.find((entry) => entry.tableName === tableName);

  if (match === undefined) {
    throw new Error(`Unknown table stats for ${tableName}.`);
  }

  return match;
}
