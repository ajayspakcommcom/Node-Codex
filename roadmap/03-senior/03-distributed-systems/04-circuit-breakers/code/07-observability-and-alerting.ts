import { createLogger } from "./shared/logger";

const logger = createLogger("observability");

logger.info("metrics_to_monitor", {
  openTransitions: 12,
  blockedCalls: 320,
  halfOpenTrials: 8,
  fallbackUsage: 102,
  note: "These metrics tell you whether the breaker is protecting the system or hiding a chronic failure.",
});
