import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "When would you choose per-user limiting instead of per-IP limiting?",
  "Why is in-memory rate limiting unsafe in a horizontally scaled deployment?",
  "What are the tradeoffs between fail-open and fail-closed rate-limit behavior?",
  "Why should login endpoints often have different limits from normal business APIs?",
  "What metrics would you monitor to know whether a rate-limit policy is too aggressive?",
];

logger.info("Rate-limiting interview questions", {
  interviewQuestions,
});
