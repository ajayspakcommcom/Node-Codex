import { ProfilingAdvisor } from "./module/analysis/profiling-advisor.js";
import { RetentionAnalyzer } from "./module/analysis/retention-analyzer.js";
import { baselineHeapSignals, retentionExamples } from "./shared/memory-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new RetentionAnalyzer();
const profilingAdvisor = new ProfilingAdvisor();

const subject = retentionExamples[1];
const signal = baselineHeapSignals[2];
const assessment = analyzer.assess(subject);

logger.warn("Profiling workflow awareness", {
  subject,
  signal,
  assessment,
  recommendation: profilingAdvisor.recommend(signal, assessment),
});
