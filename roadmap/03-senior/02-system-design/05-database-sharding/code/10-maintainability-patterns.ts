import { logger } from "./shared/logger.js";

logger.section("Maintainability Patterns");
const patterns = [
  "Choose shard keys from real access patterns, not naming convenience.",
  "Keep routing predictable for hot read and write paths.",
  "Monitor skew continuously.",
  "Minimize cross-shard coordination by design.",
  "Plan rebalancing and data movement before scale pressure makes it urgent.",
];

for (const pattern of patterns) {
  logger.line(`- ${pattern}`);
}
