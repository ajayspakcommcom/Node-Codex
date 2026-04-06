import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "keep overload policy explicit",
    "bound queues and pending delivery counts",
    "make rejection and shedding observable",
    "treat queue growth as a signal to investigate capacity mismatch",
    "design retries with dependency pressure in mind",
  ],
});
