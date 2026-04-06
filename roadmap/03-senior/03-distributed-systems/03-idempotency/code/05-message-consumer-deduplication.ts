import { createLogger } from "./shared/logger";
import { ProcessedMessageStore } from "./shared/processed-message-store";
import { createMessageEnvelope } from "./shared/message-types";

const logger = createLogger("consumer-deduplication");

class InvoiceConsumer {
  constructor(private readonly processedMessageStore: ProcessedMessageStore) {}

  async handle(message: ReturnType<typeof createMessageEnvelope>): Promise<void> {
    if (this.processedMessageStore.has(message.messageId)) {
      logger.info("duplicate_message_skipped", { messageId: message.messageId });
      return;
    }

    this.processedMessageStore.record(message.messageId);
    logger.info("invoice_recorded", {
      messageId: message.messageId,
      invoiceId: message.payload.invoiceId,
    });
  }
}

async function main(): Promise<void> {
  const store = new ProcessedMessageStore();
  const consumer = new InvoiceConsumer(store);
  const message = createMessageEnvelope("invoice.created", { invoiceId: "inv_20" });

  await consumer.handle(message);
  await consumer.handle(message);
}

void main();
