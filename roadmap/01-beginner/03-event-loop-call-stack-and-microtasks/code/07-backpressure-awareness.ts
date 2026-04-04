import { createLogger } from "./shared/logger.js";
import { wait } from "./shared/timing.js";

const logger = createLogger("sync-worker");

async function callPartnerApi(taskId: string): Promise<string> {
  await wait(20);
  return `completed:${taskId}`;
}

async function runWithConcurrencyLimit(
  taskIds: readonly string[],
  limit: number,
): Promise<readonly string[]> {
  const results: string[] = [];
  let activeCount = 0;
  let currentIndex = 0;

  async function scheduleNext(): Promise<void> {
    if (currentIndex >= taskIds.length) {
      return;
    }

    const taskId = taskIds[currentIndex];
    currentIndex += 1;
    activeCount += 1;

    logger.info("Dispatching task", { taskId, activeCount });

    try {
      results.push(await callPartnerApi(taskId));
    } finally {
      activeCount -= 1;

      if (currentIndex < taskIds.length) {
        await scheduleNext();
      }
    }
  }

  const starters = Array.from({ length: Math.min(limit, taskIds.length) }, () => scheduleNext());
  await Promise.all(starters);

  return results;
}

async function main(): Promise<void> {
  const results = await runWithConcurrencyLimit(["a", "b", "c", "d", "e"], 2);
  logger.info("Completed tasks", { results });
}

void main();
