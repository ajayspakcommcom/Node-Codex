import { WorkloadSimulator } from "./module/services/workload-simulator.js";
import { performanceRuntime } from "./shared/performance-runtime.js";
import { logger } from "./shared/logger.js";

const simulator = new WorkloadSimulator();

const lowLatency = simulator.compare("low-latency", performanceRuntime.fastPathLatenciesMs);
const highThroughput = simulator.compare("high-throughput", [28, 29, 27, 30, 28, 29, 31, 30]);

logger.info("Latency vs throughput tradeoff", {
  lowLatency,
  highThroughput,
  throughputEstimates: {
    lowLatencyRps: simulator.throughputEstimate(performanceRuntime.throughputWindowRequests, lowLatency.averageMs),
    highThroughputRps: simulator.throughputEstimate(performanceRuntime.throughputWindowRequests, highThroughput.averageMs),
  },
});
