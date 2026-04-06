import { logger } from "./shared/logger.js";

logger.section("Maintainability Patterns");
const patterns = [
  "Keep gateway responsibilities narrow and explicit.",
  "Document which policies live at the edge and which stay in services.",
  "Measure gateway latency and saturation as first-class platform metrics.",
  "Use aggregation sparingly and intentionally.",
  "Give the gateway a real platform owner with change discipline.",
];

for (const pattern of patterns) {
  logger.line(`- ${pattern}`);
}
