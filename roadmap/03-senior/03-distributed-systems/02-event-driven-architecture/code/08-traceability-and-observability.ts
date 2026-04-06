import { InMemoryEventBus } from "./shared/in-memory-event-bus";
import { createEventEnvelope } from "./shared/event-types";
import { createLogger } from "./shared/logger";

const logger = createLogger("observability");
const bus = new InMemoryEventBus(logger);

bus.subscribe("payment.captured", async (event) => {
  logger.info("handler_start", {
    traceId: event.traceId,
    eventName: event.eventName,
    consumer: "ledger-service",
  });

  logger.info("handler_complete", {
    traceId: event.traceId,
    messageId: event.messageId,
    consumer: "ledger-service",
  });
});

async function main(): Promise<void> {
  await bus.publish(
    createEventEnvelope("payment.captured", {
      paymentId: "pay_10",
      amount: 6500,
    }),
  );
}

void main();
