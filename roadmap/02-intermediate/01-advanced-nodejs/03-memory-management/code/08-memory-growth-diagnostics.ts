import { logger } from "./shared/logger.js";
import { getMemorySnapshot, summarizeMemory } from "./shared/memory-metrics.js";

const retainedPayloads: string[] = [];

for (let index = 0; index < 10; index += 1) {
  retainedPayloads.push("retained-payload-".repeat(10_000));
}

const firstSnapshot = getMemorySnapshot();

for (let index = 0; index < 10; index += 1) {
  retainedPayloads.push("retained-payload-".repeat(10_000));
}

const secondSnapshot = getMemorySnapshot();

logger.info("Memory growth comparison", {
  before: summarizeMemory(firstSnapshot),
  after: summarizeMemory(secondSnapshot),
  retainedEntries: retainedPayloads.length,
  guidance: "Look for steadily rising retained memory, not just temporary request-time spikes.",
});
