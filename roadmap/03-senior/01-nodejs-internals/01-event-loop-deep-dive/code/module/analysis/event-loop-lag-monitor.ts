import type { LagSample } from "../../shared/event-loop-types.js";
import { nowMs, sleep } from "../../shared/event-loop-runtime.js";

export class EventLoopLagMonitor {
  public async measure(expectedDelayMs: number): Promise<LagSample> {
    const startedAt = nowMs();
    await sleep(expectedDelayMs);
    const observedDelayMs = nowMs() - startedAt;

    return {
      expectedDelayMs,
      observedDelayMs,
      lagMs: Math.max(0, observedDelayMs - expectedDelayMs),
    };
  }
}
