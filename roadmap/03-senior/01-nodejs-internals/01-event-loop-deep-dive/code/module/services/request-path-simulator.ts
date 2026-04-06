import type { RequestPathResult } from "../../shared/event-loop-types.js";
import { blockCpuFor, nowMs, sleep } from "../../shared/event-loop-runtime.js";

export class RequestPathSimulator {
  public async run(input: {
    readonly requestName: string;
    readonly blockingMs: number;
    readonly timerDelayMs: number;
  }): Promise<RequestPathResult> {
    const startedAt = nowMs();
    const timerStart = nowMs();

    const timerPromise = sleep(input.timerDelayMs).then(() => nowMs() - timerStart);

    const actualBlockingMs = blockCpuFor(input.blockingMs);
    const observedDelayMs = await timerPromise;

    return {
      requestName: input.requestName,
      blockingMs: actualBlockingMs,
      timerLagMs: Math.max(0, observedDelayMs - input.timerDelayMs),
      totalElapsedMs: nowMs() - startedAt,
    };
  }
}
