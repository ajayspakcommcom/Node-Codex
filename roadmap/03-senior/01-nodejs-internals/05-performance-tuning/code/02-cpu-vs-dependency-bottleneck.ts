import { BottleneckAnalyzer } from "./module/analysis/bottleneck-analyzer.js";
import { RequestPathProfiler } from "./module/services/request-path-profiler.js";
import { performanceRuntime } from "./shared/performance-runtime.js";
import { logger } from "./shared/logger.js";

const profiler = new RequestPathProfiler();
const analyzer = new BottleneckAnalyzer();

const cpuHeavy = profiler.profile({
  cpuMs: 45,
  dependencyMs: 12,
  serializationMs: performanceRuntime.baselineSerializationMs,
});
const dependencyHeavy = profiler.profile({
  cpuMs: performanceRuntime.baselineCpuMs,
  dependencyMs: performanceRuntime.baselineDependencyMs,
  serializationMs: performanceRuntime.baselineSerializationMs,
});

logger.info("CPU vs dependency bottleneck", {
  cpuHeavy: {
    costs: cpuHeavy,
    assessment: analyzer.assess(cpuHeavy),
  },
  dependencyHeavy: {
    costs: dependencyHeavy,
    assessment: analyzer.assess(dependencyHeavy),
  },
});
