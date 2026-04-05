import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep rate-limit policy selection near the transport boundary instead of scattering thresholds across route handlers.",
  "Use identity keys that match real fairness boundaries such as user, tenant, or client credential.",
  "Separate login, public, partner, and expensive-report policies instead of using one global rule.",
  "Treat dependency failure strategy as policy data, not hidden implementation behavior.",
  "Instrument policy hits and block rates before tuning thresholds aggressively.",
];

logger.info("Maintainability patterns for rate limiting", {
  maintainabilityPatterns,
  guidance: "Enterprise rate limiting stays maintainable when policy intent, fairness keys, and failure behavior remain explicit.",
});
