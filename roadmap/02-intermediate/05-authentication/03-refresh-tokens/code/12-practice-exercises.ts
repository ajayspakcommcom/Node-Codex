import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a refresh request that fails because the token has expired and explain the user-experience tradeoff.",
  "Create a session family with multiple rotations and then revoke it after detecting reuse of an old token.",
  "Add a device-aware session model so one user can have multiple refresh-token families at the same time.",
  "Model a secure storage strategy for refresh tokens in a browser-backed application and explain the tradeoffs.",
  "Create tests that prove a reused rotated token triggers compromise handling for the full session family.",
];

logger.info("Refresh tokens practice exercises", {
  practiceExercises,
});
