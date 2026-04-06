import { RetentionAnalyzer } from "./module/analysis/retention-analyzer.js";
import { CacheSimulator } from "./module/services/cache-simulator.js";
import { logger } from "./shared/logger.js";

const simulator = new CacheSimulator(false);
const analyzer = new RetentionAnalyzer();

for (let index = 0; index < 150; index += 1) {
  simulator.insert(`key_${index}`, `payload_${index}`.repeat(4));
}

const subject = simulator.toRetentionSubject("unbounded-cache");

logger.warn("Unbounded cache growth", {
  subject,
  assessment: analyzer.assess(subject),
});
