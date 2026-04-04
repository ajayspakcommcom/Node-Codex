import { createLogger } from "./shared/logger.js";
import { wait } from "./shared/timing.js";

const logger = createLogger("event-loop-patterns");

async function badSequentialExternalCalls(): Promise<readonly string[]> {
  const results: string[] = [];

  for (const service of ["payments", "users", "inventory"]) {
    await wait(20);
    results.push(`ok:${service}`);
  }

  return results;
}

async function goodParallelExternalCalls(): Promise<readonly string[]> {
  return Promise.all(
    ["payments", "users", "inventory"].map(async (service) => {
      await wait(20);
      return `ok:${service}`;
    }),
  );
}

async function main(): Promise<void> {
  logger.info("Bad sequential orchestration starts");
  logger.info("Bad sequential orchestration result", {
    results: await badSequentialExternalCalls(),
  });

  logger.info("Good parallel orchestration starts");
  logger.info("Good parallel orchestration result", {
    results: await goodParallelExternalCalls(),
  });
}

void main();
