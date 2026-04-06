import { logger } from "./shared/logger.js";

logger.section("Interview Questions");
const questions = [
  "Why is load balancing a reliability topic, not only a scale topic?",
  "When is least-loaded routing better than round robin?",
  "What makes a health check dangerous or useful?",
  "Why do sticky sessions complicate failover?",
  "Which observability signals tell you traffic distribution is unhealthy?",
];

for (const question of questions) {
  logger.line(`- ${question}`);
}
