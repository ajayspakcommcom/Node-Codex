import { logger } from "./shared/logger.js";

logger.info("Compute vs storage separation", {
  principles: [
    "EC2 should run application workloads, not become the durable file store.",
    "S3 should own long-lived object storage responsibilities.",
    "RDS should own relational persistence instead of application-instance state.",
  ],
});
