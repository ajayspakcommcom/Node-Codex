import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Name stages by business purpose instead of leaving them anonymous.",
  "Filter and project early when they reduce downstream work.",
  "Treat lookups and unwinds as cost-sensitive stages that deserve review.",
  "Document why a complex reporting pipeline exists and which endpoints depend on it.",
  "Inspect explain-style output and stage metrics for important queries.",
  "Reconsider materialization when the same expensive summary is requested repeatedly.",
];

logger.info("Maintainability patterns for aggregation pipelines", {
  maintainabilityPatterns,
  guidance: "Enterprise aggregation stays maintainable when stage intent, cost, and reporting purpose remain explicit.",
});
