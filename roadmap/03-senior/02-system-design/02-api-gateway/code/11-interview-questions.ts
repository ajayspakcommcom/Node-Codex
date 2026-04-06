import { logger } from "./shared/logger.js";

logger.section("Interview Questions");
const questions = [
  "What belongs in an API gateway and what should stay in downstream services?",
  "Why can gateway aggregation become dangerous at scale?",
  "How do edge auth and service authorization differ?",
  "When does a gateway become a platform bottleneck?",
  "What ownership model keeps an API gateway healthy over time?",
];

for (const question of questions) {
  logger.line(`- ${question}`);
}
