import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "What kinds of API changes are usually backward-compatible, and which ones are clearly breaking?",
  "When would you choose URI-based versioning over header-based versioning in an enterprise API?",
  "How would you deprecate v1 of an API without surprising consumers?",
  "Why is duplicating the whole business layer for each version usually a maintainability problem?",
  "What metrics would you want before retiring an older API version?",
];

logger.info("API versioning interview questions", {
  interviewQuestions,
});
