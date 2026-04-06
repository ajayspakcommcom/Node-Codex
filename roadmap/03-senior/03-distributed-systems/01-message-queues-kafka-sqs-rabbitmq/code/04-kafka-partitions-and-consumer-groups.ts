import { createLogger } from "./shared/logger";
import { type EventEnvelope, createEnvelope } from "./shared/message-types";

const logger = createLogger("kafka");

interface PartitionedRecord {
  readonly partition: number;
  readonly message: EventEnvelope;
}

function resolvePartition(key: string, partitionCount: number): number {
  let hash = 0;

  for (const character of key) {
    hash = (hash * 31 + character.charCodeAt(0)) % partitionCount;
  }

  return Math.abs(hash);
}

function assignToPartition(
  message: EventEnvelope,
  key: string,
  partitionCount: number,
): PartitionedRecord {
  return {
    partition: resolvePartition(key, partitionCount),
    message,
  };
}

const record = assignToPartition(
  createEnvelope("order.created", { orderId: "ord_5001", customerId: "cus_1" }),
  "cus_1",
  6,
);

logger.info("kafka_partition_assignment", {
  partition: record.partition,
  eventName: record.message.eventName,
  note: "Consistent keys preserve local ordering but can create hot partitions.",
});
