import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why is query shape more important than column name alone when choosing an index?",
  "How does column order affect a composite index?",
  "Why can too many indexes hurt a high-write table?",
  "What is selectivity, and why does it matter for indexing decisions?",
  "What evidence would you review before and after adding an index to production?",
];

logger.info("Indexing strategies interview questions", {
  interviewQuestions,
});
