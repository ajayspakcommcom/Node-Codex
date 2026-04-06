import { createLogger } from "./shared/logger";
import { type EventEnvelope, createEnvelope } from "./shared/message-types";

const logger = createLogger("producer");

interface MessageBroker {
  publish(message: EventEnvelope): Promise<void>;
}

class AuditSafeProducer {
  constructor(private readonly broker: MessageBroker) {}

  async publishOrderCreated(orderId: string, customerId: string): Promise<void> {
    const message = createEnvelope("order.created", {
      orderId,
      customerId,
      createdAt: new Date().toISOString(),
    });

    logger.info("publishing_message", {
      messageId: message.messageId,
      eventName: message.eventName,
      schemaVersion: message.schemaVersion,
    });

    await this.broker.publish(message);
  }
}

class ConsoleBroker implements MessageBroker {
  async publish(message: EventEnvelope): Promise<void> {
    logger.info("message_published", {
      messageId: message.messageId,
      eventName: message.eventName,
    });
  }
}

async function main(): Promise<void> {
  const producer = new AuditSafeProducer(new ConsoleBroker());
  await producer.publishOrderCreated("ord_101", "cus_501");
}

void main();
