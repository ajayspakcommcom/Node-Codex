import { logger } from "./shared/logger.js";

logger.section("Interview Questions");
const questions = [
  "Why does statelessness matter for horizontal scaling?",
  "What shared-state assumptions usually break first when replicas increase?",
  "Why can a database remain the real bottleneck after scaling API nodes?",
  "What role does idempotency play in replica safety?",
  "Which signals should and should not drive autoscaling?",
];

for (const question of questions) {
  logger.line(`- ${question}`);
}
