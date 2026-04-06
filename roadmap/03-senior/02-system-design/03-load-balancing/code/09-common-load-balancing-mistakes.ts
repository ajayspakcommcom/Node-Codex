import { logger } from "./shared/logger.js";

logger.section("Common Load Balancing Mistakes");
const mistakes = [
  "Assuming round robin is always enough.",
  "Using shallow health checks that miss partial failure.",
  "Keeping sticky session assumptions without clear need.",
  "Ignoring zonal skew and partial-outage behavior.",
  "Watching total traffic but not per-node imbalance.",
];

for (const mistake of mistakes) {
  logger.line(`- ${mistake}`);
}
