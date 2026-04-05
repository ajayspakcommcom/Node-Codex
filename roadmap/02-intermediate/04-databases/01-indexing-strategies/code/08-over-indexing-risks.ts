import { WriteCostAnalyzer } from "./module/analyzers/write-cost-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes, getTableStats } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const ordersTable = getTableStats("orders");
const ordersIndexes = new IndexRegistry(exampleIndexes).listForTable("orders");
const writeCostAnalyzer = new WriteCostAnalyzer();

logger.warn("Over-indexing risks", {
  writeCostEstimate: writeCostAnalyzer.estimateWriteCost(ordersTable, ordersIndexes),
  overlapWarnings: writeCostAnalyzer.findPotentialOverlap([
    ...ordersIndexes,
    {
      name: "idx_orders_user_only",
      tableName: "orders",
      columns: ["user_id"],
      kind: "single",
    },
  ]),
  guidance: "Indexes improve reads, but every extra index adds maintenance cost. High-write tables deserve especially disciplined indexing decisions.",
});
