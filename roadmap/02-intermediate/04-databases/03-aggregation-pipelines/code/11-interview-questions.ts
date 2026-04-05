import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why should filtering and projection usually appear early in an aggregation pipeline?",
  "How can a lookup plus unwind stage create fan-out risk in production?",
  "When would you choose a materialized read model instead of a live aggregation?",
  "Why is sorting a large intermediate dataset often more expensive than sorting a grouped result?",
  "What runtime evidence would you review before approving a complex reporting pipeline?",
];

logger.info("Aggregation pipelines interview questions", {
  interviewQuestions,
});
