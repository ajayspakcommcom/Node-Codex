import { SchedulingAnalyzer } from "./module/analysis/scheduling-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const analyzer = new SchedulingAnalyzer();
  let remainingIterations = 4;

  function scheduleNextTickChain(): void {
    analyzer.record("nextTick", `nextTick-remaining-${remainingIterations}`);

    remainingIterations -= 1;
    if (remainingIterations > 0) {
      process.nextTick(scheduleNextTickChain);
    }
  }

  setTimeout(() => {
    analyzer.record("macrotask", "timer-callback");
    logger.warn("nextTick starvation risk", {
      order: analyzer.snapshot(),
      takeaway: "nextTick work can delay timers and other callbacks if chained too aggressively.",
    });
  }, 0);

  process.nextTick(scheduleNextTickChain);
  analyzer.record("sync", "scheduled-nextTick-chain");
}

void main();
