import { createLogger } from "./shared/logger.js";

const logger = createLogger("high-throughput-services");

const throughputBudget = {
  steadyStateRps: 8_000,
  burstRps: 20_000,
  p95LatencyMs: 100,
  p99LatencyMs: 220,
  dependencyUtilizationThreshold: 0.8,
};

logger.info("throughput_budget_defined", {
  throughputBudget,
});
