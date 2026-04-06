import { createLogger } from "./shared/logger.js";

const logger = createLogger("v8-optimizations");

interface BenchmarkCase {
  readonly name: string;
  readonly payloadSize: string;
  readonly warmupIterations: number;
  readonly steadyStateIterations: number;
}

const benchmarkPlan: BenchmarkCase = {
  name: "feed-summary-hot-path",
  payloadSize: "20 items per request",
  warmupIterations: 5_000,
  steadyStateIterations: 50_000,
};

logger.info("benchmark_plan_defined", {
  benchmarkPlan,
  note: "A benchmark is only useful when workload shape and warm-up are explicit.",
});
