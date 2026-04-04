import { logger } from "./shared/logger.js";
import { listTaskRecords } from "./module/infrastructure/in-memory-task-store.js";

const infrastructureRecords = listTaskRecords();

logger.info("Infrastructure boundary example", {
  infrastructureRecords,
  guidance: "Infrastructure concerns should stay behind repository boundaries instead of flowing into controllers and services.",
});
