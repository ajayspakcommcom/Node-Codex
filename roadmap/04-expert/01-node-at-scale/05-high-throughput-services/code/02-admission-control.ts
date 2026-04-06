import { createLogger } from "./shared/logger.js";
import { TokenBucketLimiter } from "./shared/token-bucket.js";

const logger = createLogger("high-throughput-services");
const limiter = new TokenBucketLimiter(100, 50);

const accepted = limiter.tryConsume("tenant-a", 1);

logger.info("admission_control_evaluated", {
  tenant: "tenant-a",
  accepted,
  note: "Reject excess work before it turns into uncontrolled latency and memory growth.",
});
