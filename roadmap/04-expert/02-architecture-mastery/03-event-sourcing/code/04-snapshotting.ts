import { OrderStream } from "./domain/order-stream.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("event-sourcing");

const stream = OrderStream.create("order-102", "customer-102", 15_000).confirm();
const snapshot = stream.toSnapshot();

logger.info("snapshot_created", {
  snapshot,
});
