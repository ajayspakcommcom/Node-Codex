import { createLogger } from "@platform/observability/logger";

const logger = createLogger("order-projection");

const readModel = {
  orderId: "ord_201",
  status: "confirmed",
  paymentStatus: "authorized",
  inventoryStatus: "reserved",
};

logger.info("projection_updated", {
  readModel,
  note: "Projection is eventually consistent and optimized for reads rather than source-of-truth writes.",
});
