import { performance } from "node:perf_hooks";

export const eventLoopRuntime = {
  defaultDelayMs: 20,
  blockingWorkMs: 45,
  requestBudgetMs: 50,
  fairnessUnits: 5_000,
} as const;

export function nowMs(): number {
  return performance.now();
}

export function blockCpuFor(durationMs: number): number {
  const startedAt = performance.now();

  while (performance.now() - startedAt < durationMs) {
    // Intentional busy loop to simulate CPU work on the main thread.
  }

  return performance.now() - startedAt;
}

export function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function yieldToEventLoop(): Promise<void> {
  await new Promise<void>((resolve) => {
    setImmediate(resolve);
  });
}
