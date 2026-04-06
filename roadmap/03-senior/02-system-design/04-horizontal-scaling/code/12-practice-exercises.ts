import { logger } from "./shared/logger.js";

logger.section("Practice Exercises");
const exercises = [
  "Take a stateful endpoint and list what must change before it can scale safely across replicas.",
  "Identify one shared dependency that remains a bottleneck after adding more API nodes.",
  "Describe how duplicate work appears when multiple workers consume the same logical workload.",
  "Choose three trusted autoscaling signals for an HTTP API and justify them.",
  "Explain when optimization is better than scale-out for a specific bottleneck.",
];

for (const exercise of exercises) {
  logger.line(`- ${exercise}`);
}
