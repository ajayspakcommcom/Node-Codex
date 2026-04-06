import { logger } from "./shared/logger.js";

logger.section("Common Horizontal Scaling Mistakes");
const mistakes = [
  "Adding replicas while leaving session state in memory.",
  "Scaling API nodes without checking shared database saturation.",
  "Ignoring duplicate worker execution across replicas.",
  "Using weak signals for autoscaling decisions.",
  "Assuming more instances automatically improve resilience.",
];

for (const mistake of mistakes) {
  logger.line(`- ${mistake}`);
}
