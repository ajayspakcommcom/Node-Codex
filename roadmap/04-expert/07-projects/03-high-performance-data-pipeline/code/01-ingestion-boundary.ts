import { acceptRecords } from "./pipeline/ingestion-policy.js";

const decision = acceptRecords({
  queueDepth: 2400,
  maximumQueueDepth: 5000,
  recordsRequested: 400,
  availableWorkers: 12,
});

console.log(decision);
