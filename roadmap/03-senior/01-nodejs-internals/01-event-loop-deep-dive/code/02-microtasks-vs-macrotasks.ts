import { SchedulingAnalyzer } from "./module/analysis/scheduling-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const analyzer = new SchedulingAnalyzer();
  analyzer.record("sync", "script-start");

  process.nextTick(() => {
    analyzer.record("nextTick", "nextTick-callback");
  });

  queueMicrotask(() => {
    analyzer.record("microtask", "queueMicrotask-callback");
  });

  Promise.resolve().then(() => {
    analyzer.record("microtask", "promise-then");
  });

  setTimeout(() => {
    analyzer.record("macrotask", "setTimeout-0");
    logger.info("Microtasks vs macrotasks", {
      order: analyzer.snapshot(),
    });
  }, 0);

  analyzer.record("sync", "script-end");
}

void main();
