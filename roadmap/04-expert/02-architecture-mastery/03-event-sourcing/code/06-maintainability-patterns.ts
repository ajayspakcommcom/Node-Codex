import { createLogger } from "./shared/logger.js";

const logger = createLogger("event-sourcing");

logger.info("event_sourcing_policy_defined", {
  policy: {
    streamIsSourceOfTruth: true,
    projectionsAreRebuildable: true,
    snapshotVersioningRequired: true,
    replayCostMustBeMeasured: true,
  },
});
