import { createLogger } from "./shared/logger.js";

const logger = createLogger("memory-gc-tuning");

const runtimeDecision = {
  issue: "heap growth during sustained ingestion workload",
  codeLevelReviewComplete: true,
  suspectedCause: "allocation pressure plus large transient payloads",
  proposedFlagChange: "--max-old-space-size=4096",
  rolloutPlan: "canary first with latency and heap comparison",
};

logger.info("runtime_flag_decision_example", {
  runtimeDecision,
  note: "Runtime flags should come after investigation, not before it.",
});
