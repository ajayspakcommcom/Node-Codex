import { logger } from "./shared/logger.js";

logger.section("Balancer Observability Signals");
const signals = [
  "Per-node request count",
  "Per-node active connection count",
  "Health-check transitions",
  "Zone-level traffic skew",
  "Tail latency after failover events",
];

for (const signal of signals) {
  logger.line(`- ${signal}`);
}
