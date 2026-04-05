import { logger } from "./shared/logger.js";

logger.warn("Over-mocking anti-pattern", {
  problems: [
    "mocking the pricing or checkout logic itself instead of its boundaries",
    "asserting every call sequence even when only the final business outcome matters",
    "rewriting the implementation inside the mock setup",
    "making refactors fail tests even though user-visible behavior is unchanged",
  ],
  enterpriseRule: "Prefer outcome-focused assertions and mock only the unstable or external edges.",
});
