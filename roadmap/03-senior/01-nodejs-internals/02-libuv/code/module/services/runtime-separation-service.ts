import { blockCpuFor, libuvRuntime, nowMs, runCryptoTask, sleep } from "../../shared/libuv-runtime.js";
import type { SeparationResult } from "../../shared/libuv-types.js";

export class RuntimeSeparationService {
  public async compareAsyncRuntimeVsSyncCpu(): Promise<SeparationResult> {
    const timerStart = nowMs();
    const timerPromise = sleep(libuvRuntime.timerDelayMs).then(() => nowMs() - timerStart);

    const asyncResult = await runCryptoTask("runtime-separation");
    const syncCpuTaskMs = blockCpuFor(libuvRuntime.blockingCpuMs);
    const timerObservedMs = await timerPromise;

    return {
      asyncRuntimeTaskMs: asyncResult.durationMs,
      syncCpuTaskMs,
      timerLagMs: Math.max(0, timerObservedMs - libuvRuntime.timerDelayMs),
    };
  }
}
