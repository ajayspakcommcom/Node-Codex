import { createLogger } from "@platform/observability/logger";
import { createOrderCreatedEvent } from "@platform/contracts/order-events";
import { ProcessedMessageStore } from "@platform/events/processed-message-store";

const logger = createLogger("payments-consumer");
const processed = new ProcessedMessageStore();
const event = createOrderCreatedEvent("ord_201", "cus_201");

if (!processed.has(event.messageId)) {
  processed.record(event.messageId);
  logger.info("payment_authorized", {
    orderId: event.payload.orderId,
    idempotent: true,
  });
}
