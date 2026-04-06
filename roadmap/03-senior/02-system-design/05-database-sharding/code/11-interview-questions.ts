import { logger } from "./shared/logger.js";

logger.section("Interview Questions");
const questions = [
  "Why is sharding rarely the first scaling answer?",
  "What makes a shard key good or dangerous?",
  "Why do cross-shard queries and transactions become costly?",
  "How do you detect hotspot formation?",
  "What makes rebalancing an operational risk rather than a simple data copy?",
];

for (const question of questions) {
  logger.line(`- ${question}`);
}
