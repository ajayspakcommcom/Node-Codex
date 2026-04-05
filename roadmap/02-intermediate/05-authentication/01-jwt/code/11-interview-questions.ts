import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why is decoding a JWT not the same as verifying it?",
  "Why should access tokens usually be short-lived even when using refresh tokens elsewhere in the system?",
  "Why is key rotation important for JWT-based authentication?",
  "Why does stateless JWT authentication make immediate revocation harder?",
  "Why should authentication and authorization still be treated as separate concerns when a token carries roles or scopes?",
];

logger.info("JWT interview questions", {
  interviewQuestions,
});
