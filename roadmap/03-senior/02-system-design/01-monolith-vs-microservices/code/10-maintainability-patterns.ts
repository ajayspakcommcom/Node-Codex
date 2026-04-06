import { logger } from "./shared/logger.js";

logger.section("Maintainability Patterns");
const patterns = [
  "Keep a modular monolith with explicit internal boundaries before extracting services.",
  "Document domain ownership and contracts before network boundaries exist.",
  "Track why a service exists, not only what it does.",
  "Prefer fewer stable boundaries over many noisy ones.",
  "Review extraction decisions with operational evidence, not architectural taste.",
];

for (const pattern of patterns) {
  logger.line(`- ${pattern}`);
}
