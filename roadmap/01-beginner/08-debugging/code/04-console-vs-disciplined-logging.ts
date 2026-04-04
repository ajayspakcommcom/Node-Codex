import { createLogger } from "./shared/logger.js";

const logger = createLogger("console-vs-logging");

function badDebuggingPattern(): void {
  console.log("something failed");
  console.log("value:", 42);
}

function disciplinedPattern(): void {
  logger.error("Checkout failed", {
    requestId: "req_220",
    route: "/checkout",
    actorId: "usr_22",
    operation: "process-checkout",
    reason: "inventory-mismatch",
  });
}

badDebuggingPattern();
disciplinedPattern();
