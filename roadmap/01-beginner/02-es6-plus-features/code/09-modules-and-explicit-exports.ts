import { average } from "./shared/math.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger({ service: "analytics-service" });
const latencies = [120, 80, 100, 140] as const;

logger.info("Computed average latency", {
  averageMs: average(latencies),
});
