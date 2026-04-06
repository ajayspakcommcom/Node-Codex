export interface SchedulingEntry {
  readonly order: number;
  readonly queue: "sync" | "microtask" | "macrotask" | "nextTick" | "io";
  readonly label: string;
}

export interface LagSample {
  readonly expectedDelayMs: number;
  readonly observedDelayMs: number;
  readonly lagMs: number;
}

export interface RequestPathResult {
  readonly requestName: string;
  readonly blockingMs: number;
  readonly timerLagMs: number;
  readonly totalElapsedMs: number;
}

export interface FairnessBatchResult {
  readonly strategy: "blocking-loop" | "cooperative-yield";
  readonly unitsProcessed: number;
  readonly otherWorkExecutions: number;
}
