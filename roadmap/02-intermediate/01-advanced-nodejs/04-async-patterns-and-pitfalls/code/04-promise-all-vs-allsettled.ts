import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";

async function run(): Promise<void> {
  try {
    await Promise.all([
      fetchDependency("task-1", 20),
      fetchDependency("task-2", 20, true),
      fetchDependency("task-3", 20),
    ]);
  } catch (error) {
    logger.warn("Promise.all failed fast", {
      error,
    });
  }

  const settledResults = await Promise.allSettled([
    fetchDependency("task-1", 20),
    fetchDependency("task-2", 20, true),
    fetchDependency("task-3", 20),
  ]);

  logger.info("Promise.allSettled produced full batch outcome", {
    settledResults,
  });
}

void run();
