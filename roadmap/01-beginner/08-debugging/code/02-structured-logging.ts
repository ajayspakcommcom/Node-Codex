import { createLogger } from "./shared/logger.js";

const logger = createLogger("structured-logging");

logger.info("Fetching order summary", {
  requestId: "req_1001",
  route: "/orders/summary",
  actorId: "usr_200",
  operation: "fetch-order-summary",
  orderId: "ord_9001",
});
