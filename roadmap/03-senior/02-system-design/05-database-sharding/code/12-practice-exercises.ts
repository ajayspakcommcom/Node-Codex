import { logger } from "./shared/logger.js";

logger.section("Practice Exercises");
const exercises = [
  "Compare two shard-key candidates against your most common query patterns.",
  "Map one query that remains shard-aware and one that becomes cross-shard fan-out.",
  "Identify which shard is hottest and explain why.",
  "Describe a rebalancing plan for a growing tenant hotspot.",
  "List the operational metrics you would use to spot skew early.",
];

for (const exercise of exercises) {
  logger.line(`- ${exercise}`);
}
