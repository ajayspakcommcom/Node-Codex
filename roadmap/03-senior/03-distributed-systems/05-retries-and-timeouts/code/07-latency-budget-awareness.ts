import { createLogger } from "./shared/logger";

const logger = createLogger("latency-budget");

const endToEndBudgetMs = 1200;
const apiGatewayBudgetMs = 100;
const orderServiceBudgetMs = 400;
const paymentGatewayBudgetMs = 500;

logger.info("latency_budget", {
  endToEndBudgetMs,
  remainingMs:
    endToEndBudgetMs -
    apiGatewayBudgetMs -
    orderServiceBudgetMs -
    paymentGatewayBudgetMs,
  note: "Timeouts should fit inside the end-to-end budget instead of being chosen independently.",
});
