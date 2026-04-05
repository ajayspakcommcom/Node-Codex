import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "How do you decide where a transaction boundary should begin and end?",
  "Why is it risky to call external APIs inside a database transaction?",
  "What kinds of anomalies does stronger isolation try to prevent, and what tradeoff does that introduce?",
  "Why do deadlocks still happen in correctly written systems, and how should a service respond?",
  "When would you use an outbox pattern instead of trying to publish directly inside the transaction?",
];

logger.info("Transactions interview questions", {
  interviewQuestions,
});
