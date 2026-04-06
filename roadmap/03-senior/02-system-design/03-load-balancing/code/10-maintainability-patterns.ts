import { logger } from "./shared/logger.js";

logger.section("Maintainability Patterns");
const patterns = [
  "Document what the balancer optimizes for.",
  "Treat health-check design as a reliability contract.",
  "Keep session affinity explicit and rare.",
  "Observe traffic per node and per zone, not only in aggregate.",
  "Test failover behavior before incidents expose it.",
];

for (const pattern of patterns) {
  logger.line(`- ${pattern}`);
}
