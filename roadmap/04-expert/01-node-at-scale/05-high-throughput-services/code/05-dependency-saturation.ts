import { createLogger } from "./shared/logger.js";

const logger = createLogger("high-throughput-services");

const dependencyState = {
  poolSize: 100,
  activeConnections: 83,
  queueDepth: 12,
};

logger.warn("dependency_saturation_review", {
  dependencyState,
  note: "Scaling the edge is unsafe when the real bottleneck is already saturated.",
});
