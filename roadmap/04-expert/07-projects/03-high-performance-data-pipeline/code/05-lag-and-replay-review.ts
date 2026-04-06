import { reviewPipelineHealth } from "./pipeline/pipeline-health.js";

const health = reviewPipelineHealth({
  queueDepth: 3200,
  maximumQueueDepth: 5000,
  consumerLagSeconds: 18,
  maximumConsumerLagSeconds: 30,
  deadLetterCount: 4,
  deadLetterThreshold: 10,
});

console.log(health);
