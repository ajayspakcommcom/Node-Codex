import { BottleneckAnalyzer } from "./module/analysis/bottleneck-analyzer.js";
import { RequestPathProfiler } from "./module/services/request-path-profiler.js";
import { performanceRuntime } from "./shared/performance-runtime.js";
import { logger } from "./shared/logger.js";

const profiler = new RequestPathProfiler();
const analyzer = new BottleneckAnalyzer();

const breakdown = profiler.profile({
  cpuMs: performanceRuntime.baselineCpuMs,
  dependencyMs: performanceRuntime.baselineDependencyMs,
  serializationMs: performanceRuntime.baselineSerializationMs,
});

logger.info("Request path cost breakdown", {
  breakdown,
  assessment: analyzer.assess(breakdown),
});
