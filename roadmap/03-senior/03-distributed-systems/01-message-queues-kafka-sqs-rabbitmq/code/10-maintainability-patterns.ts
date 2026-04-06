import { createLogger } from "./shared/logger";
import { type EventEnvelope } from "./shared/message-types";

const logger = createLogger("maintainability");

interface BrokerClient {
  publish(message: EventEnvelope): Promise<void>;
}

class OrderEventPublisher {
  constructor(private readonly brokerClient: BrokerClient) {}

  async publish(message: EventEnvelope): Promise<void> {
    logger.info("publishing_order_event", {
      eventName: message.eventName,
      messageId: message.messageId,
      schemaVersion: message.schemaVersion,
    });

    await this.brokerClient.publish(message);
  }
}

class InMemoryBrokerClient implements BrokerClient {
  async publish(message: EventEnvelope): Promise<void> {
    logger.info("broker_client_publish", {
      eventName: message.eventName,
      messageId: message.messageId,
    });
  }
}

async function main(): Promise<void> {
  const publisher = new OrderEventPublisher(new InMemoryBrokerClient());

  await publisher.publish({
    messageId: "msg_100",
    eventName: "order.fulfilled",
    schemaVersion: 1,
    occurredAt: new Date().toISOString(),
    payload: { orderId: "ord_500" },
  });
}

void main();
