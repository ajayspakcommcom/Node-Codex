import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep core filters and projections readable instead of building giant inline objects in controllers.",
  "Validate user-driven page size, sort field, and filter options before building the query.",
  "Use narrow projections for grid and API responses instead of returning full documents by default.",
  "Prefer targeted update operators for partial state changes.",
  "Review query shape together with sorting and likely index support.",
  "Separate simple retrieval queries from aggregation-based reporting paths.",
];

logger.info("Maintainability patterns for MongoDB query basics", {
  maintainabilityPatterns,
  guidance: "Enterprise MongoDB code stays maintainable when query intent, safety, and access-pattern fit remain explicit.",
});
