import { createLogger } from "./shared/logger";
import { IdempotencyStore } from "./shared/idempotency-store";

const logger = createLogger("request-state");
const store = new IdempotencyStore();

store.markInProgress("idem_order_1");

logger.info("in_progress_record", {
  key: "idem_order_1",
  record: store.get("idem_order_1"),
});

store.markCompleted("idem_order_1", "ord_500");

logger.info("completed_record", {
  key: "idem_order_1",
  record: store.get("idem_order_1"),
});
