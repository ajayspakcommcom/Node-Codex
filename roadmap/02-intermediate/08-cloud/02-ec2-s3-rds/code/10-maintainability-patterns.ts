import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns for EC2, S3, and RDS", {
  patterns: [
    "separate compute, file storage, and relational persistence responsibilities clearly",
    "keep durable assets out of application instance disks",
    "review cost and scaling assumptions early",
    "treat managed services as operational help, not architectural shortcuts",
  ],
});
