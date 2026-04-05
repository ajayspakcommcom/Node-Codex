import { OrderQueryBuilderRepository } from "./module/query-builder/order-query-builder-repository.js";
import { exampleCustomers, exampleOrders } from "./shared/data-access-runtime.js";
import { logger } from "./shared/logger.js";

const repository = new OrderQueryBuilderRepository(exampleOrders, exampleCustomers);
const result = repository.revenueByChannelForTenant("tenant_alpha");

logger.info("Query-builder-style reporting read", {
  sql: result.sql,
  rows: result.rows,
  guidance: "Query builders often fit reporting and summary reads well because the selected fields, grouping, and ordering remain explicit.",
});
