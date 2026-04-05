import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { logger } from "./shared/logger.js";

const goodOrderAnalyzer = new QueryAnalyzer(
  new IndexRegistry([
    {
      name: "idx_orders_user_created_at",
      tableName: "orders",
      columns: ["user_id", "created_at"],
      kind: "composite",
    },
  ]),
);

const poorOrderAnalyzer = new QueryAnalyzer(
  new IndexRegistry([
    {
      name: "idx_orders_created_user",
      tableName: "orders",
      columns: ["created_at", "user_id"],
      kind: "composite",
    },
  ]),
);

const query = {
  name: "List recent orders for one user",
  tableName: "orders",
  filterColumns: ["user_id"],
  sortColumns: ["created_at"],
  projectedColumns: ["id", "status", "created_at"],
};

logger.info("Composite index column order", {
  goodOrderPlan: goodOrderAnalyzer.explain(query),
  poorOrderPlan: poorOrderAnalyzer.explain(query),
  guidance: "Composite indexes are sensitive to column order. The leading column should reflect the real filter path the database uses first.",
});
