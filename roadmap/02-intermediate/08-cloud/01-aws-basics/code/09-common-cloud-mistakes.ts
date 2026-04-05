import { logger } from "./shared/logger.js";

logger.warn("Common cloud mistakes", {
  mistakes: [
    "assuming managed services remove all responsibility",
    "granting broad IAM permissions without least-privilege thinking",
    "ignoring region and availability choices until later",
    "choosing services before clarifying workload fit",
    "treating cost behavior as somebody else’s concern",
  ],
});
