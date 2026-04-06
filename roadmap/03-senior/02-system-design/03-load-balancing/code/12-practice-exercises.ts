import { logger } from "./shared/logger.js";

logger.section("Practice Exercises");
const exercises = [
  "Compare round-robin and least-loaded routing for a workload with uneven request cost.",
  "Design a health check that removes unhealthy nodes without causing false positives.",
  "Explain when sticky sessions are worth the resilience tradeoff.",
  "Map how traffic should shift during a zone-level degradation event.",
  "List the metrics you would monitor to catch hotspot formation early.",
];

for (const exercise of exercises) {
  logger.line(`- ${exercise}`);
}
