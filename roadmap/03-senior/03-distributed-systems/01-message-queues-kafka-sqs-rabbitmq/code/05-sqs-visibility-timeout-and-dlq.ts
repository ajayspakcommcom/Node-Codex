import { createLogger } from "./shared/logger";
import { FakeSqsQueue } from "./shared/fake-brokers";

const logger = createLogger("sqs");

async function main(): Promise<void> {
  const queue = new FakeSqsQueue(3);

  queue.send({ messageId: "msg_1", job: "generate-report" });

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const delivery = queue.receive();

    if (!delivery) {
      break;
    }

    logger.info("message_received", {
      messageId: delivery.body.messageId,
      receiveCount: delivery.receiveCount,
    });

    if (attempt < 4) {
      queue.fail(delivery);
      continue;
    }

    queue.ack(delivery);
  }

  logger.info("dlq_depth", { count: queue.deadLetterQueueDepth() });
}

void main();
