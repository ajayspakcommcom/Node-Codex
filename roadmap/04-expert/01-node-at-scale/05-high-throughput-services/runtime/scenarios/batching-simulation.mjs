function batch(items, batchSize) {
  const batches = [];

  for (let index = 0; index < items.length; index += batchSize) {
    batches.push(items.slice(index, index + batchSize));
  }

  return batches;
}

const events = Array.from({ length: 2_000 }, (_, index) => `event_${index}`);
const batches = batch(events, 100);

console.log(
  JSON.stringify({
    scenario: "batching-simulation",
    totalEvents: events.length,
    batchCount: batches.length,
    batchSize: 100,
  }),
);
