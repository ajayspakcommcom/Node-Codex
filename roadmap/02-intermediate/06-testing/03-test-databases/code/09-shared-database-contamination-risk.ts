import { logger } from "./shared/logger.js";

logger.warn("Shared database contamination risk", {
  risks: [
    "tests passing only when run in a certain order",
    "leftover rows changing counts or uniqueness assumptions",
    "manual cleanup being forgotten in local or CI runs",
    "one suite mutating shared fixture state for unrelated suites",
  ],
  enterpriseRule: "Prefer isolated harnesses, reset hooks, or rollback sessions over shared mutable environments.",
});
