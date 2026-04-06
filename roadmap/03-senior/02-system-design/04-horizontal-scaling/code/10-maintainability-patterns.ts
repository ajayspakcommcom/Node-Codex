import { logger } from "./shared/logger.js";

logger.section("Maintainability Patterns");
const patterns = [
  "Design request-serving layers to be stateless by default.",
  "Externalize shared state intentionally and document where it lives.",
  "Track which layer is the real scaling constraint.",
  "Require idempotency where work may be duplicated across replicas.",
  "Use trusted saturation signals before automating scale-out.",
];

for (const pattern of patterns) {
  logger.line(`- ${pattern}`);
}
