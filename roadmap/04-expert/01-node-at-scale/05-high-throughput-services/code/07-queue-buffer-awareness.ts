import { createLogger } from "./shared/logger.js";

const logger = createLogger("high-throughput-services");

logger.warn("queue_buffer_awareness", {
  queueDepth: 1_200,
  maxSafeDepth: 1_500,
  note: "Queues smooth spikes but still need bounded depth, consumer protection, and replay rules.",
});
