import { createLogger } from "./shared/logger";

const logger = createLogger("eventual-consistency");

interface OrderReadModel {
  paymentStatus: "pending" | "captured";
  shipmentStatus: "pending" | "requested";
}

const readModel: OrderReadModel = {
  paymentStatus: "pending",
  shipmentStatus: "pending",
};

logger.info("before_events", readModel);

readModel.paymentStatus = "captured";
logger.info("after_payment_event", readModel);

readModel.shipmentStatus = "requested";
logger.info("after_shipment_event", {
  ...readModel,
  note: "Read models converge over time instead of updating atomically everywhere.",
});
