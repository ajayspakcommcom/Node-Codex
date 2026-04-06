import { BenchmarkAnalyzer } from "./module/analysis/benchmark-analyzer.js";
import { logger } from "./shared/logger.js";

const analyzer = new BenchmarkAnalyzer();

const toyBenchmark = analyzer.summarize("toy-benchmark", [3, 3, 4, 3, 3, 4]);
const realisticBenchmark = analyzer.summarize("realistic-benchmark", [24, 26, 23, 25, 80, 29, 27, 31]);

logger.info("Realistic benchmark discipline", {
  toyBenchmark,
  realisticBenchmark,
  takeaway: "benchmarks should resemble actual request behavior, not only ideal fast paths.",
});
