import { logger } from "./shared/logger.js";

logger.warn("Common EC2, S3, and RDS mistakes", {
  mistakes: [
    "using EC2 disk as the main durable storage layer",
    "keeping too many unrelated responsibilities on one EC2 host",
    "treating RDS as if scaling and maintenance concerns disappear",
    "choosing services from familiarity instead of workload fit",
    "ignoring the cost behavior of always-on compute, storage, and transfer",
  ],
});
