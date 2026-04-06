export interface WorkItem {
  readonly id: string;
  readonly costUnits: number;
}

export interface QueueSnapshot {
  readonly queuedItems: number;
  readonly accepted: number;
  readonly rejected: number;
  readonly processed: number;
}

export interface SocketConsumer {
  readonly consumerId: string;
  pendingMessages: number;
  readonly maxPendingMessages: number;
}

export interface RetryResult {
  readonly attempts: number;
  readonly acceptedAttempts: number;
  readonly rejectedAttempts: number;
}
