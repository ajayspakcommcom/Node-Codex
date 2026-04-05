import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Design indexes around real query shapes instead of column popularity alone.",
  "Document why important indexes exist and what workload they support.",
  "Review overlapping indexes periodically to reduce accidental redundancy.",
  "Balance read-path gains against write amplification on high-write tables.",
  "Validate major indexing changes with execution-plan evidence before expanding them broadly.",
];

logger.info("Maintainability patterns for indexing strategies", {
  maintainabilityPatterns,
  guidance: "Enterprise indexing stays maintainable when performance intent, workload fit, and write cost remain explicit.",
});
