import { createLogger } from "./shared/logger.js";
import { wait } from "./shared/timing.js";

const logger = createLogger("production-like-failure");

async function callUpstreamService(environment: "local" | "staging"): Promise<string> {
  await wait(20);

  if (environment === "staging") {
    throw new Error("Upstream 503 in staging-like environment");
  }

  return "ok";
}

async function main(): Promise<void> {
  try {
    await callUpstreamService("staging");
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Production-like failure reproduced safely", {
        environment: "staging",
        message: error.message,
      });
    }
  }
}

void main();
