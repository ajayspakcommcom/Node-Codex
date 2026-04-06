import { createEventEnvelope, type EventEnvelope } from "./shared/event-types";
import { createLogger } from "./shared/logger";

const logger = createLogger("maintainability");

interface EventPublisher {
  publish(event: EventEnvelope): Promise<void>;
}

class CustomerLifecyclePublisher {
  constructor(private readonly publisher: EventPublisher) {}

  async publishCustomerUpgraded(customerId: string, plan: string): Promise<void> {
    await this.publisher.publish(
      createEventEnvelope("customer.upgraded.v1", {
        customerId,
        plan,
      }),
    );
  }
}

class LoggingPublisher implements EventPublisher {
  async publish(event: EventEnvelope): Promise<void> {
    logger.info("event_published", {
      eventName: event.eventName,
      schemaVersion: event.schemaVersion,
      traceId: event.traceId,
    });
  }
}

async function main(): Promise<void> {
  const publisher = new CustomerLifecyclePublisher(new LoggingPublisher());
  await publisher.publishCustomerUpgraded("cus_900", "enterprise");
}

void main();
