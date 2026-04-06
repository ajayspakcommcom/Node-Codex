import { createLogger } from "./shared/logger";
import { withTimeout } from "./shared/timeout";

const logger = createLogger("cancellation");

async function slowOperation(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return "late-result";
}

async function main(): Promise<void> {
  try {
    await withTimeout(slowOperation(), 50);
  } catch (error) {
    logger.info("timeout_triggered", {
      message: error instanceof Error ? error.message : "unknown error",
      note: "Timeout should fail the current layer and propagate cancellation intent.",
    });
  }
}

void main();
