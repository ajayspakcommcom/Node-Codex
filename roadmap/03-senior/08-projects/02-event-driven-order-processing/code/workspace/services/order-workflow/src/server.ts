import { createLogger } from "@platform/observability/logger";
import { createOrderCreatedEvent } from "@platform/contracts/order-events";

const logger = createLogger("order-workflow");

const event = createOrderCreatedEvent("ord_201", "cus_201");

logger.info("order_workflow_started", {
  eventName: event.eventName,
  orderId: event.payload.orderId,
  note: "Workflow service owns order-lifecycle orchestration and event publication sequencing.",
});
