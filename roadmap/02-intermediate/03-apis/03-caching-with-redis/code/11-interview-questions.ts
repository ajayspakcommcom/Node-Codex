import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "When is cache-aside a better fit than write-through or read-through caching?",
  "Why can weak cache keys become a correctness or tenant-isolation problem?",
  "What is a cache stampede, and how would you mitigate it for a hot key?",
  "How should a service behave if Redis becomes unavailable for a non-critical read path?",
  "What metrics would you inspect to confirm a Redis cache is actually helping the system?",
];

logger.info("Redis caching interview questions", {
  interviewQuestions,
});
