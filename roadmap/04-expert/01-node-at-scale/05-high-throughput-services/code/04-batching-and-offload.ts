import { createLogger } from "./shared/logger.js";

const logger = createLogger("high-throughput-services");

function batchEvents(events: readonly string[], batchSize: number): string[][] {
  const batches: string[][] = [];

  for (let index = 0; index < events.length; index += batchSize) {
    batches.push(events.slice(index, index + batchSize));
  }

  return batches;
}

const batches = batchEvents(["a", "b", "c", "d", "e"], 2);

logger.info("batching_strategy_example", {
  batchCount: batches.length,
  note: "Batching can reduce dependency pressure when correctness allows it.",
});
