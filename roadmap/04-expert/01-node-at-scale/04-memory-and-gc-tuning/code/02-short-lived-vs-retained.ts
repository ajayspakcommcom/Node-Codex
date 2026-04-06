import { createLogger } from "./shared/logger.js";

const logger = createLogger("memory-gc-tuning");

interface TransientPayload {
  readonly orderId: string;
  readonly serialized: string;
}

function createTransientPayload(orderId: string): TransientPayload {
  return {
    orderId,
    serialized: JSON.stringify({ orderId, createdAt: Date.now() }),
  };
}

const retainedPayloads: TransientPayload[] = [];

for (let index = 0; index < 5; index += 1) {
  retainedPayloads.push(createTransientPayload(`ord_${index}`));
}

logger.warn("retained_payload_example", {
  retainedCount: retainedPayloads.length,
  note: "Retaining short-lived payloads in long-lived arrays changes memory behavior materially.",
});
