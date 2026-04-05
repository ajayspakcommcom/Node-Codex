import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add an authorization request that asks for an invalid scope and verify the server rejects it.",
  "Create a code-exchange example that fails because the redirect URI does not match the original request.",
  "Add a resource server rule that requires a different audience and demonstrate token rejection.",
  "Model a new internal service client and decide whether it should use client credentials or a user-delegated flow.",
  "Create tests that prove an authorization code cannot be reused after a successful token exchange.",
];

logger.info("OAuth2 practice exercises", {
  practiceExercises,
});
