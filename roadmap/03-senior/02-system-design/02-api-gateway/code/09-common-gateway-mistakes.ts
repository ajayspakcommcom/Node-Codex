import { logger } from "./shared/logger.js";

logger.section("Common Gateway Mistakes");
const mistakes = [
  "Putting business workflows into the gateway.",
  "Treating edge auth as a replacement for service-level authorization.",
  "Hiding downstream latency inside gateway aggregation.",
  "Making every team depend on a single giant edge control plane.",
  "Ignoring gateway saturation until it becomes a system-wide incident source.",
];

for (const mistake of mistakes) {
  logger.line(`- ${mistake}`);
}
