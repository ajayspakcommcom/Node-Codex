export interface PipelineHealthInput {
  queueDepth: number;
  maximumQueueDepth: number;
  consumerLagSeconds: number;
  maximumConsumerLagSeconds: number;
  deadLetterCount: number;
  deadLetterThreshold: number;
}

export interface PipelineHealthReview {
  healthy: boolean;
  concerns: string[];
}

export function reviewPipelineHealth(input: PipelineHealthInput): PipelineHealthReview {
  const concerns: string[] = [];

  if (input.queueDepth > input.maximumQueueDepth * 0.8) {
    concerns.push("queue-depth-near-capacity");
  }
  if (input.consumerLagSeconds > input.maximumConsumerLagSeconds) {
    concerns.push("consumer-lag-exceeds-threshold");
  }
  if (input.deadLetterCount > input.deadLetterThreshold) {
    concerns.push("dead-letter-count-exceeds-threshold");
  }

  return {
    healthy: concerns.length === 0,
    concerns,
  };
}
