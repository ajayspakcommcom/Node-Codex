import { createLogger } from "./shared/logger";

const logger = createLogger("hidden-rpc");

logger.info("bad_pattern", {
  eventName: "shipping.mustCreateShipmentNow",
  issue: "This is a command disguised as an event and creates hidden synchronous expectations.",
});

logger.info("better_pattern", {
  eventName: "order.paid",
  issue:
    "Consumers decide independently whether they need to act on this fact.",
});
