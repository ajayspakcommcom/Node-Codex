import { delay } from "./async-helpers.js";

export interface DependencyResult {
  readonly id: string;
  readonly status: "ok" | "failed";
}

export async function fetchDependency(
  id: string,
  latencyMs: number,
  shouldFail = false,
  signal?: AbortSignal,
): Promise<DependencyResult> {
  await delay(latencyMs, signal);

  if (shouldFail) {
    throw new Error(`Dependency failed for ${id}`);
  }

  return {
    id,
    status: "ok",
  };
}

export async function transientDependencyCall(callId: string, failUntilAttempt: number, attempt: number): Promise<string> {
  await delay(25);

  if (attempt < failUntilAttempt) {
    throw new Error(`Transient failure for ${callId} on attempt ${attempt}`);
  }

  return `success:${callId}:attempt:${attempt}`;
}
