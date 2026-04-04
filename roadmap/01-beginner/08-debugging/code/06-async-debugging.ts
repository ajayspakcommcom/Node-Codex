import { createLogger } from "./shared/logger.js";
import { nowMs, wait } from "./shared/timing.js";

const logger = createLogger("async-debugging");

async function loadUser(): Promise<{ id: string; role: string }> {
  await wait(20);
  return { id: "usr_808", role: "admin" };
}

async function main(): Promise<void> {
  const start = nowMs();

  logger.info("Before async call", { elapsedMs: nowMs() - start });

  const user = await loadUser();

  debugger;

  logger.info("After async call", {
    elapsedMs: nowMs() - start,
    user,
  });
}

void main();
