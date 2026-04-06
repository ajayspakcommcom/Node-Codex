import { logger } from "./shared/logger.js";

logger.section("Common Architecture Mistakes");
const mistakes = [
  "Splitting too early because microservices sound more senior.",
  "Ignoring critical-path latency created by service chains.",
  "Creating service boundaries without team ownership clarity.",
  "Moving coordination problems into runtime retries and compensations without need.",
  "Assuming independent deployment always outweighs operational complexity.",
];

for (const mistake of mistakes) {
  logger.line(`- ${mistake}`);
}
