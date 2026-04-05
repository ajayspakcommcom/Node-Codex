import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep version-specific parsing and serialization at the transport boundary.",
  "Share stable business workflows across versions unless behavior truly differs.",
  "Track deprecation state with explicit policy data instead of scattered conditionals.",
  "Measure version usage before planning removal of a contract.",
  "Ship migration notes and successor links together with deprecation headers.",
];

logger.info("Maintainability patterns for versioned APIs", {
  maintainabilityPatterns,
  guidance: "Enterprise versioning succeeds when compatibility decisions remain explicit, observable, and localized.",
});
