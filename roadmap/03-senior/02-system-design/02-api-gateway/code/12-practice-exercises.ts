import { logger } from "./shared/logger.js";

logger.section("Practice Exercises");
const exercises = [
  "Take one existing route and decide which concerns belong at the edge versus inside the service.",
  "Map a gateway aggregation request and list each new failure and latency dependency it introduces.",
  "Design a rate-limit strategy for public, user-scoped, and tenant-scoped routes.",
  "List the operational signals that tell you the gateway is becoming a bottleneck.",
  "Write a short policy describing who owns gateway changes and how service teams onboard routes.",
];

for (const exercise of exercises) {
  logger.line(`- ${exercise}`);
}
