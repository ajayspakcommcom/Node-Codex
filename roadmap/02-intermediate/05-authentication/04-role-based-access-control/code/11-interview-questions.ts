import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why should roles usually be modeled as bundles of permissions instead of as the final authorization rule?",
  "Why are route guards alone not enough for critical authorization decisions?",
  "Why can tenant or ownership context make a role check insufficient?",
  "What is role explosion, and why does it make enterprise authorization harder to maintain?",
  "When is RBAC alone not enough to express a real authorization rule?",
];

logger.info("RBAC interview questions", {
  interviewQuestions,
});
