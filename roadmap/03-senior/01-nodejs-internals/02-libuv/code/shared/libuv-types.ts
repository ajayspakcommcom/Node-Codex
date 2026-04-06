export interface PoolTaskResult {
  readonly label: string;
  readonly durationMs: number;
}

export interface PoolBatchResult {
  readonly taskCount: number;
  readonly totalElapsedMs: number;
  readonly maxTaskDurationMs: number;
  readonly tasks: readonly PoolTaskResult[];
}

export interface LookupResult {
  readonly host: string;
  readonly address: string;
  readonly family: number;
  readonly durationMs: number;
}

export interface SeparationResult {
  readonly asyncRuntimeTaskMs: number;
  readonly syncCpuTaskMs: number;
  readonly timerLagMs: number;
}
