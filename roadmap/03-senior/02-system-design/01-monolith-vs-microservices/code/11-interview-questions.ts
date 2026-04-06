import { logger } from "./shared/logger.js";

logger.section("Interview Questions");
const questions = [
  "When should a modular monolith stay a monolith?",
  "What signals justify extracting a service?",
  "How do synchronous service chains affect user latency and incident debugging?",
  "Why is team ownership part of service-boundary design?",
  "What costs does distribution introduce even when business logic stays the same?",
];

for (const question of questions) {
  logger.line(`- ${question}`);
}
