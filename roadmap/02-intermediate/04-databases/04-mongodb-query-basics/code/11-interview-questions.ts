import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why is projection important even when a MongoDB query already matches the correct documents?",
  "Why should filtering, sorting, and pagination be reviewed together instead of independently?",
  "When is a targeted update operator safer than replacing the whole document?",
  "Why can deep skip-based pagination become expensive on large collections?",
  "When should a team choose aggregation instead of a simple find query?",
];

logger.info("MongoDB query basics interview questions", {
  interviewQuestions,
});
