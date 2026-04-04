import { logger } from "./shared/logger.js";

function normalizeCustomerId(customerId: string): string {
  return customerId.trim().toLowerCase();
}

const normalizedIds = [" Customer_A ", "customer_a ", "CUSTOMER_B"].map(normalizeCustomerId);

logger.info("Reducing duplication example", {
  normalizedIds,
  guidance: "Extract repeated knowledge into one cohesive helper instead of reimplementing the same normalization logic.",
});
