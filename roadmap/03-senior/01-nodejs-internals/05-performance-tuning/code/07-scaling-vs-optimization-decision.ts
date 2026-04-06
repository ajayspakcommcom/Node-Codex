import { BottleneckAnalyzer } from "./module/analysis/bottleneck-analyzer.js";
import { RequestPathProfiler } from "./module/services/request-path-profiler.js";
import { logger } from "./shared/logger.js";

const profiler = new RequestPathProfiler();
const analyzer = new BottleneckAnalyzer();

const dependencyBound = profiler.profile({
  cpuMs: 14,
  dependencyMs: 58,
  serializationMs: 5,
});

logger.warn("Scaling vs optimization decision", {
  costs: dependencyBound,
  assessment: analyzer.assess(dependencyBound),
  takeaway: "adding more app instances may not help if the real bottleneck is downstream dependency latency.",
});
