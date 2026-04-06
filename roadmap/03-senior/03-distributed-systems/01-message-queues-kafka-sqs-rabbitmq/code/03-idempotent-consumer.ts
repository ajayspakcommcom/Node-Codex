import { createLogger } from "./shared/logger";
import { type EventEnvelope, createEnvelope } from "./shared/message-types";

const logger = createLogger("idempotent-consumer");

class ProcessedMessageStore {
  private readonly processed = new Set<string>();

  has(messageId: string): boolean {
    return this.processed.has(messageId);
  }

  record(messageId: string): void {
    this.processed.add(messageId);
  }
}

class PaymentProjectionConsumer {
  constructor(private readonly store: ProcessedMessageStore) {}

  async handle(message: EventEnvelope): Promise<void> {
    if (this.store.has(message.messageId)) {
      logger.info("duplicate_message_skipped", { messageId: message.messageId });
      return;
    }

    logger.info("processing_message", {
      messageId: message.messageId,
      eventName: message.eventName,
    });

    this.store.record(message.messageId);
  }
}

async function main(): Promise<void> {
  const store = new ProcessedMessageStore();
  const consumer = new PaymentProjectionConsumer(store);
  const message = createEnvelope("payment.authorized", { paymentId: "pay_10" });

  await consumer.handle(message);
  await consumer.handle(message);
}

void main();
