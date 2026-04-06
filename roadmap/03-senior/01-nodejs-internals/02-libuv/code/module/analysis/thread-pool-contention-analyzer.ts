import { nowMs, runCryptoTask } from "../../shared/libuv-runtime.js";
import type { PoolBatchResult } from "../../shared/libuv-types.js";

export class ThreadPoolContentionAnalyzer {
  public async runBatch(taskLabels: readonly string[]): Promise<PoolBatchResult> {
    const startedAt = nowMs();
    const tasks = await Promise.all(taskLabels.map((label) => runCryptoTask(label)));
    const totalElapsedMs = nowMs() - startedAt;

    return {
      taskCount: taskLabels.length,
      totalElapsedMs,
      maxTaskDurationMs: Math.max(...tasks.map((task) => task.durationMs)),
      tasks,
    };
  }
}
