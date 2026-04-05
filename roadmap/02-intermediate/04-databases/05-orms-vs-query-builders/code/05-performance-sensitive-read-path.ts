import { AbstractionFitAdvisor } from "./module/advisors/abstraction-fit-advisor.js";
import { OrderQueryBuilderRepository } from "./module/query-builder/order-query-builder-repository.js";
import { exampleCustomers, exampleOrders } from "./shared/data-access-runtime.js";
import { logger } from "./shared/logger.js";

const advisor = new AbstractionFitAdvisor();
const recommendation = advisor.recommend({
  workload: "reporting-heavy",
  teamStrength: "query-tuning",
  performanceSensitivity: "high",
});
const repository = new OrderQueryBuilderRepository(exampleOrders, exampleCustomers);
const highValueCustomers = repository.highValueEnterpriseCustomers("tenant_alpha", 100_000);

logger.info("Performance-sensitive read path", {
  recommendation,
  sql: highValueCustomers.sql,
  rows: highValueCustomers.rows,
  guidance: "When a path is performance-sensitive and query shape matters deeply, explicit query construction is often easier to tune than a higher-level model abstraction.",
});
