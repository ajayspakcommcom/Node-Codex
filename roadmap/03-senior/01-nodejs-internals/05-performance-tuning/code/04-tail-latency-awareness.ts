import { BenchmarkAnalyzer } from "./module/analysis/benchmark-analyzer.js";
import { performanceRuntime } from "./shared/performance-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new BenchmarkAnalyzer();
const summary = analyzer.summarize("mixed-request-path", performanceRuntime.sampleRequestLatenciesMs);

logger.warn("Tail latency awareness", {
  summary,
  takeaway: "averages alone hide the experience of the slowest requests.",
});
