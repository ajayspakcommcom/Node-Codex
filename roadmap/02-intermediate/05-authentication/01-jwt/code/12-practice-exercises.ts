import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a token verification rule for not-before handling and explain the operational tradeoff.",
  "Create a key rollover example where two verification keys coexist during migration.",
  "Add a service that rejects tokens missing a required scope for a protected operation.",
  "Model a compromised-token scenario and describe what controls still help even before expiry.",
  "Create tests that prove a decoded-but-unverified token must not be trusted by authorization logic.",
];

logger.info("JWT practice exercises", {
  practiceExercises,
});
