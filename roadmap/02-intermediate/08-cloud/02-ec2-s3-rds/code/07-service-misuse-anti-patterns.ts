import { logger } from "./shared/logger.js";

logger.warn("Service misuse anti-patterns", {
  mistakes: [
    "storing user uploads only on EC2 instance disks",
    "treating EC2 as the place for every infrastructure concern",
    "assuming managed RDS means schema and query design no longer matter",
    "ignoring S3 storage and transfer behavior as data volume grows",
  ],
});
