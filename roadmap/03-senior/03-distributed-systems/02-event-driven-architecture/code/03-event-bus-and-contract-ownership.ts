import { InMemoryEventBus } from "./shared/in-memory-event-bus";
import { createLogger } from "./shared/logger";
import { createEventEnvelope } from "./shared/event-types";

const logger = createLogger("contract-ownership");
const bus = new InMemoryEventBus(logger);

bus.subscribe("commerce.order.created.v1", async (event) => {
  logger.info("consumer_received", {
    owner: "inventory-service",
    eventName: event.eventName,
    schemaVersion: event.schemaVersion,
  });
});

async function main(): Promise<void> {
  await bus.publish(
    createEventEnvelope("commerce.order.created.v1", {
      orderId: "ord_501",
      customerId: "cus_88",
    }),
  );
}

void main();
