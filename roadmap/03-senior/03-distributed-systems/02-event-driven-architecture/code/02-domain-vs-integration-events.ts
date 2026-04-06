import { createLogger } from "./shared/logger";
import { createEventEnvelope } from "./shared/event-types";

const logger = createLogger("domain-vs-integration");

const domainEvent = createEventEnvelope("order.confirmed", {
  orderId: "ord_200",
  totalAmount: 4999,
});

const integrationEvent = createEventEnvelope("commerce.order.confirmed.v1", {
  orderId: "ord_200",
  totalAmount: 4999,
  currency: "INR",
});

logger.info("domain_event", {
  eventName: domainEvent.eventName,
  note: "Internal to a bounded context and closer to business language.",
});

logger.info("integration_event", {
  eventName: integrationEvent.eventName,
  note: "Stable cross-service contract with explicit versioning.",
});
