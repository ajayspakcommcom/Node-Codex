import { logger } from "./shared/logger.js";

logger.warn("Common unit testing mistakes", {
  mistakes: [
    "testing private helpers instead of meaningful public behavior",
    "asserting internal call order that does not matter to the business outcome",
    "using the real clock, randomness, or environment state",
    "over-mocking until the test only mirrors the implementation",
    "combining many branches into one unreadable test",
  ],
  enterpriseRule: "Prefer small deterministic tests that protect business rules and remain stable during safe refactors.",
});
