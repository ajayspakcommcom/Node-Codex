import { createLogger } from "./shared/logger.js";

const logger = createLogger("event-sourcing");

logger.info("event_store_role_defined", {
  sourceOfTruth: "event stream",
  derivedModels: ["order-summary-projection", "reporting-view"],
});
