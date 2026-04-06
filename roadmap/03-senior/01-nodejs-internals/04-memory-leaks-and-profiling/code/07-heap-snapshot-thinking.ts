import { baselineHeapSignals, retentionExamples } from "./shared/memory-runtime.js";
import { logger } from "./shared/logger.js";

logger.info("Heap snapshot thinking", {
  heapSignals: baselineHeapSignals,
  likelyInvestigationTargets: retentionExamples
    .filter((subject) => !subject.bounded || subject.growthTrend === "growing")
    .map((subject) => subject.name),
  takeaway: "snapshots are useful when they explain retained references, not just heap size.",
});
