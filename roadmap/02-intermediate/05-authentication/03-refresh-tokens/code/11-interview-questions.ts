import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why are refresh tokens used together with short-lived access tokens instead of replacing them entirely?",
  "Why does rotating a refresh token improve security over reusing the same long-lived token?",
  "Why is refresh-token replay detection important in an enterprise session design?",
  "Why do refresh tokens usually require server-side state even when access tokens are stateless?",
  "What should happen to the session family when refresh-token compromise is detected?",
];

logger.info("Refresh tokens interview questions", {
  interviewQuestions,
});
